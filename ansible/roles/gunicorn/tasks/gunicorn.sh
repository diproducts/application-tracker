#!/bin/bash

# start and enable the Gunicorn socket
sudo systemctl start gunicorn.socket
sudo systemctl enable gunicorn.socket
curl --unix-socket /run/gunicorn.sock localhost

# enable and restart gunicorn service
sudo systemctl enable gunicorn
sudo systemctl daemon-reload
sudo systemctl restart gunicorn
