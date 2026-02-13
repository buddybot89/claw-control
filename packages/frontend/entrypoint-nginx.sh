#!/bin/sh
# Generate runtime config from environment variables
CONFIG_FILE="/usr/share/nginx/html/config.js"

echo "// Runtime config - generated at container startup" > $CONFIG_FILE
echo "window.__CLAW_CONFIG__ = {" >> $CONFIG_FILE

if [ -n "$VITE_API_URL" ]; then
  echo "  API_URL: \"$VITE_API_URL\"," >> $CONFIG_FILE
elif [ -n "$API_URL" ]; then
  echo "  API_URL: \"$API_URL\"," >> $CONFIG_FILE
fi

echo "};" >> $CONFIG_FILE
echo "Generated config.js:"
cat $CONFIG_FILE

# Setup basic auth if credentials are provided
if [ -n "$AUTH_USER" ] && [ -n "$AUTH_PASSWORD" ]; then
  htpasswd -bc /etc/nginx/.htpasswd "$AUTH_USER" "$AUTH_PASSWORD"
  echo "Basic auth enabled for user: $AUTH_USER"
else
  # Disable auth by overwriting nginx config without auth directives
  cat > /etc/nginx/conf.d/default.conf <<'NGINX'
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
    location = /health {
        return 200 'ok';
        add_header Content-Type text/plain;
    }
}
NGINX
  echo "Basic auth disabled (no AUTH_USER/AUTH_PASSWORD set)"
fi
