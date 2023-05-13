def call() {
    script {
        sh 'docker build -t ${BACKEND_IMAGE_NAME} ./backend'
        sh 'docker tag $BACKEND_IMAGE_NAME ${DOCKER_REGISTRY}:$BACKEND_IMAGE_NAME'
        sh 'docker tag $FRONTEND_IMAGE_NAME ${DOCKER_REGISTRY}:$BACKEND_IMAGE_NAME-${IMAGE_TAG}'
        withCredentials([usernamePassword(credentialsId: 'DOCKER_HUB', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
        sh "docker login -u $DOCKER_HUB_USERNAME -p $DOCKER_HUB_PASSWORD"
        }
        withCredentials([usernamePassword(credentialsId: 'DOCKER_HUB', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
        sh 'docker push ${DOCKER_REGISTRY}:${BACKEND_IMAGE_NAME}'
        sh 'docker push ${DOCKER_REGISTRY}:${BACKEND_IMAGE_NAME}-${IMAGE_TAG}'
        }
    }
}