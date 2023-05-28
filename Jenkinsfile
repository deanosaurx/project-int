version="1.1"
repository="deanosaurx/frontend"
tag="latest"
image="${repository}:${version}.${env.BUILD_NUMBER}"

podTemplate(cloud: 'kubernetes', serviceAccount: 'jenkins',
  containers: [
    containerTemplate(name: 'ng', image: 'iktech/angular-client-slave', ttyEnabled: true, command: 'cat'),
    containerTemplate(name: 'buildkit', image: 'moby/buildkit:master', ttyEnabled: true, privileged: true),
    containerTemplate(name: 'sonarqube', image: 'iktech/sonarqube-scanner', ttyEnabled: true, command: 'cat'),
    containerTemplate(name: 'kubectl', image: 'roffe/kubectl', ttyEnabled: true, command: 'cat'),
  ],
  volumes: [
    secretVolume(secretName: 'docker-config', mountPath: '/root/.docker')
  ]) {
    node(POD_LABEL) {

        stage('Build Docker Image') {
            container('buildkit') {
                sh """
                  buildctl build --frontend dockerfile.v0 --local context=. --local dockerfile=. --output type=image,name=${image},push=true
                  buildctl build --frontend dockerfile.v0 --local context=. --local dockerfile=. --output type=image,name=${repository}:${tag},push=true
                """
                milestone(1)
            }
        }
    }
}

properties([[
    $class: 'BuildDiscarderProperty',
    strategy: [
        $class: 'LogRotator',
        artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '10']
    ]
]);
