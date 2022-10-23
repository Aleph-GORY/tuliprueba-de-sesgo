aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 656851202713.dkr.ecr.us-east-1.amazonaws.com
docker build -t tulipanas-repo .
docker tag tulipanas-repo:latest 656851202713.dkr.ecr.us-east-1.amazonaws.com/tulipanas-repo:latest
docker push 656851202713.dkr.ecr.us-east-1.amazonaws.com/tulipanas-repo:latest
