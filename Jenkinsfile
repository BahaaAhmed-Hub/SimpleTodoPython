pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'your-dockerhub-user' // Replace with your DockerHub username
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/<your-username>/SimpleTodoPython.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                dir('backend') {
                    sh 'docker build -t $DOCKER_REGISTRY/backend:latest .'
                }
                dir('frontend') {
                    sh 'docker build -t $DOCKER_REGISTRY/frontend:latest .'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-credentials', url: '']) {
                    sh 'docker push $DOCKER_REGISTRY/backend:latest'
                    sh 'docker push $DOCKER_REGISTRY/frontend:latest'
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
