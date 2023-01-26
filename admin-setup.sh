if [ -d "/home/jenkins/prodtrace-admin" ];
then
    rm -r prodtrace-frontend/
    scp -r jenkins@192.168.1.22:/var/lib/jenkins/workspace/prodtrace-admin .
    #git clone http://stve11:xQPoYMpFPYyJWpgmCjnm@192.168.0.207/naiparq/naiparq-backend-pms.git
else
    scp -r jenkins@192.168.1.22:/var/lib/jenkins/workspace/prodtrace-admin .
    #git clone http://stve11:xQPoYMpFPYyJWpgmCjnm@192.168.0.207/naiparq/naiparq-backend-pms.git
