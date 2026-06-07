#!/bin/bash
# Creates the local S3 bucket for assets on LocalStack startup
awslocal s3 mb s3://zenith-estate-local-assets --region ap-south-1
awslocal s3api put-bucket-cors \
  --bucket zenith-estate-local-assets \
  --cors-configuration '{
    "CORSRules": [{
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
      "AllowedOrigins": ["*"],
      "ExposeHeaders": []
    }]
  }'
echo "LocalStack S3 bucket ready: zenith-estate-local-assets"
