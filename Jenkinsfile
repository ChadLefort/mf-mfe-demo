def affectedApps = [];
def getAffectedApps() {
  def raw = sh(script: 'node ./scripts/affected.js --base=origin/dev', returnStdout: true);
  def projects = readJSON(text: raw);

  return projects;
}

pipeline {
  agent any

  stages {
    stage('Install Dependencies') {   
      steps {
        nodejs(nodeJSInstallationName: 'Node 14.x') {
          sh 'pnpm i'
        }
      }
    }

    stage('Get Affected Apps') {
      steps {
        script {
          nodejs(nodeJSInstallationName: 'Node 14.x') {
            affectedApps = getAffectedApps();
          }
        }
      }
    }

    stage('Build Apps') {
      when {
        expression { !affectedApps.isEmpty() }
      }

      steps {
        script {   
          nodejs(nodeJSInstallationName: 'Node 14.x') {
            def projects = [];

            for (project in affectedApps) {
              def projectName = project[0];
              projects.push(projectName);
            }

            sh "pnpx nx run-many --target=build --projects=${projects.join(',')} --parallel"
          }
        }
      }
    }

    stage('Build & Deploy Docker Containers') {
      when {
        anyOf { branch 'master'; branch 'dev' }
        expression { !affectedApps.isEmpty() }
      }

      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {  
            nodejs(nodeJSInstallationName: 'Node 14.x') {
              for (project in affectedApps) {
                def projectName = project[0];
                def projectDirectory = project[1].root;
                def app = docker.build("chadlefort/${projectName}:${env.BUILD_TAG}", projectDirectory);

                app.push();
              }
            }
          }
        }
      }
    }
  }
}