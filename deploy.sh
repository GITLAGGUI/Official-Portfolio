#!/bin/bash

echo "Building and deploying portfolio to Vercel..."
echo

echo "Step 1: Building the project..."
npm run build
if [ $? -ne 0 ]; then
    echo "Build failed! Please fix the errors and try again."
    exit 1
fi

echo
echo "Step 2: Deploying to Vercel production..."
vercel --prod

echo
echo "Step 3: Setting up domain alias..."
DEPLOYMENT_URL=$(vercel --prod 2>&1 | grep -o 'https://[^[:space:]]*\.vercel\.app')
if [ ! -z "$DEPLOYMENT_URL" ]; then
    vercel alias set "$DEPLOYMENT_URL" joellaggui.vercel.app
fi

echo
echo "Deployment complete! Your portfolio is live at:"
echo "https://joellaggui.vercel.app"
echo
