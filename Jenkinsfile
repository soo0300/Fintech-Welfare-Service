pipeline {
    environment {
        docker_repo = "gugaro/hkdream"
        docker_key = credentials("Docker")
        docker_image = ''
    }
    agent any
    tools {
        nodejs "node18"
    }
    stages {
        stage('Build React App') {
            steps {
                sh '''
                    cd ./frontend
                    npm install
                    CI=false npm run build
                '''
            }
        }
        stage('Build Docker Image') {
            steps {
                sh '''
                    cd ./device/frontend/
                    docker build -t ${docker_repo}:front-0.1 .
                '''
            }
        }
        stage('Deploy React App Image') {
            steps {
                sh '''
                    docker stop front-app
                    docker rm front-app
                    docker run -d --name front-app --restart=always -p 80:80 -p 443:443 --volume /etc/letsencrypt/:/etc/letsencrypt ${docker_repo}:front-0.1
                '''
            }
        }
    }
    post {
        success {
        	script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'good', 
                message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
                endpoint: 'https://meeting.ssafy.com/hooks/a7iw43e87p8d3pbjfohcasr7sh', 
                channel: 'C209-Jenkins'
                )
            }
        }
        failure {
        	script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'danger', 
                message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
                endpoint: 'https://meeting.ssafy.com/hooks/a7iw43e87p8d3pbjfohcasr7sh', 
                channel: 'C209-Jenkins'
                )
            }
        }
    }
}
