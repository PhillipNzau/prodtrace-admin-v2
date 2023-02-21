pipeline {
    agent any

    environment{
        imageName = 'prodtrace_admin'
        registry = 'prodtrace-admin'
        registryCredential = 'dockerhub'
        stagingRegistryUrl = 'http://192.168.1.23:5000'
        productionRegistryUrl = 'http://45.32.22.181:5000'
        dockerImage = ''
        STAGING_SERVER ='192.168.1.24'
        PROD_SERVER ='45.76.214.70'
    }
    stages {
        stage('CLONING PROJECT') {
            steps {
                echo 'Pulling... ' + env.gitlabBranch
                git(url:'http://192.168.0.207/prodtrace/prodtrace-admin.git', branch: env.gitlabBranch , credentialsId: 'GIT_CRED')
            }
        }
        stage ('BUILD') {
            steps{
                script {
                    if (env.gitlabBranch == 'master') {
                            dockerImage = docker.build("$imageName:$BUILD_NUMBER"," -f Dockerfile.production .")
                            docker.withRegistry( productionRegistryUrl,  ) {
                                dockerImage.push()
                                dockerImage.push("latest")
                            }
                    } else {
                            dockerImage = docker.build("$imageName:$BUILD_NUMBER", "-f Dockerfile.staging .")
                            docker.withRegistry( stagingRegistryUrl,  ) {
                                dockerImage.push()
                                dockerImage.push("latest")
                            }
                        }

//                     if (env.gitlabBranch == 'master') {
//                         docker.withRegistry( productionRegistryUrl,  ) {
//                             dockerImage2.push()
//                             dockerImage2.push("latest")
//                         }
//                     } else {
//                         docker.withRegistry( stagingRegistryUrl,  ) {
//                             dockerImage1.push()
//                             dockerImage1.push("latest")
//                         }
//                     }
                }
//                 sh '''docker rmi $imageName:$BUILD_NUMBER
//                    '''
            }
        }

        stage('Cleaning up') {
            steps {
                sh "docker rmi $registry:$BUILD_NUMBER"
            }
        }



        stage ('SERVER SETUP') {
            steps{
                sshagent(credentials:['JENKINS']) {
                    script{
                        if (env.gitlabBranch == 'master') {
                            sh './production-setup.sh'
                        } else {
                            sh '''scp pre-deployment.sh  $STAGING_SERVER:~/
                                  ssh  -o StrictHostKeyChecking=no  $STAGING_SERVER chmod +x pre-deployment.sh ; ./pre-deployment.sh
                            '''
                            sh 'scp docker-compose.staging.yml $STAGING_SERVER:~/prodtrace-admin/frontend/deployment/current/'
                        }
                    }
                }
            }
        }



        stage('DEPLOY PROJECT') {
            steps{
                sshagent(credentials:['JENKINS']) {
                    script{
                        if (env.gitlabBranch == 'master') {
                            sh "ssh  -o StrictHostKeyChecking=no  $PROD_SERVER docker-compose -f prodtrace-admin/docker-compose-prod.yml down --remove-orphans"
                            sh "ssh -o StrictHostKeyChecking=no  $PROD_SERVER docker rmi 45.76.214.70:5000/prodtrace_admin:latest"
                            sh "ssh  -o StrictHostKeyChecking=no  $PROD_SERVER docker-compose -f prodtrace-admin/docker-compose-prod.yml up -d"
                         }else {
                            sh "ssh -o StrictHostKeyChecking=no  $STAGING_SERVER docker-compose -f prodtrace-admin/frontend/deployment/current/docker-compose-staging.yml up -d"
                        }
                    }
                }
            }
        }


    }
}
