pipeline {
    agent {
        kubernetes {
            label 'my-kubernetes-label'
            defaultContainer 'jnlp'
            yaml """
            apiVersion: v1
            kind: Pod
            spec:
              containers:
              - name: docker
                image: docker
                command:
                - cat
                tty: true
              - name: jnlp
                image: jenkins/jnlp-slave:latest
                workingDir: /home/jenkins/agent
                volumeMounts:
                - name: dockersock
                  mountPath: /var/run/docker.sock
              volumes:
              - name: dockersock
                hostPath:
                  path: /var/run/docker.sock
            """
        }
    }
    stages {
        stage('Build Frontend') {
            steps {
                container('docker') {
                    sh 'docker build -t my-frontend-image:latest ./app/frontend'
                }
            }
        }
        stage('Build Backend') {
            steps {
                container('docker') {
                    sh 'docker build -t my-backend-image:latest ./app/backend'
                }
            }
        }
        stage('Push Frontend') {
            steps {
                container('docker') {
                    withCredentials([usernamePassword(credentialsId: 'DOCKER_HUB', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                        sh 'docker login -u $DOCKER_HUB_USERNAME -p $DOCKER_HUB_PASSWORD'
                        sh 'docker push my-frontend-image:latest'
                    }
                }
            }
        }
        stage('Push Backend') {
            steps {
                container('docker') {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                        sh 'docker login -u $DOCKER_HUB_USERNAME -p $DOCKER_HUB_PASSWORD'
                        sh 'docker push my-backend-image:latest'
                    }
                }
            }
        }
    }
}