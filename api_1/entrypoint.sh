#!/usr/bin/env sh

# entrypoint.sh
# Waits for MySQL and starts the Node.js app

set -e

# Copy uploads directory from src to dist if it doesn't exist or needs updating
echo "📁 Setting up uploads directory..."
mkdir -p dist/uploads/images
if [ -d "/src/uploads" ]; then
  cp -r /src/uploads/* /dist/uploads/
  echo "✅ Uploads directory synced"
fi

# Wait for MySQL (host:port from env or default)
HOST=${DB_HOST:-mysql}
PORT=${DB_PORT:-3306}
TIMEOUT=${WAIT_TIMEOUT:-30}
ls
pwd
# Wait for it
/app/wait-for-it.sh "$HOST" "$PORT" "$TIMEOUT"

# Run your app
echo "🚀 Starting the app..."
exec node dist/index.js
