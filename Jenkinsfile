pipeline {
    agent any

    environment{
        imageName = 'prodtrace_admin'
        registryCredential = 'dockerhub'
        registryUrl = 'http://192.168.1.23:5000'
        dockerImage1 = ''
        SERVER ='192.168.1.24'
    }
    stages {
        stage('Cloning our Git') {
            steps {
                 git(url:'http://192.168.0.207/prodtrace/prodtrace-admin.git', branch: "master" , credentialsId: 'GIT_CRED')
            }
        }
        stage ('BUILD') {
            steps{
                script {
                    dockerImage1 = docker.build("$imageName:$BUILD_NUMBER")
                }
                script {
                    docker.withRegistry( registryUrl,  ) {
                        dockerImage1.push("latest")
                    }
                }
            
                sh '''docker rmi $imageName:$BUILD_NUMBER
                    '''
            }
        }
        stage ('SERVER SETUP') {
            steps{
                sshagent(credentials:['JENKINS']) {
                    sh 'scp admin-setup.sh  $SERVER:~/'
                }
                sshagent(credentials:['JENKINS']) {
                    sh 'ssh  -o StrictHostKeyChecking=no  $SERVER "chmod +x admin-setup.sh ; ./admin-setup.sh"'
                }
            }
        }
        stage('DEPLOY') {
            steps{
                sshagent(credentials:['JENKINS']) {
                    sh "ssh  -o StrictHostKeyChecking=no  $SERVER docker-compose -f prodtrace-frontend/docker-compose.yml down --remove-orphans "
		            sh "ssh -o StrictHostKeyChecking=no  $SERVER docker rmi 192.168.1.23:5000/prodtrace_admin:latest"
                    sh "ssh -o StrictHostKeyChecking=no  $SERVER docker-compose -f prodtrace-frontend/docker-compose.yml up -d"
                }  
            }
        }
    }
}
