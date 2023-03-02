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
        mailRecepients= 'victor.kanam@prodtrace.io, philip.junior@prodtrace.io'
    }

    stages {

        stage('Cloning Project') {
            steps {
                echo 'Pulling... ' + env.gitlabBranch
                git(url:'http://192.168.0.207/prodtrace/prodtrace-admin.git', branch: env.gitlabBranch , credentialsId: 'GIT_CRED')
            }
        }

        stage ('Build') {
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
                }
            }

            post{
                failure{
                    emailext to: "${mailRecepients}",
                    subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
                    body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}\nMore Info can be found here: ${env.BUILD_URL}",
                    attachLog: true
                }
            }
        }

        stage('Cleaning up') {
            steps {
                sh "docker rmi $imageName:$BUILD_NUMBER"
            }
        }

        stage ('Server Setup') {
            steps{
                sshagent(credentials:['JENKINS']) {
                    script{
                        if (env.gitlabBranch == 'master') {
                            sh "scp prodtrace-admin-deployment-prod.sh  $PROD_SERVER:~/"
                            sh 'ssh  -o StrictHostKeyChecking=no  $PROD_SERVER "chmod +x prodtrace-admin-deployment-prod.sh ; ./prodtrace-admin-deployment-prod.sh"'
                            sh 'scp docker-compose-prod.yml $PROD_SERVER:~/prodtrace-admin/frontend/deployment/current/'

                        } else {
                            sh "scp prodtrace-admin-deployment-staging.sh  $STAGING_SERVER:~/"
                            sh 'ssh  -o StrictHostKeyChecking=no  $STAGING_SERVER "chmod +x prodtrace-admin-deployment-staging.sh ; ./prodtrace-admin-deployment-staging.sh"'
                            sh 'scp docker-compose-staging.yml $STAGING_SERVER:~/prodtrace-admin/frontend/deployment/current/'
                        }
                    }
                }
            }

            post{
                failure{
                    emailext to: "${mailRecepients}",
                    subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
                    body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}\nMore Info can be found here: ${env.BUILD_URL}",
                    attachLog: true
                }
            }
        }

        stage('Deploy ') {
            steps{
                sshagent(credentials:['JENKINS']) {
                    script{
                        if (env.gitlabBranch == 'master') {
                           sh "ssh -o StrictHostKeyChecking=no  $PROD_SERVER docker-compose -f prodtrace-admin/frontend/deployment/current/docker-compose-prod.yml up -d"
                         }else {
                            sh "ssh -o StrictHostKeyChecking=no  $STAGING_SERVER docker-compose -f prodtrace-admin/frontend/deployment/current/docker-compose-staging.yml up -d"
                        }
                    }
                }
            }

            post{
                success{
                    emailext to: "${mailRecepients}",
                    subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
                    body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}\nMore Info can be found here: ${env.BUILD_URL}"
                }
                failure{
                    emailext to: "${mailRecepients}",
                    subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
                    body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}\nMore Info can be found here: ${env.BUILD_URL}",
                    attachLog: true
                }
            }
        }

    }
}
