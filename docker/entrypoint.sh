#!/bin/sh

mkdir -p /var/www/public/banners

chown -R www-data:www-data /var/www/public/banners
chmod 755 /var/www/public/banners

exec "$@"