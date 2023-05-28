pipeline {
    agent {
        kubernetes {
            // Specify the Kubernetes agent configuration
            // In this example, we use a predefined Jenkins Kubernetes pod template
            // You can customize it based on your cluster setup
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
                    image: jenkins/jnlp-slave
                    resources:
                      limits:
                        memory: 512Mi
                        cpu: 500m
                      requests:
                        memory: 256Mi
                        cpu: 200m
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
        stage('Build') {
            steps {
                container('docker') {
                    // Inside this container, Docker commands will run on the Jenkins server
                    sh 'docker version'
                    dir('app/frontend') {
                    sh 'docker build -t myimage:latest .'
                    // Additional pipeline steps using Docker
                }
            }
        }
        // Other stages...
    }
}
}