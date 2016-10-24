#!/usr/bin/env bash

which docker &> /dev/null
if [ $? != 0 ]; then
  echo "Docker not found. Please install Docker to continue: https://docs.docker.com/engine/installation"
  exit
fi

current_dir=$(dirname $0)

if [ $current_dir = "." ]; then
  cd ..
fi


running=$(docker ps -a -q -f name=social-data-framework)
if [ ! -z $running ]; then
  docker stop $running &> /dev/null
  docker rm $running &> /dev/null
fi

app_dir=$(pwd)

docker run -it \
           --rm \
           -p 3000:3000 \
           --name social-data-framework \
           -v $app_dir:/usr/local/social-data-framework \
           -v /usr/local/social-data-framework/node_modules \
           social-data-framework/app npm run dev
