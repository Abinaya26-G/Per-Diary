pipeline {
    agent any

    environment {
        AWS_CREDENTIALS = credentials('aws-credentials')
        EC2_IP = '16.170.158.81'
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
            }
        }

        stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                    powershell '''
                        # Fix SSH key permissions
                        $path = $env:SSH_KEY
                        $acl = Get-Acl $path
                        
                        # Remove all existing permissions
                        $acl.SetAccessRuleProtection($true, $false)
                        
                        # Add only current user with full control
                        $rule = New-Object System.Security.AccessControl.FileSystemAccessRule(
                            $env:USERNAME, 
                            "FullControl", 
                            "Allow"
                        )
                        $acl.SetAccessRule($rule)
                        Set-Acl $path $acl
                        
                        # Set environment variables
                        $env:AWS_ACCESS_KEY_ID = $env:AWS_CREDENTIALS_USR
                        $env:AWS_SECRET_ACCESS_KEY = $env:AWS_CREDENTIALS_PSW
                        
                        Write-Host "Deploying to EC2..."
                        
                        # Use scp with the fixed key
                        scp -i $env:SSH_KEY -o StrictHostKeyChecking=no -r . ec2-user@$env:EC2_IP:/home/ec2-user/app/
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
