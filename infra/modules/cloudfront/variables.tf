variable "project"                  { type = string }
variable "env"                      { type = string }
variable "purpose"                  { type = string }
variable "s3_bucket_id"             { type = string }
variable "s3_bucket_regional_domain" { type = string }
variable "acm_cert_arn"             { type = string }
variable "aliases"                  { type = list(string) }
variable "is_spa" {
  type    = bool
  default = false
}
variable "tags"                     { type = map(string) }
