#!/bin/bash

################################################################################
# Flexibench Quick Deployment Script
# Use this for quick rebuilds without reinstalling dependencies
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="/home/ubuntu/Flexibench_website"

echo -e "${BLUE}🚀 Quick Deploy - Flexibench${NC}"
echo ""

cd "$PROJECT_DIR"

# Build
echo -e "${BLUE}[1/3]${NC} Building project..."
npm run build

# Check output
if [ ! -d "$PROJECT_DIR/out" ]; then
    echo -e "${RED}❌ Build failed - output directory not found${NC}"
    exit 1
fi

# Set permissions
echo -e "${BLUE}[2/3]${NC} Setting permissions..."
chmod -R 755 "$PROJECT_DIR/out"

# Reload Nginx
echo -e "${BLUE}[3/3]${NC} Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo ""
echo -e "${GREEN}✅ Quick deployment completed!${NC}"
echo -e "${BLUE}🌐 Visit: https://flexibench.io${NC}"
echo ""
