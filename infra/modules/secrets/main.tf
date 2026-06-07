resource "aws_secretsmanager_secret" "db_password" {
  name                    = "${var.project}/${var.env}/db-password"
  recovery_window_in_days = 7
  tags                    = merge(var.tags, { Name = "${var.project}-${var.env}-db-password" })
}

resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id     = aws_secretsmanager_secret.db_password.id
  secret_string = var.db_password
}

resource "aws_secretsmanager_secret" "jwt_secret" {
  name                    = "${var.project}/${var.env}/jwt-secret"
  recovery_window_in_days = 7
  tags                    = merge(var.tags, { Name = "${var.project}-${var.env}-jwt-secret" })
}

resource "aws_secretsmanager_secret_version" "jwt_secret" {
  secret_id     = aws_secretsmanager_secret.jwt_secret.id
  secret_string = var.jwt_secret
}
