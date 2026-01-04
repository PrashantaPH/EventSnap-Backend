pipeline {
    agent any

    environment {
        IMAGE_NAME = "eventsnap-svc"
        CONTAINER_NAME = "eventsnap-svc-container"
        HOST_PORT = "4000"
        APP_PORT = "3000"
    }

    stages {
        // Stage 1: Build the Image (Docker will run npm install inside)
        stage('Docker Image Build') {
            steps {
                echo 'Building Docker Image (npm install happens here)...'
                sh "docker build --no-cache -t ${IMAGE_NAME} ."
            }
        }

        // Stage 2: Cleanup and Deploy
        stage('Docker Deploy') {
            steps {
                script {
                    echo 'Cleaning up old containers...'
                    sh "docker rm -f ${CONTAINER_NAME} || true"

                    sh """
                        OLD_ID=\$(docker ps -q --filter "publish=${HOST_PORT}")
                        if [ ! -z "\$OLD_ID" ]; then
                            docker rm -f \$OLD_ID
                        fi
                    """

                    echo "Starting container on port ${HOST_PORT}..."
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${HOST_PORT}:${APP_PORT} ${IMAGE_NAME}"
                }
            }
        }
    }

    post {
        success {
            echo "Successfully deployed to http://localhost:${HOST_PORT}"
        }
        always {
            sh 'docker image prune -f'
        }
    }
}
