variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "env" {
  description = "Environment name"
  type        = string
  default     = "prod"
}

variable "project" {
  description = "Project name"
  type        = string
  default     = "zenith-estate"
}

variable "domain" {
  description = "Root domain name"
  type        = string
  default     = "zenithestate.in"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "zenith_estate"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "zenith_user"
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT signing secret"
  type        = string
  sensitive   = true
}

variable "acm_cert_arn" {
  description = "ACM certificate ARN (issued manually in AWS console)"
  type        = string
}

variable "cdn_domain" {
  description = "CDN subdomain"
  type        = string
  default     = "cdn.zenithestate.in"
}

variable "admin_domain" {
  description = "Admin portal subdomain"
  type        = string
  default     = "admin.zenithestate.in"
}

variable "key_pair_name" {
  description = "EC2 SSH key pair name"
  type        = string
}
