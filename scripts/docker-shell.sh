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

docker exec -i -t social-data-framework /bin/sh
