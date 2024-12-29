pipeline {
    agent any

    environment {
        ACR_NAME = 'simpletodo1acr'  // Replace with your ACR name
    }

    stages {
        stage('Clone Repository') {
            steps {
                //steps {
                  //  git credentialsId: 'github-credentials-id', branch: 'main', url: 'https://github.com/BahaaAhmed-Hub/SimpleTodoPython.git'
                    //    }

               git branch: 'main', url: 'https://github.com/BahaaAhmed-Hub/SimpleTodoPython.git'
            }
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
