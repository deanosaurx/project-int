pipeline {
  agent {
    kubernetes {
      label 'my-kubernetes-agent'
    }
  }
  stages {
    stage('Build Docker Image') {
      steps {
        node(POD_LABEL) {
          dir('app/frontend') {
            sh 'docker build -t myimage:latest .'
          }
        }
      }
    }
    // Add more stages for deployment, testing, etc.
  }
}