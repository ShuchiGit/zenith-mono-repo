#!/bin/bash
# setup-ssl.sh
set -e

EC2_HOST="${1:-}"
DOMAIN="${2:-}"
EC2_KEY="${3:-$HOME/.ssh/zenith-estate-key.pem}"

if [ -z "$EC2_HOST" ] || [ -z "$DOMAIN" ]; then
  echo "Usage: $0 <ec2-public-ip> <domain-name> [key-file]"
  echo "Example: $0 13.233.100.123 api.zenithestate.in"
  exit 1
fi

echo "Setting up SSL for $DOMAIN on host $EC2_HOST..."

ssh -i "$EC2_KEY" -o StrictHostKeyChecking=no "ec2-user@$EC2_HOST" << EOF
  set -e
  echo "Installing Certbot dependencies..."
  sudo dnf install -y augeas-libs
  
  echo "Setting up Certbot python virtualenv..."
  sudo python3 -m venv /opt/certbot/
  sudo /opt/certbot/bin/pip install --upgrade pip
  sudo /opt/certbot/bin/pip install certbot certbot-nginx
  sudo ln -sf /opt/certbot/bin/certbot /usr/bin/certbot

  echo "Requesting SSL Certificate from Let's Encrypt for $DOMAIN..."
  sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m contact@zenithestate.in --redirect

  echo "Restarting Nginx..."
  sudo systemctl restart nginx
  
  echo "SSL configuration completed successfully for $DOMAIN!"
EOF
