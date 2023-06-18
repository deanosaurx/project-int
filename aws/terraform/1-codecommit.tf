resource "aws_codecommit_repository" "todo-app" {
  repository_name = "project-int"
  description     = "CI/CD GitOps Projet with AWS services"

    tags = {
    Name = "dean"
}
