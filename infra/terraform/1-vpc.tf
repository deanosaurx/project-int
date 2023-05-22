resource "aws_vpc" "todo-app" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "todo-app"
  }
}