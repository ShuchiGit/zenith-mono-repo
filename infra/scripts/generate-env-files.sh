#!/bin/bash
# generate-env-files.sh
set -e

SCRIPTS_DIR="$(cd "$(dirname "$0")" && pwd)"
PROD_DIR="$SCRIPTS_DIR/../environments/prod"
EC2_KEY="$HOME/.ssh/zenith-estate-key.pem"

echo "Reading configurations and Terraform outputs..."

# Read values from terraform.tfvars
DB_PASSWORD=$(grep 'db_password' "$PROD_DIR/terraform.tfvars" | cut -d'=' -f2 | tr -d ' "')
JWT_SECRET=$(grep 'jwt_secret' "$PROD_DIR/terraform.tfvars" | cut -d'=' -f2 | tr -d ' "')

# Read values from terraform output
RDS_ENDPOINT=$(cd "$PROD_DIR" && terraform output -raw rds_endpoint)
BACKEND_IP=$(cd "$PROD_DIR" && terraform output -raw backend_public_ip)
FRONTEND_IP=$(cd "$PROD_DIR" && terraform output -raw frontend_public_ip)
ASSETS_BUCKET=$(cd "$PROD_DIR" && terraform output -raw assets_bucket_name)

echo "Extracted values:"
echo "- RDS_ENDPOINT: $RDS_ENDPOINT"
echo "- BACKEND_IP: $BACKEND_IP"
echo "- FRONTEND_IP: $FRONTEND_IP"
echo "- ASSETS_BUCKET: $ASSETS_BUCKET"

# Generate Backend .env
echo "Generating backend .env..."
cat > "$SCRIPTS_DIR/backend.env" << EOF
DATABASE_URL="mysql://zenith_user:${DB_PASSWORD}@${RDS_ENDPOINT}/zenith_estate"
JWT_SECRET="${JWT_SECRET}"
AWS_REGION="ap-south-1"
S3_BUCKET="${ASSETS_BUCKET}"
CDN_URL="https://cdn.zenithestate.in"
NODE_ENV="production"
PORT=5000
EOF

# Generate Frontend .env.production
echo "Generating frontend .env.production..."
cat > "$SCRIPTS_DIR/frontend.env" << EOF
NEXT_PUBLIC_API_URL="https://api.zenithestate.in/v1"
NEXT_PUBLIC_CDN_URL="https://cdn.zenithestate.in"
NEXT_PUBLIC_SITE_URL="https://zenithestate.in"
EOF

# Generate Admin .env.production (local build)
echo "Generating local admin .env.production..."
cat > "$SCRIPTS_DIR/../../code/admin/.env.production" << EOF
VITE_API_URL="https://api.zenithestate.in/v1"
EOF

# Upload to EC2
echo "Uploading backend .env to EC2..."
ssh -i "$EC2_KEY" -o StrictHostKeyChecking=no "ec2-user@$BACKEND_IP" "mkdir -p /home/ec2-user/app/backend"
scp -i "$EC2_KEY" -o StrictHostKeyChecking=no "$SCRIPTS_DIR/backend.env" "ec2-user@$BACKEND_IP:/home/ec2-user/app/backend/.env"

echo "Uploading frontend .env to EC2..."
ssh -i "$EC2_KEY" -o StrictHostKeyChecking=no "ec2-user@$FRONTEND_IP" "mkdir -p /home/ec2-user/app/frontend"
scp -i "$EC2_KEY" -o StrictHostKeyChecking=no "$SCRIPTS_DIR/frontend.env" "ec2-user@$FRONTEND_IP:/home/ec2-user/app/frontend/.env.production"
scp -i "$EC2_KEY" -o StrictHostKeyChecking=no "$SCRIPTS_DIR/frontend.env" "ec2-user@$FRONTEND_IP:/home/ec2-user/app/frontend/.env"

# Cleanup local temp files
rm "$SCRIPTS_DIR/backend.env"
rm "$SCRIPTS_DIR/frontend.env"

echo "Environment files successfully generated and uploaded!"
