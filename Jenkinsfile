pipeline {
    agent any

    tools {
        nodejs "NodeJS_18"
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
                bat 'npm run build'
            }
        }

        stage('Verify Build') {
            steps {
                bat 'dir dist'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Build completed!'
        }

        failure {
            echo 'FAILED: Build failed!'
        }
    }
}
