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
  # Create empty htpasswd and disable auth
  echo "" > /etc/nginx/.htpasswd
  export AUTH_REALM="off"
  echo "Basic auth disabled (no AUTH_USER/AUTH_PASSWORD set)"
fi

# Set default realm
export AUTH_REALM="${AUTH_REALM:-Claw Control}"
