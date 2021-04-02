#!/bin/bash

sudo docker run -d -p 6000:3000 --name rite-aid-covid-vaccine-availability-service localhost:32000/rite-aid-covid-vaccine-availability-service:registry
