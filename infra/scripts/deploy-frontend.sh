#!/bin/bash
set -e

EC2_HOST="${1:-}"
EC2_KEY="${2:-$HOME/.ssh/zenith-estate-key.pem}"
FRONTEND_DIR="/home/ec2-user/app/frontend"

if [ -z "$EC2_HOST" ]; then
  echo "Usage: $0 <ec2-public-ip> [key-file]"
  exit 1
fi

echo "Syncing frontend code to $EC2_HOST..."
ssh -i "$EC2_KEY" -o StrictHostKeyChecking=no "ec2-user@$EC2_HOST" "sudo yum install -y rsync && mkdir -p $FRONTEND_DIR"

rsync -avz -e "ssh -i $EC2_KEY -o StrictHostKeyChecking=no" \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='.next' \
  --exclude='.env' \
  --exclude='.env.local' \
  --exclude='.env.production' \
  "$(dirname "$0")/../../code/frontend/" "ec2-user@$EC2_HOST:$FRONTEND_DIR/"

echo "Running deploy commands on EC2..."
ssh -i "$EC2_KEY" -o StrictHostKeyChecking=no "ec2-user@$EC2_HOST" << 'ENDSSH'
  set -e
  cd /home/ec2-user/app/frontend

  # Install and build
  npm ci
  npm run build

  # Reload with PM2 (zero-downtime)
  if pm2 list | grep -q "zenith-frontend"; then
    pm2 reload zenith-frontend
  else
    pm2 start npm --name zenith-frontend -- start
    pm2 save
  fi

  echo "Frontend deployed successfully"
ENDSSH

echo "Frontend deployment complete!"
