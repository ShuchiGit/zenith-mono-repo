#!/bin/bash
set -e

EC2_HOST="${1:-}"
EC2_KEY="${2:-$HOME/.ssh/zenith-estate-key.pem}"
BACKEND_DIR="/home/ec2-user/app/backend"

if [ -z "$EC2_HOST" ]; then
  echo "Usage: $0 <ec2-public-ip> [key-file]"
  exit 1
fi

echo "Syncing backend code to $EC2_HOST..."
ssh -i "$EC2_KEY" -o StrictHostKeyChecking=no "ec2-user@$EC2_HOST" "sudo yum install -y rsync && mkdir -p $BACKEND_DIR"

rsync -avz -e "ssh -i $EC2_KEY -o StrictHostKeyChecking=no" \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='logs' \
  --exclude='.env' \
  --exclude='.env.local' \
  --exclude='.env.production' \
  "$(dirname "$0")/../../code/backend/" "ec2-user@$EC2_HOST:$BACKEND_DIR/"

echo "Running deploy commands on EC2..."
ssh -i "$EC2_KEY" -o StrictHostKeyChecking=no "ec2-user@$EC2_HOST" << 'ENDSSH'
  set -e
  cd /home/ec2-user/app/backend

  # Install dependencies
  npm ci --production

  # Generate Prisma client
  npx prisma generate

  # Run migrations
  npx prisma migrate deploy

  # Reload with PM2 (zero-downtime)
  if pm2 list | grep -q "zenith-backend"; then
    pm2 reload zenith-backend
  else
    pm2 start src/app.js --name zenith-backend --instances 1
    pm2 save
  fi

  echo "Backend deployed successfully"
ENDSSH

echo "Backend deployment complete!"
