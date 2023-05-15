# CI/CD GitOps Projet with EKS, Jenkins and ArgoCD.

This project builds a complete Amazon EKS cluster with Terraform the CI will be handled by Jenkins and CD will be handled by ArgoCD.

![](images/eks-cicd-codebuild.png)

## Stack I'll be using

- [x] **Terraform**
- [x] **EKS**
- [x] **Jenkins**
- [x] **Helm**
- [x] **ArgoCD**

## Pre-requisities

- [x] **AWS CLI**
- [x] **Terraform**
- [x] **Helm**

## Usage

Firstly you need to make sure you're logged in your AWS account with:

```bash
$ aws configure
```

After you've set the aws credentials in the aws-cli, proceed to Terraform:

```bash
$ git clone https://github.com/deanosaurx/project-int.git
$ cd infra
```

You should see these files:

```bash
$ tree
.
├── 0-provider.tf
├── 1-vpc.tf
├── 2-igw.tf
├── 3-subnets.tf
├── 4-nat.tf
├── 5-routes.tf
├── 6-eks.tf
└── 7-nodes.tf
```

Run Terraform:

```bash
$ terraform init
$ terraform apply
```

Click yes to begin provisioning

## Walkthrough

When the terraform deployment is complete, make sure you can reach the EKS cluster with:

```bash
$ aws eks describe-cluster --name demo --region eu-west-1 --query cluster.resourcesVpcConfig
#This command is based on my tf files, If you changed the cluster name and region in the tf files, make sure to update this command
```

Test it with a simple kubectl command:

```bash
$ kubectl get svc
```

Example output:

```bash
$ NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
 kubernetes   ClusterIP   172.20.0.1   <none>        443/TCP   107m
```
