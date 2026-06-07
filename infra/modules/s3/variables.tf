variable "project" { type = string }
variable "env"     { type = string }
variable "purpose" {
  type    = string
  default = "assets"
}
variable "tags"    { type = map(string) }
