#!/bin/bash
sudo pm2 start app.js --name nodeUploadMarkdownServer
sudo pm2 save
sudo pm2 startup