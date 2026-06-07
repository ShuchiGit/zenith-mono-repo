variable "project"        { type = string }
variable "env"            { type = string }
variable "role"           { type = string }
variable "vpc_id"         { type = string }
variable "subnet_id"      { type = string }
variable "key_pair_name"  { type = string }
variable "app_port"       { type = number }
variable "instance_type" {
  type    = string
  default = "t3.small"
}
variable "s3_bucket_arn" {
  type    = string
  default = ""
}
variable "tags"           { type = map(string) }
