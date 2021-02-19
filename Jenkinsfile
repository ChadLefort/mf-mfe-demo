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

    if (affectedAppsNames.contains(app.name)) {
      e2eTestToRun.add(app.name)
    }
  }

  return e2eTestToRun.unique()
}

def generateBuildStage(String projects, String target) {
  return {
    stage("${target}") {
      if (target == 'e2e') {
        // wait-on isn't working for some reason in jenkins workspace even though i can curl the url just fine. i'll just use sleep for now (╯°□°)╯︵ ┻━┻
        sh "concurrently -k -s first -p \"none\" '\"sleep 20 && pnpx nx run-many --target=cypress-run --projects=${projects} --parallel\"' '\"pnpm run start-all\"'"
      } else {
        sh "pnpx nx run-many --target=${target} --projects=${projects}"
      }
    }
  }
}

def generateDeployStage(String project, String directory) {
  return {
    if (!directory.contains('shared')) {
      stage("${project}") {
        def app = docker.build("chadlefort/${project}:${env.BUILD_TAG}", directory)
        app.push()
      }
    }
  }
}

pipeline {
  agent none

  stages {
    stage('Install Dependencies') {
      agent {
        docker {
          image 'chadlefort/node-cypress-pnpm:latest'
          args '-u root --ipc=host'
          reuseNode true
        }
      }
      steps {
        sh 'CYPRESS_INSTALL_BINARY=0 pnpm i'
      }
    }

    stage('Get Affected') {
      agent {
        docker {
          image 'chadlefort/node-cypress-pnpm:latest'
          args '-u root --ipc=host'
          reuseNode true
        }
      }
      steps {
        script {
          affectedApps = getAffectedApps()
        }
      }
    }

    stage('Build & Test Affected') {
      agent {
        docker {
          image 'chadlefort/node-cypress-pnpm:latest'
          args '-u root --ipc=host'
          reuseNode true
        }
      }
      when {
        expression { !affectedApps.isEmpty() }
      }
      environment {
        CYPRESS_RUN_BINARY = '/var/jenkins_home/Cypress/Cypress'
      }

      steps {
        script {
          def tasks = []
          def e2e = getAffectedForE2E()
          def projects = affectedApps.collect { it.name }

          tasks.add([projects: projects.join(','), target: 'test'])
          tasks.add([projects: projects.join(','), target: 'build'])
          tasks.add([projects: e2e.join(','), target: 'e2e'])

          parallel tasks.collectEntries {
            [it.target, generateBuildStage(it.projects, it.target)]
          }
        }
      }
    }

    stage('Build & Deploy Docker Containers') {
      when {
        anyOf { branch 'master'; branch 'develop' }
        expression { !affectedApps.isEmpty() }
      }

      steps {
        script{
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            parallel affectedApps.collectEntries {
              [it.name, generateDeployStage(it.name, it.directory)]
            }
          }
        }
      }
    }
  }
}
