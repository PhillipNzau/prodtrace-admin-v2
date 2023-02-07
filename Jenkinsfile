pipeline {
    agent any

    environment{
        imageName = 'prodtrace_admin'
        registry = 'prodtrace-admin'
        registryCredential = 'dockerhub'
        stagingRegistryUrl = 'http://192.168.1.23:5000'
        productioRegistryUrl = 'http://45.32.22.181:5000'
        dockerImage1 = ''
        dockerImage2 = ''
        STAGING_SERVER ='192.168.1.24'
        PROD_SERVER ='45.76.214.70'
    }
    stages {
        stage('Cloning our Git') {
            steps {
                echo 'Pulling... ' + env.gitlabBranch
                git(url:'http://192.168.0.207/prodtrace/prodtrace-admin.git', branch: env.gitlabBranch , credentialsId: 'GIT_CRED')
            }
        }
        stage ('BUILD') {
            steps{
                script {
                    dockerImage1 = docker.build("$imageName:$BUILD_NUMBER", "-f Dockerfile.staging .")
                    dockerImage2 = docker.build("$imageName:$BUILD_NUMBER", "-f Dockerfile.production .")
                }
                script {
                    if (env.gitlabBranch == 'master') {
                        docker.withRegistry( productionRegistryUrl,  ) {
                            dockerImage2.push()
                            dockerImage2.push("latest")
                        }
                    } else {
                        docker.withRegistry( stagingRegistryUrl,  ) {
                            dockerImage1.push()
                            dockerImage1.push("latest")
                        }
                }
                }
                sh '''docker rmi $imageName:$BUILD_NUMBER
                    '''
            }
        }
        stage ('SERVER SETUP') {
            steps{
                // sshagent(credentials:['JENKINS']) {
                //     sh 'scp admin-setup.sh  $SERVER:~/'
                // }
                // sshagent(credentials:['JENKINS']) {
                //     sh 'ssh  -o StrictHostKeyChecking=no  $SERVER "chmod +x admin-setup.sh ; ./admin-setup.sh"'
                // }
                sshagent(credentials:['JENKINS']) {
                    script{
                        if (env.gitlabBranch == 'master') {
                            sh './production-setup.sh'
                        } else {
                            sh '''scp staging-setup.sh  $STAGING_SERVER:~/
                            ssh  -o StrictHostKeyChecking=no  $STAGING_SERVER "chmod +x staging-setup.sh ; ./staging-setup.sh"
                            '''
                        }
                    }

                }
            }
        }
        stage('DEPLOY') {
            steps{
                sshagent(credentials:['JENKINS']) {
                    // sh "ssh  -o StrictHostKeyChecking=no  $SERVER docker-compose -f prodtrace-admin/docker-compose.yml down --remove-orphans "
		            // sh "ssh -o StrictHostKeyChecking=no  $SERVER docker rmi 192.168.1.23:5000/prodtrace_admin:latest"
                    // sh "ssh -o StrictHostKeyChecking=no  $SERVER docker-compose -f prodtrace-admin/docker-compose.yml up -d"
                    script{
                        if (env.gitlabBranch == 'master') {
                            sh "ssh  -o StrictHostKeyChecking=no  $PRODUCTION_SERVER docker-compose -f prodtrace-admin/docker-compose-prod.yml up -d"
                            // sh "ssh  -o StrictHostKeyChecking=no  $PRODUCTION_SERVER prodtrace-admin/docker-compose.yml down --remove-orphans"

                        } else {
                            sh "ssh  -o StrictHostKeyChecking=no  $STAGING_SERVER docker-compose -f prodtrace-admin/docker-compose.yml down --remove-orphans "
		                    sh "ssh -o StrictHostKeyChecking=no  $STAGING_SERVER docker rmi 192.168.1.23:5000/prodtrace_admin:latest"
                            sh "ssh -o StrictHostKeyChecking=no  $STAGING_SERVER docker-compose -f prodtrace-admin/docker-compose-staging.yml up -d"
                        }
                    }
                }  
            }
        }
    }
}
