pipeline {
    agent any

    environment {
        EC2_USER = "ec2-user"
        EC2_HOST = "16.170.158.81"
        KEY_PATH = "C:\\ssh\\jenkins-ec2-key.pem"
        REMOTE_DIR = "~/app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/Abinaya26-G/Per-Diary.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                echo 'Building application...'
                bat 'npm run build'
            }
        }

        stage('Verify Build') {
            steps {
                bat 'dir dist'
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying to EC2...'
                bat """
                scp -i %KEY_PATH% -o StrictHostKeyChecking=no -r dist/* %EC2_USER%@%EC2_HOST%:%REMOTE_DIR%
                """
            }
        }
    }

    post {
        success {
            echo '🚀 SUCCESS: Deployment completed successfully!'
        }
        failure {
            echo '❌ FAILURE: Check logs'
        }
    }
}
