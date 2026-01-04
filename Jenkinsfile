pipeline {
    agent any

    environment {
        IMAGE_NAME = "eventsnap-svc"
        CONTAINER_NAME = "eventsnap-svc-container"
        HOST_PORT = "4000"
        APP_PORT = "3000"
    }

    stages {
        // Stage 1: Run npm install inside a temporary Docker container
        stage('Install Dependencies') {
            steps {
                echo 'Running npm install inside Node container...'
                // This mounts your code into a node container, runs install, then disappears
                sh "docker run --rm -v ${WORKSPACE}:/app -w /app node:20-alpine npm install"
            }
        }

        // Stage 2: Build the Production Docker Image
        stage('Docker Image Build') {
            steps {
                echo 'Building final Docker Image...'
                sh "docker build --no-cache -t ${IMAGE_NAME} ."
            }
        }

        // Stage 3: Cleanup and Deploy
        stage('Docker Deploy') {
            steps {
                script {
                    echo 'Removing old containers if they exist...'
                    // Remove by name
                    sh "docker rm -f ${CONTAINER_NAME} || true"

                    // Remove any container blocking Port 4000
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
