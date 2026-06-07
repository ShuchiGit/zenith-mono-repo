resource "aws_cloudfront_origin_access_control" "main" {
  name                              = "${var.project}-${var.env}-${var.purpose}-oac"
  description                       = "OAC for ${var.purpose}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "main" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.project} ${var.purpose} distribution"
  aliases             = var.acm_cert_arn != "" ? var.aliases : []
  default_root_object = var.is_spa ? "index.html" : null
  price_class         = "PriceClass_200"

  origin {
    domain_name              = var.s3_bucket_regional_domain
    origin_id                = "S3-${var.s3_bucket_id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.main.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${var.s3_bucket_id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }

    min_ttl     = 0
    default_ttl = 86400
    max_ttl     = 31536000
  }

  dynamic "custom_error_response" {
    for_each = var.is_spa ? [403, 404] : []
    content {
      error_code            = custom_error_response.value
      response_code         = 200
      response_page_path    = "/index.html"
      error_caching_min_ttl = 300
    }
  }

  restrictions {
    geo_restriction { restriction_type = "none" }
  }

  viewer_certificate {
    cloudfront_default_certificate = var.acm_cert_arn == "" ? true : false
    acm_certificate_arn            = var.acm_cert_arn != "" ? var.acm_cert_arn : null
    ssl_support_method             = var.acm_cert_arn != "" ? "sni-only" : null
    minimum_protocol_version       = var.acm_cert_arn != "" ? "TLSv1.2_2021" : "TLSv1.1_2016"
  }

  tags = merge(var.tags, { Name = "${var.project}-${var.env}-${var.purpose}-cf" })
}

data "aws_iam_policy_document" "s3_cloudfront" {
  statement {
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.s3_bucket_id}/*"]
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.main.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "main" {
  bucket = var.s3_bucket_id
  policy = data.aws_iam_policy_document.s3_cloudfront.json
}
