#!/bin/bash

#if [ -d "/home/jenkins/prodtrace-admin" ];
#then
#    rm -r prodtrace-admin/
#    scp -r jenkins@192.168.1.22:/var/lib/jenkins/workspace/prodtrace-admin .
    #git clone http://stve11:xQPoYMpFPYyJWpgmCjnm@192.168.0.207/naiparq/naiparq-backend-pms.git
#else
#    scp -r jenkins@192.168.1.22:/var/lib/jenkins/workspace/prodtrace-admin .
    #git clone http://stve11:xQPoYMpFPYyJWpgmCjnm@192.168.0.207/naiparq/naiparq-backend-pms.git
#fi

rsync -av --exclude=.git /var/lib/jenkins/workspace/prodtrace-admin jenkins@192.168.1.24:/home/jenkins
