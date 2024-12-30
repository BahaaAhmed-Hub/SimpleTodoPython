pipeline {
    agent any

    environment {
        ACR_NAME = 'simpletodo1acr'  // Replace with your ACR name
    }

    stages {
        stage('Clone Repository') {
           // steps {
                steps {
                    git credentialsId: '6e563be4-e80c-40dd-afa6-46f6ab55d383', branch: 'main', url: 'https://github.com/BahaaAhmed-Hub/SimpleTodoPython.git'
                        }

              // git branch: 'main', url: 'https://github.com/BahaaAhmed-Hub/SimpleTodoPython.git'
            //}
        }

        stage('Build Docker Images') {
            steps {
                dir('backend') {
                    sh 'docker build -t $ACR_NAME.azurecr.io/backend:latest .'
                }
                dir('frontend') {
                    sh 'docker build -t $ACR_NAME.azurecr.io/frontend:latest .'
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
