#!/bin/bash

# Log the current state
echo "Running prebuild hook for Google Services JSON placement"
echo "GOOGLE_SERVICES_JSON location: $GOOGLE_SERVICES_JSON"

# Create necessary directories
mkdir -p android/app/src/debug
mkdir -p android/app/src/Debug

# Copy the file to all possible locations the error mentions
cp "$GOOGLE_SERVICES_JSON" android/app/google-services.json
cp "$GOOGLE_SERVICES_JSON" android/app/src/google-services.json
cp "$GOOGLE_SERVICES_JSON" android/app/src/debug/google-services.json
cp "$GOOGLE_SERVICES_JSON" android/app/src/Debug/google-services.json

echo "Copied Google Services JSON file to Android directories"