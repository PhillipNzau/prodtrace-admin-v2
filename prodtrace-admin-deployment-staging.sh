CURRENT_FOLDER=~/prodtrace-admin/frontend/deployment/current
DOCKER_COMPOSE=$CURRENT_FOLDER/docker-compose-staging.yml
PREVIOUS_FOLDER=~/prodtrace-admin/frontend/deployment/previous

if [ -d "$CURRENT_FOLDER" ]; then
    docker-compose -f $DOCKER_COMPOSE down
    mkdir -p $PREVIOUS_FOLDER
    mv $DOCKER_COMPOSE $PREVIOUS_FOLDER
    docker rmi -f 192.168.1.23:5000/prodtrace_admin:latest

else
  mkdir -p $CURRENT_FOLDER
fi
