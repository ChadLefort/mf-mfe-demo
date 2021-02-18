def affectedApps = []

def getAffectedApps() {
  def projects = []
  def base = env.CHANGE_BRANCH == 'develop' || env.BRANCH_NAME == 'develop' ? 'origin/master' : 'origin/develop'
  def raw = sh(script: "pnpx nx print-affected --base=${base}", returnStdout: true)
  def affected = readJSON(text: raw)

  if (affected.projects) {
    def workspace = readJSON(file: "${env.WORKSPACE}/workspace.json")

    workspace.projects.each {
      if (affected.projects.contains(it.key)) {
        projects.add([name: it.key, directory: it.value.root])
      }
    }
  }

  return projects
}

def getAffectedForE2E() {
  def e2eTestToRun = []
  def apps = []
  def affectedAppsNames = affectedApps.collect { it.name }

  dir("${env.WORKSPACE}/apps") {
    def files = findFiles()

    files.each { f ->
      if (f.directory) {
        try {
          def remotes = readJSON(file: "${env.WORKSPACE}/apps/${f.name}/remotes.json")
          apps.add([name: f.name, remotes: remotes.collect { it.key }])
        } catch (Exception e) {
          println("Exception occurred: ${e.toString()}")
        }
      }
    }
  }

  apps.each { app ->
    app.remotes.each { remote ->
      if (affectedAppsNames.contains(remote)) {
        e2eTestToRun.add(app.name)
      }
    }
  }

  return e2eTestToRun
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
      def app = docker.build("chadlefort/${project}:${env.BUILD_TAG}", directory)
      app.push()
    }
  }
}

pipeline {
  agent any

  stages {
    stage('Install Dependencies') {
      steps {
        nodejs(nodeJSInstallationName: 'Node 14.x') {
          sh 'CYPRESS_INSTALL_BINARY=0 pnpm i'
        }
      }
    }

    stage('Get Affected') {
      steps {
        nodejs(nodeJSInstallationName: 'Node 14.x') {
          script {
            affectedApps = getAffectedApps()
            println(getAffectedForE2E())
          }
        }
      }
    }

    // stage('Build & Test Affected') {
    //   when {
    //     expression { !affectedApps.isEmpty() }
    //   }

    //   steps {
    //     nodejs(nodeJSInstallationName: 'Node 14.x') {
    //       script {
    //         def projects = []

    //         affectedApps.each {
    //           projects.add([name: it.name, target: 'test'])
    //           projects.add([name: it.name, target: 'build'])
    //         }

    //         parallel projects.collectEntries {
    //           ["${it.name}:${it.target}", generateBuildStage(it.name, it.target)]
    //         }
    //       }
    //     }
    //   }
    // }

    // stage('Build & Deploy Docker Containers') {
    //   when {
    //     anyOf { branch 'master'; branch 'develop' }
    //     expression { !affectedApps.isEmpty() }
    //   }

    //   steps {
    //     script{
    //       docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
    //         parallel affectedApps.collectEntries {
    //           [it.name, generateDeployStage(it.name, it.directory)]
    //         }
    //       }
    //     }
    //   }
    // }
  }
}
