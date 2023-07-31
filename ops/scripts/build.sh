if [ "$ENV" = "production" ]; then 
    echo "Building for production environment..."
    npm run build
else
    echo "Building for test environment..."
    npm run build:test
fi