@Library('devops') _

pipeline {
    agent {
        docker {
            image 'deanosaurx/jenkins-agent:latest'
            args '--user root -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '30'))
        disableConcurrentBuilds()
        timeout(time: 10, unit: 'MINUTES')
    }

    environment {
        DOCKER_REGISTRY = "deanosaurx"
        FRONTEND_IMAGE_NAME = "frontend"
        BACKEND_IMAGE_NAME = "backend"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Build Frontend Image') {
            when {
                changeset "app/frontend/**"
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'DOCKER_HUB', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                sh "docker login -u $DOCKER_HUB_USERNAME -p $DOCKER_HUB_PASSWORD"
                }
                buildFrontendImage()
            }
        }

        stage('Build Backend Image') {
            when {
                changeset "app/backend/**"
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'DOCKER_HUB', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                sh "docker login -u $DOCKER_HUB_USERNAME -p $DOCKER_HUB_PASSWORD"
                }
                buildBackendImage()
            }
        }

        stage('Clean up Docker images') {
            steps {
                sh 'docker image prune -af'
            }
            post {
                always {
                    sh 'docker image prune -af'
                }
            }
        }
      }
    }