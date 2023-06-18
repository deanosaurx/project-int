# CI/CD GitOps Projet with AWS services

This is a CI/CD migration project to AWS

![](../app/images/AWS_GitOps.webp)

## Stack I'll be using

- [x] **EKS**
- [x] **ECR**
- [x] **Jenkins**
- [x] **CodeCommit**
- [x] **CloudWatch**
- [x] **CodePipeline**
- [x] **CodeBuilt**
- [x] **ArgoCD**

## Pre-requisities

- [x] **AWS Account**
- [x] **AWS CLI**
- [x] **Helm CLI**

## Usage

Firstly you need to make sure you're logged in your AWS account with:

```bash
$ aws configure
```

Now create ECR repos, example command:

```bash
$ aws ecr create-repository \
    --repository-name sample-repo \
    --image-tag-mutability IMMUTABLE
```

Now lets create EC2 instance with minimal resources:

```bash
$ aws ec2 run-instances --image-id <your-ami-id> --instance-type <your-instance-type> --security-group-ids <your-security-group> --key-name <your-key-pair> --min-count 1 --max-count 1
```

Install all the neccesary dependencies on the instance and create a new AMI image:

```bash
$ aws ec2 create-image --instance-id <your-instance-id> --name "My AMI" --description "AMI for Auto Scaling"
```

After creating a new image, Create an Auto Scaling launch configuration using the AMI:

```bash
$ aws autoscaling create-launch-configuration --launch-configuration-name "MyLaunchConfig" --image-id <your-ami-id> --instance-type <your-instance-type> --security-groups <your-security-group> --key-name <your-key-pair>
```

Create an Auto Scaling group using the launch configuration, example for how I did it:

```bash
$ aws autoscaling create-auto-scaling-group --auto-scaling-group-name "dean-autoscaling" --launch-configuration-name "dean-autoscaling" --min-size 2 --max-size 5 --desired-capacity 2 --vpc-zone-identifier subnet-02b05e0a00fa2a2d8
```
