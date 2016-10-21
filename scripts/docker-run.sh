#!/usr/bin/env bash

which docker
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
  docker stop $running
  docker rm $running
fi

app_dir=$(pwd)

docker run -d \
           -p 3000:3000 \
           --name social-data-framework \
           -v $app_dir/src:/usr/local/social-data-framework/src \
           social-data-framework/app npm run dev
