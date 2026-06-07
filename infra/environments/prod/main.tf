terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

locals {
  tags = {
    Project     = var.project
    Environment = var.env
    ManagedBy   = "terraform"
  }
}

module "vpc" {
  source   = "../../modules/vpc"
  project  = var.project
  env      = var.env
  vpc_cidr = var.vpc_cidr
  tags     = local.tags
}

module "secrets" {
  source      = "../../modules/secrets"
  project     = var.project
  env         = var.env
  db_password = var.db_password
  jwt_secret  = var.jwt_secret
  tags        = local.tags
}

module "rds" {
  source             = "../../modules/rds"
  project            = var.project
  env                = var.env
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  db_name            = var.db_name
  db_username        = var.db_username
  db_password        = var.db_password
  tags               = local.tags
}

module "s3_assets" {
  source  = "../../modules/s3"
  project = var.project
  env     = var.env
  purpose = "assets"
  tags    = local.tags
}

module "s3_admin" {
  source  = "../../modules/s3_admin"
  project = var.project
  env     = var.env
  tags    = local.tags
}

module "cloudfront_cdn" {
  source       = "../../modules/cloudfront"
  project      = var.project
  env          = var.env
  purpose      = "cdn"
  s3_bucket_id             = module.s3_assets.bucket_id
  s3_bucket_regional_domain = module.s3_assets.bucket_regional_domain
  acm_cert_arn = var.acm_cert_arn
  aliases      = [var.cdn_domain]
  tags         = local.tags
}

module "cloudfront_admin" {
  source       = "../../modules/cloudfront"
  project      = var.project
  env          = var.env
  purpose      = "admin"
  s3_bucket_id              = module.s3_admin.bucket_id
  s3_bucket_regional_domain = module.s3_admin.bucket_regional_domain
  acm_cert_arn  = var.acm_cert_arn
  aliases       = [var.admin_domain]
  is_spa        = true
  tags          = local.tags
}

module "ec2_backend" {
  source            = "../../modules/ec2"
  project           = var.project
  env               = var.env
  role              = "backend"
  vpc_id            = module.vpc.vpc_id
  subnet_id         = module.vpc.public_subnet_ids[0]
  key_pair_name     = var.key_pair_name
  app_port          = 5000
  s3_bucket_arn     = module.s3_assets.bucket_arn
  tags              = local.tags
}

module "ec2_frontend" {
  source        = "../../modules/ec2"
  project       = var.project
  env           = var.env
  role          = "frontend"
  vpc_id        = module.vpc.vpc_id
  subnet_id     = module.vpc.public_subnet_ids[1]
  key_pair_name = var.key_pair_name
  app_port      = 3000
  tags          = local.tags
}
