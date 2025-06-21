#!/bin/sh
# This script runs on container startup. It starts the Ollama server,
# pulls the model if it's not already present, and then keeps the server running.

set -e

# Start the server in the background
ollama serve &

# Get the process ID of the server
pid=$!

# Wait for the server to be ready
echo "Waiting for Ollama server to start..."
until curl -s http://127.0.0.1:11434 > /dev/null; do
  sleep 0.5
done
echo "Ollama server is ready."

# Pull the model. This will be very fast if the model is already present.
echo "Pulling gemma:2b model..."
ollama pull gemma:2b
echo "Model is ready."

# Bring the server process to the foreground to keep the container running
wait $pid
