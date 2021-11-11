#!/bin/sh
@rem ===== 1. 빌드된 jar파일을 서버에 전송
scp -i "/Users/hee/Documents/keys/myworkspace.pem" -r /Users/hee/Documents/Project/projectspace/gagymservice/build/libs/*.jar ubuntu@ec2-52-78-211-59.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/app/gagymservice
scp -i "/Users/hee/Documents/keys/myworkspace.pem" -r /Users/hee/Documents/git2021-working/project/projectspace/gagymservice/build/libs/*.jar ubuntu@ec2-13-125-231-210.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/app/gagymservice
@rem ===== 2. jar파일을 실행하는 run.sh 스크립트 파일을 서버에 전송
scp -i "/Users/hee/Documents/keys/myworkspace.pem" -r /Users/hee/Documents/Project/projectspace/gagymservice/run.sh ubuntu@ec2-13-125-231-210.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/app/gagymservice
@rem ===== 3. run.sh 스크립파일을 실행가능하도록 권한부여(777 -> rwx rwx rwx)
ssh -i "/Users/hee/Documents/keys/myworkspace.pem" ubuntu@ec2-13-125-231-210.ap-northeast-2.compute.amazonaws.com "sudo chmod 777 /home/ubuntu/app/gagymservice/run.sh"
@rem ===== 4. jar파일 있는 디렉터리까지 이동하고, run.sh로 기존 프로세스 죽이고 실행
ssh -i "/Users/hee/Documents/keys/myworkspace.pem" ubuntu@ec2-13-125-231-210.ap-northeast-2.compute.amazonaws.com "cd /home/ubuntu/app/gagymservice; ./run.sh gagymservice"


@rem ===== 1. 다른 프로젝트에서 할 때는 사전에 mkdir /home/ubuntu/app/프로젝트명 디렉터리를 만들어야함
@rem ===== 2. 키파일명 myworkspace.pem 제외하고 "myworkspace" 이것을 프로젝트명으로 바꿈  