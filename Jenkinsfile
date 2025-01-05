pipeline {
    agent any
    environment {
        NEXUS_CREDS = credentials('NexusRepo')
        NEXUS_DOCKER_REPO = 'http://57.152.98.224:8081/repository/Docker13/'
    }
    /*environment {
        ACR_NAME = 'simpletodo1acr'  // Replace with your ACR name
    }*/

    stages {
        stage('Clone Repository') {
           // steps {
                steps {
                    git credentialsId: 'bcd691c8-6277-4bff-92a0-b734b71eaf0e', branch: 'main', url: 'https://github.com/BahaaAhmed-Hub/SimpleTodoPython.git'
                        }

              // git branch: 'main', url: 'https://github.com/BahaaAhmed-Hub/SimpleTodoPython.git'
            //}
        }

        stage('Build Docker Images') {
            steps {
                dir('backend') {
                    //sh 'docker build -t $ACR_NAME.azurecr.io/backend:latest .'
                    echo 'Building backend docker Image'
                    sh 'docker build -t $NEXUS_DOCKER_REPO/backend:$BUILD_NUMBER .'
                }
                dir('frontend') {
                    //sh 'docker build -t $ACR_NAME.azurecr.io/frontend:latest .'
                    echo 'Building frontend docker Image'
                    sh 'docker build -t $NEXUS_DOCKER_REPO/frontend:$BUILD_NUMBER .'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                withDockerRegistry([credentialsId: 'acr-credentials', url: 'https://$ACR_NAME.azurecr.io']) {
                    sh 'docker push $ACR_NAME.azurecr.io/backend:latest'
                    sh 'docker push $ACR_NAME.azurecr.io/frontend:latest'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/deployment-backend.yaml'
                sh 'kubectl apply -f k8s/deployment-frontend.yaml'
            }
        }
    }
}
