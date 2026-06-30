#!/bin/bash
# Keepalive wrapper: restarts next dev if it exits.
cd /home/z/my-project
while true; do
  /home/z/my-project/node_modules/.bin/next dev -p 3000
  echo "[$(date)] next dev exited, restarting in 2s..." >> /home/z/my-project/dev-keepalive.log
  sleep 2
done
