pipeline {
    agent any

    tools {
        nodejs "NodeJS_18"
    }

    environment {
        EC2_USER = "ubuntu"
        EC2_HOST = "YOUR_EC2_PUBLIC_IP"
        APP_DIR  = "/home/ubuntu/app"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Abinaya26-G/Per-Diary.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Building application...'
                bat 'npm run build || echo No build step'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    bat """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} "
                            if not exist ${APP_DIR} mkdir ${APP_DIR}
                            cd ${APP_DIR}

                            if not exist .git (
                                git clone https://github.com/Abinaya26-G/Per-Diary.git .
                            ) else (
                                git pull origin main
                            )

                            npm install
                            pm2 restart app || pm2 start npm --name app -- start
                        "
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
