#!/usr/bin/env bash
# activate-ssl.sh
# Run AFTER adding all GoDaddy DNS records.
# Does: waits for ACM cert validation → patches both CloudFront distributions
#       → runs certbot on frontend EC2 → runs certbot on backend EC2
set -e

CERT_ARN="arn:aws:acm:us-east-1:981485834187:certificate/a531f97a-6111-4318-a85b-1d43087e91ba"
ADMIN_CF_ID="ES6V21S4DQ7QB"
CDN_CF_ID="E38G7KLQN55MCP"
FRONTEND_IP="13.205.154.93"
BACKEND_IP="13.206.229.173"
KEY="/Users/ritisha/.ssh/zenith-estate-key.pem"

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
log()  { echo -e "${GREEN}[ssl]${NC} $1"; }
warn() { echo -e "${YELLOW}[wait]${NC} $1"; }

# ── Step 1: wait for ACM cert to be ISSUED ─────────────────────────────────────
log "Waiting for ACM certificate to be validated..."
while true; do
  STATUS=$(aws acm describe-certificate \
    --certificate-arn "$CERT_ARN" \
    --region us-east-1 \
    --query 'Certificate.Status' \
    --output text 2>/dev/null)
  if [ "$STATUS" = "ISSUED" ]; then
    log "Certificate is ISSUED."
    break
  fi
  warn "Status: $STATUS — checking again in 30 seconds..."
  sleep 30
done

# ── Step 2: update CloudFront admin portal ─────────────────────────────────────
log "Updating admin CloudFront (admin.zenithestate.in)..."

ETAG=$(aws cloudfront get-distribution-config \
  --id "$ADMIN_CF_ID" \
  --query 'ETag' --output text)

aws cloudfront get-distribution-config \
  --id "$ADMIN_CF_ID" \
  --query 'DistributionConfig' > /tmp/admin-cf-config.json

# Inject alias + ACM cert
python3 - <<PYEOF
import json, sys

with open('/tmp/admin-cf-config.json') as f:
    cfg = json.load(f)

cfg['Aliases'] = {'Quantity': 1, 'Items': ['admin.zenithestate.in']}
cfg['ViewerCertificate'] = {
    'ACMCertificateArn': '$CERT_ARN',
    'SSLSupportMethod': 'sni-only',
    'MinimumProtocolVersion': 'TLSv1.2_2021',
    'Certificate': '$CERT_ARN',
    'CertificateSource': 'acm'
}
# Remove default cert fields
cfg['ViewerCertificate'].pop('CloudFrontDefaultCertificate', None)

with open('/tmp/admin-cf-config.json', 'w') as f:
    json.dump(cfg, f)
print("admin config patched")
PYEOF

aws cloudfront update-distribution \
  --id "$ADMIN_CF_ID" \
  --distribution-config "file:///tmp/admin-cf-config.json" \
  --if-match "$ETAG" \
  --query 'Distribution.Status' --output text

log "Admin CloudFront updated."

# ── Step 3: update CloudFront CDN ─────────────────────────────────────────────
log "Updating CDN CloudFront (cdn.zenithestate.in)..."

ETAG=$(aws cloudfront get-distribution-config \
  --id "$CDN_CF_ID" \
  --query 'ETag' --output text)

aws cloudfront get-distribution-config \
  --id "$CDN_CF_ID" \
  --query 'DistributionConfig' > /tmp/cdn-cf-config.json

python3 - <<PYEOF
import json

with open('/tmp/cdn-cf-config.json') as f:
    cfg = json.load(f)

cfg['Aliases'] = {'Quantity': 1, 'Items': ['cdn.zenithestate.in']}
cfg['ViewerCertificate'] = {
    'ACMCertificateArn': '$CERT_ARN',
    'SSLSupportMethod': 'sni-only',
    'MinimumProtocolVersion': 'TLSv1.2_2021',
    'Certificate': '$CERT_ARN',
    'CertificateSource': 'acm'
}
cfg['ViewerCertificate'].pop('CloudFrontDefaultCertificate', None)

with open('/tmp/cdn-cf-config.json', 'w') as f:
    json.dump(cfg, f)
print("cdn config patched")
PYEOF

aws cloudfront update-distribution \
  --id "$CDN_CF_ID" \
  --distribution-config "file:///tmp/cdn-cf-config.json" \
  --if-match "$ETAG" \
  --query 'Distribution.Status' --output text

log "CDN CloudFront updated."

# ── Step 4: certbot on frontend EC2 ───────────────────────────────────────────
log "Running certbot on frontend EC2 (zenithestate.in + www.zenithestate.in)..."

ssh -i "$KEY" -o StrictHostKeyChecking=no ec2-user@"$FRONTEND_IP" \
  "sudo certbot --nginx \
     -d zenithestate.in \
     -d www.zenithestate.in \
     --non-interactive --agree-tos \
     -m contact@zenithestate.in \
     --redirect && sudo systemctl reload nginx"

log "Frontend HTTPS active."

# ── Step 5: certbot on backend EC2 ────────────────────────────────────────────
log "Running certbot on backend EC2 (api.zenithestate.in)..."

ssh -i "$KEY" -o StrictHostKeyChecking=no ec2-user@"$BACKEND_IP" \
  "sudo certbot --nginx \
     -d api.zenithestate.in \
     --non-interactive --agree-tos \
     -m contact@zenithestate.in \
     --redirect && sudo systemctl reload nginx"

log "Backend HTTPS active."

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
log "All SSL setup complete!"
echo ""
echo "  https://zenithestate.in"
echo "  https://api.zenithestate.in"
echo "  https://admin.zenithestate.in"
echo "  https://cdn.zenithestate.in"
