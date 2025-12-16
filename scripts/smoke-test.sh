#!/bin/bash

# Configuration
SERVICE_URL=${1:-"http://localhost:3000"}
MAX_RETRIES=30
SLEEP_INTERVAL=3

echo "Starting smoke tests against $SERVICE_URL..."

# Wait for frontend to be ready
echo "Waiting for frontend to be up..."
for ((i=1; i<=MAX_RETRIES; i++)); do
    response=$(curl -s -o /dev/null -w "%{http_code}" "$SERVICE_URL/api/health")
    if [ "$response" == "200" ]; then
        echo "✅ Frontend is UP and healthy!"
        
        # Print health details
        echo "Health endpoint response:"
        curl -s "$SERVICE_URL/api/health"
        echo ""
        
        exit 0
    fi
    echo "Attempt $i/$MAX_RETRIES: Frontend not ready yet... waiting ${SLEEP_INTERVAL}s"
    sleep $SLEEP_INTERVAL
done

echo "❌ Frontend failed to start within timeout."
exit 1
