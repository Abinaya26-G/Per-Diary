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
        bat """
        tar -czf dist.tar.gz dist
        scp -i C:\\ssh\\jenkins-ec2-key.pem dist.tar.gz ec2-user@16.170.158.81:~/
        ssh -i C:\\ssh\\jenkins-ec2-key.pem ec2-user@16.170.158.81 "rm -rf ~/app/* && tar -xzf dist.tar.gz -C ~/app"
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
