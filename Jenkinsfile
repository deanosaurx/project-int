pipeline {
  agent {
    kubernetes {
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
  }
}