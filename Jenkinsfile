pipeline {
    agent any
    stages {
      stage('Install Dependencies') {
        steps {
          nodejs(nodeJSInstallationName: 'Node 14.x') {
            sh 'pnpm i --no-optional'
          }
        }
      }
      stage('Build') {
        steps {
          nodejs(nodeJSInstallationName: 'Node 14.x') {
            sh 'nx affected --target=build --base=origin/dev'
          }
        }
      }
    }
}