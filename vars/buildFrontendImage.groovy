def call() {
    script {
        sh 'docker build -t ${FRONTEND_IMAGE_NAME} ./app/backend'
        sh 'docker tag $FRONTEND_IMAGE_NAME ${DOCKER_REGISTRY}/${FRONTEND_IMAGE_NAME}:1.0.${IMAGE_TAG}'
        sh 'docker tag $FRONTEND_IMAGE_NAME ${DOCKER_REGISTRY}/${FRONTEND_IMAGE_NAME}:latest'
        withCredentials([usernamePassword(credentialsId: 'DOCKER_HUB', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
        sh "docker login -u $DOCKER_HUB_USERNAME -p $DOCKER_HUB_PASSWORD"
        }
        withCredentials([usernamePassword(credentialsId: 'DOCKER_HUB', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
        sh 'docker push ${DOCKER_REGISTRY}/${FRONTEND_IMAGE_NAME}:latest'
        sh 'docker push ${DOCKER_REGISTRY}/${FRONTEND_IMAGE_NAME}:1.0.${IMAGE_TAG}'
        }
    }
}