pipeline {
    agent any

    tools {
        nodejs "NodeJS_18"   // Make sure NodeJS is configured in Jenkins Global Tools
    }

    environment {
        EC2_USER = "ubuntu"
        EC2_HOST = "16.170.158.81"
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
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'npm run build || echo "No build step found"'
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying to EC2...'

                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                            if [ ! -d ${APP_DIR} ]; then
                                mkdir -p ${APP_DIR}
                            fi

                            cd ${APP_DIR}

                            if [ ! -d .git ]; then
                                git clone https://github.com/Abinaya26-G/Per-Diary.git .
                            else
                                git pull origin main
                            fi

                            npm install

                            pm2 restart app || pm2 start npm --name "app" -- start
                        '
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
