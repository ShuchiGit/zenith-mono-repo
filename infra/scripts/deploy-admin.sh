#!/bin/bash
set -e

ADMIN_BUCKET="${1:-}"
CF_DISTRIBUTION_ID="${2:-}"
ADMIN_DIR="$(cd "$(dirname "$0")/../../code/admin" && pwd)"

if [ -z "$ADMIN_BUCKET" ] || [ -z "$CF_DISTRIBUTION_ID" ]; then
  echo "Usage: $0 <s3-bucket-name> <cloudfront-distribution-id>"
  echo "Example: $0 zenith-estate-prod-admin-portal E1234ABCDEF"
  exit 1
fi

echo "Building admin portal..."
cd "$ADMIN_DIR"
npm ci
npm run build

echo "Uploading to S3: $ADMIN_BUCKET"
aws s3 sync dist/ "s3://$ADMIN_BUCKET/" --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "index.html"

aws s3 cp dist/index.html "s3://$ADMIN_BUCKET/index.html" \
  --cache-control "no-cache, no-store, must-revalidate"

echo "Invalidating CloudFront distribution: $CF_DISTRIBUTION_ID"
aws cloudfront create-invalidation \
  --distribution-id "$CF_DISTRIBUTION_ID" \
  --paths "/*"

echo "Admin portal deployed successfully!"
echo "URL: https://admin.zenithestate.in"
