git pull --rebase
docker stop  skyline-architectes-front
docker rm  skyline-architectes-front
docker build -t  skyline-architectes-front .
docker run -dit --name  skyline-architectes-front --ip 172.18.0.84 --network petit  skyline-architectes-front