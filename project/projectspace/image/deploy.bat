@rem ===== 1. 다른 프로젝트에서 할 때는 사전에 mkdir /home/ubuntu/app/프로젝트명 디렉터리를 만들어야함
@rem ===== 2. 키파일명을 맞추고 "myworkspace" 이것을 프로젝트명으로 바꿈

@rem ===== 1. 빌드된 jar파일을 서버에 전송
scp -i "/Users/hee/Documents/keys/registry.pem" -r /Users/hee/Documents/Project/projectspace/image/build/libs/image*.jar ubuntu@ec2-15-164-54-15.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/app/file
@rem ===== 2. 기존 프로세스 종료
ssh -i "/Users/hee/Documents/keys/registry.pem" ubuntu@ec2-15-164-54-15.ap-northeast-2.compute.amazonaws.com "pkill -9 -f java"
@rem ===== 3. jar 파일 실행
ssh -i "/Users/hee/Documents/keys/registry.pem" ubuntu@ec2-15-164-54-15.ap-northeast-2.compute.amazonaws.com "cd /home/ubuntu/app/file; nohup java -jar file*.jar 1>file.log 2>&1 &"

