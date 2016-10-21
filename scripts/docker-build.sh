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

docker build -t social-data-framework/app:latest .
