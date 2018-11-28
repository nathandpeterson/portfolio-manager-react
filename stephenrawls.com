upstream api {
        server localhost:4000;
}

server {
        listen 80;
        server_name stephenrawls.com;
        listen 443 ssl;
        ssl_certificate /etc/letsencrypt/live/stephenrawls.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/stephenrawls.com/privkey.pem;
        root /home/nathan/apps/stephenrawls.com/build;
        index index.html;
        location ~* \.(?:manifest|appcache|html?|xml|json)$ {
                expires -1;
                }

        location ~* \.(?:css|js)$ {
                try_files $uri =404;
                expires 1y;
                access_log off;
                add_header Cache-Control "public";
                }

        location ~* \.(eot|ttf|woff|woff2)$ {
                add_header Access-Control-Allow-Origin *;
                }
  # Any route containing a file extension (e.g. /devicesfile.js)

        location ~ ^.+\..+$ {
                try_files $uri =404;
                }

  # Any route that doesn't have a file extension (e.g. /devices)

        location / {
                try_files $uri $uri/ /index.html;
                }

 location /api {
                proxy_pass http://api;
                }
}