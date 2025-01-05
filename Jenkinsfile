pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'echo "Building the application..."'
                // Replace with actual build commands
            }
        }
        stage('Upload to Nexus') {
            steps {
                nexusArtifactUploader(
                    nexusVersion: 'nexus3',
                    protocol: 'http',
                    nexusUrl: 'http://57.152.98.224/:8081',
                    repository: 'my-repo',
                    groupId: 'com.example',
                    version: '1.0.0',
                    credentialsId: 'nexus-credentials',
                    artifacts: [
                        [
                            artifactId: 'my-app',
                            classifier: '',
                            file: 'path/to/artifact.jar',
                            type: 'jar'
                        ]
                    ]
                )
            }
        }
    }
}
