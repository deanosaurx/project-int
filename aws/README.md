# CI/CD GitOps Projet with AWS services

This is a CI/CD migration project to AWS

![](../app/images/AWS_GitOps.webp)

## Stack I'll be using

- [x] **EKS**
- [x] **ECR**
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
