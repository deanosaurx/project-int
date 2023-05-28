podTemplate(containers: [containerTemplate(image: 'docker', name: 'docker', command: 'cat', ttyEnabled: true)])  {
      node(POD_LABEL) { // gets a pod with both docker and maven
        dir('app/frontend') {
          sh 'docker build -t myimage:latest .'
      }
    }
    
}