#!/bin/sh

echo "Deploying.."
sudo pm2 stop api
sudo git fetch
sudo git reset --hard origin/master
npm install
npm run build
sudo pm2 restart api
sudo service nginx restart
echo "Success!"
