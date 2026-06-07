output "bucket_id"              { value = aws_s3_bucket.main.id }
output "bucket_arn"             { value = "arn:aws:s3:::${aws_s3_bucket.main.bucket}" }
output "bucket_regional_domain" { value = aws_s3_bucket.main.bucket_regional_domain_name }
