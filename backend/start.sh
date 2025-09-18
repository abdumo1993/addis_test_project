#!/bin/sh

echo "Waiting for database to be ready..."
# Wait for MongoDB to be available (optional, useful in Docker Compose)
# You can uncomment this if using Docker Compose with MongoDB
# while ! nc -z mongodb 27017; do
#   echo "Waiting for MongoDB..."
#   sleep 2
# done

echo "Starting database seeding..."
npm run seed

if [ $? -eq 0 ]; then
    echo "Database seeded successfully!"
    echo "Starting application..."
    npm start
else
    echo "Database seeding failed!"
    exit 1
fi
