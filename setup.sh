#!/bin/bash

# Cập nhật hệ thống và cài đặt phần mềm cần thiết
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install -y nginx git curl

# Mở firewall cho Nginx (nếu cần)
sudo ufw allow 'Nginx HTTP' || true

# Tạo file index.html mẫu
echo "<h1>Welcome from $(hostname)</h1>" | sudo tee /var/www/html/index.html

# Cấu hình lại Nginx
cat <<EOF | sudo tee /etc/nginx/sites-available/default
server {
    listen 80;
    server_name localhost;
    location / {
        root /var/www/html;
        index index.html index.htm;
    }
}
EOF

# Khởi động lại Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "Setup completed successfully on $(hostname)!"