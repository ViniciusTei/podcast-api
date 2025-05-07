#!/bin/sh

echo "Starting Deploy.."
sudo pm2 stop podcastr-api
echo "Installing dependencies.."
npm install
echo "Running build.."
npm run build
echo "Restarting server.."
sudo pm2 restart podcastr-api
sudo service nginx restart
echo "Success!"
