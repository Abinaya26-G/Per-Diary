pipeline {
    agent any

    environment {
        AWS_CREDENTIALS = credentials('aws-credentials')
        EC2_IP = '16.170.158.81'  // <-- REPLACE THIS with your EC2 IP
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building application...'
                // Add your build commands here
                // Example for Node.js:
                // sh 'npm install'
            }
        }

        stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                    sh '''
                        export AWS_ACCESS_KEY_ID=$AWS_CREDENTIALS_USR
                        export AWS_SECRET_ACCESS_KEY=$AWS_CREDENTIALS_PSW
                        
                        echo "Deploying to EC2..."
                        scp -i $SSH_KEY -o StrictHostKeyChecking=no -r . ec2-user@$EC2_IP:/home/ec2-user/app/
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
hello
hello
