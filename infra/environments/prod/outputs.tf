output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "backend_public_ip" {
  description = "Backend EC2 public IP (set as A record for api.zenithestate.in in GoDaddy)"
  value       = module.ec2_backend.public_ip
}

output "frontend_public_ip" {
  description = "Frontend EC2 public IP (set as A record for zenithestate.in in GoDaddy)"
  value       = module.ec2_frontend.public_ip
}

output "rds_endpoint" {
  description = "RDS MySQL endpoint (private)"
  value       = module.rds.endpoint
}

output "cdn_cloudfront_domain" {
  description = "CloudFront domain for CDN (set as CNAME for cdn.zenithestate.in in GoDaddy)"
  value       = module.cloudfront_cdn.domain_name
}

output "admin_cloudfront_domain" {
  description = "CloudFront domain for admin (set as CNAME for admin.zenithestate.in in GoDaddy)"
  value       = module.cloudfront_admin.domain_name
}

output "assets_bucket_name" {
  description = "S3 bucket name for assets"
  value       = module.s3_assets.bucket_id
}

output "admin_bucket_name" {
  description = "S3 bucket name for admin portal"
  value       = module.s3_admin.bucket_id
}

output "db_secret_arn" {
  description = "Secrets Manager ARN for DB password"
  value       = module.secrets.db_password_secret_arn
}

output "jwt_secret_arn" {
  description = "Secrets Manager ARN for JWT secret"
  value       = module.secrets.jwt_secret_arn
}
