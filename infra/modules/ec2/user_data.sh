#!/bin/bash
set -e

# Update system
yum update -y

# Install Node.js 20
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs git nginx

# Install PM2 globally
npm install -g pm2

# Configure PM2 to start on boot
pm2 startup systemd -u ec2-user --hp /home/ec2-user
systemctl enable pm2-ec2-user

# Configure Nginx as reverse proxy
cat > /etc/nginx/conf.d/app.conf << 'NGINX'
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:${app_port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

# Remove default nginx config
rm -f /etc/nginx/conf.d/default.conf

# Enable and start Nginx
systemctl enable nginx
systemctl start nginx

# Create app directory
mkdir -p /home/ec2-user/app
chown ec2-user:ec2-user /home/ec2-user/app

echo "User data script completed for role: ${role}"
