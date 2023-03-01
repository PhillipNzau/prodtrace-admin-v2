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
                    mail to: "philip.junior@prodtrace.io,victor.kanam@prodtrace.io",
                    subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
                    body: "Prodtrace-admin pipeline failed to build and pus image to repo. Use the credentials username: avl password: traincascade url:jenkins.avl.local:8080 to acces logs. Please contact Steve for more assistance."
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
                    mail to: "philip.junior@prodtrace.io,victor.kanam@prodtrace.io",
                    subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
                    body: "Prodtrace-admin pipeline failed to setup the server. Use the credentials username: avl password: traincascade url:jenkins.avl.local:8080 to acces logs. Please contact Steve for more assistance."
                }
            }
        }

        stage('Deploy Project') {
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
                    mail to: "philip.junior@prodtrace.io, victor.kanam@prodtrace.io",
                    subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
                    body: "Prodtrace-admin deployed succesfully"
                }
                failure{
                    mail to: "philip.junior@prodtrace.io,victor.kanam@prodtrace.io",
                    subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
                    body: "Prodtrace-admin pipeline failed to deploy. Use the credentials username: avl password: traincascade url:jenkins.avl.local:8080 to acces logs. Please contact Steve for more assistance."
                }
            }
        }

    }
}
