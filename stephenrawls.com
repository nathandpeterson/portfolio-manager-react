server {
                listen 80;
#               server_name stephenrawls.com;
#               server_name http://68.183.116.206;
#               root /home/nathan/apps/stephenrawls.com/build;

        location / {
                proxy_pass http://localhost:4000;
#               proxy_set_header X-NginX-Proxy true;
#               proxy_set_header Access-Control-Allow-Origin *;
#               proxy_set_header Host $host;
#               proxy_redirect off;
#               proxy_read_timeout 240s;
#               index index.html;

 #           try_files $uri $uri/  /home/nathan/apps/stephenrawls.com/build/index.html;
        }
        }
server {
        listen 80 default_server;
        server_name stephenrawls.com;
        server_name http://68.183.116.206/;
        root /home/nathan/apps/stephenrawls.com/build;
        index index.html index.htm;
location ~* \.(?:manifest|appcache|html?|xml|json)$ {
    expires -1;
    # access_log logs/static.log; # I don't usually include a static log
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
}