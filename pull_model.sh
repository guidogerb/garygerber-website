#!/bin/sh
# This script safely starts the Ollama server, pulls a model, and then stops the server.

set -e

# Start the Ollama server in the background
ollama serve & 

# Get the process ID of the server
pid=$!

# Wait for the server to be ready
until curl -s http://127.0.0.1:11434 > /dev/null; do
  echo "Waiting for Ollama server..."
  sleep 1
done

# Pull the desired model
ollama pull gemma:2b

# Stop the server
kill $pid

# Wait for the process to terminate
wait $pid
