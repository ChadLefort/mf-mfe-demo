def affectedApps = [];

def getAffectedApps() {
  def raw = sh(script: 'node ./scripts/affected.js --base=origin/dev', returnStdout: true);
  def projects = readJSON(text: raw);

  return projects;
}

def generateBuildStage(String project, String target) {
  return {
    stage("${project}:${target}") {
      sh "pnpx nx run-many --target=${target} --projects=${project}"
    }
  }
}

def generateDeployStage(String project, String directory) {
  return {
    stage("${project}") {
      def app = docker.build("chadlefort/${project}:${env.BUILD_TAG}", directory);
      app.push();
    }
  }
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
            def projects = []

            for (project in affectedApps) {
              def projectName = project[0];
              projects.push([projectName, 'test']);
              projects.push([projectName, 'build']);
            }

            parallel projects.collectEntries {
              ["${it[0]}:${it[1]}", generateBuildStage(it[0], it[1])]
            }
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
            parallel affectedApps.collectEntries {
              [it[0], generateDeployStage(it[0], it[1].root)]
            }
          }
        }
      }
    }
  }
}