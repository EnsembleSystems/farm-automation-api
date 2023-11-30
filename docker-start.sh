#!/usr/bin/env bash

docker build . -t="farm-automation-api"
docker run -d -p 8080:8080 --name farm-automation-api farm-automation-api
docker-compose up
