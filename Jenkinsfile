pipeline {
    agent any

    // Ensure Node.js is configured in Jenkins Global Tool Configuration
    tools {
        nodejs 'node-20' // This name must match your Jenkins Tool name exactly
    }

    environment {
        IMAGE_NAME = "eventsnap-svc"
        CONTAINER_NAME = "eventsnap-svc-container"
        HOST_PORT = "4000"
        APP_PORT = "3000"
    }

    stages {
        // Stage 1: Install dependencies
        stage('Install & Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
                // Uncomment if you use TypeScript: sh 'npm run build'
            }
        }

        // Stage 2: Build the Docker Image
        stage('Docker Image Build') {
            steps {
                echo 'Building Docker Image...'
                // --no-cache ensures fresh code is pulled into the image
                sh "docker build --no-cache -t ${IMAGE_NAME} ."
            }
        }

        // Stage 3: Clean up and Deploy
        stage('Docker Deploy') {
            steps {
                script {
                    echo 'Cleaning up existing containers...'
                    
                    // 1. Remove the old container by name if it exists
                    sh "docker rm -f ${CONTAINER_NAME} || true"

                    // 2. Clear any OTHER container using the same port (Port 4000)
                    // This fixes the "Bind: Only one usage of each socket address" error
                    sh """
                        OLD_ID=\$(docker ps -q --filter "publish=${HOST_PORT}")
                        if [ ! -z "\$OLD_ID" ]; then
                            echo "Found another container on port ${HOST_PORT}, removing..."
                            docker rm -f \$OLD_ID
                        fi
                    """

                    // 3. Start the new container
                    echo "Starting new container on port ${HOST_PORT}..."
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${HOST_PORT}:${APP_PORT} ${IMAGE_NAME}"
                }
            }
        }
    }

    // Post-deployment actions
    post {
        success {
            echo "-----------------------------------------------------------"
            echo "Deployment Successful!"
            echo "App is running at: http://localhost:${HOST_PORT}"
            echo "-----------------------------------------------------------"
        }
        failure {
            echo "Deployment failed. Please check the logs above."
        }
        always {
            // Cleans up "dangling" images to save disk space
            echo 'Cleaning up system images...'
            sh 'docker image prune -f'
        }
    }
}
