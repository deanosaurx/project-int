resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.todo-app.id

  tags = {
    Name = "igw"
  }
}