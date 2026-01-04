pipeline {
    agent any

    environment {
        IMAGE_NAME = "node-app-svc"
        CONTAINER_NAME = "node-app-container"
    }

    stages {
        stage('Install & Build') {
            agent {
                docker { 
                    image 'node:20-alpine' 
                    // This maps the workspace so the build persists
                    args '-u root' 
                }
            }
            steps {
                sh 'npm install'
                // sh 'npm run build' (if needed)
            }
        }

        stage('Docker Image Build') {
            steps {
                sh "docker build --no-cache -t ${IMAGE_NAME} ."
            }
        }

        stage('Docker Deploy') {
            steps {
                script {
                    sh "docker rm -f ${CONTAINER_NAME} || true"
                    sh "docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${IMAGE_NAME}"
                }
            }
        }
    }
}
