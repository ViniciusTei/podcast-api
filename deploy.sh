#!/bin/sh

echo "Starting Deploy.."
pm2 stop podcastr-api
echo "Installing dependencies.."
npm install
echo "Running build.."
npm run build
echo "Restarting server.."
pm2 restart podcastr-api
service nginx restart
echo "Success!"
