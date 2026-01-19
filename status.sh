#!/bin/bash

################################################################################
# Flexibench Status Check Script
# Quick status overview of the deployment
################################################################################

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

PROJECT_DIR="/home/ubuntu/Flexibench_website"
BUILD_DIR="${PROJECT_DIR}/out"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 Flexibench Deployment Status${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if build exists
echo -e "${BLUE}Build Status:${NC}"
if [ -d "$BUILD_DIR" ]; then
    BUILD_DATE=$(stat -c %y "$BUILD_DIR" 2>/dev/null | cut -d' ' -f1,2 | cut -d'.' -f1)
    BUILD_SIZE=$(du -sh "$BUILD_DIR" 2>/dev/null | cut -f1)
    FILE_COUNT=$(find "$BUILD_DIR" -type f 2>/dev/null | wc -l)
    echo -e "  ${GREEN}✓${NC} Build exists"
    echo -e "  📅 Last built: ${BUILD_DATE}"
    echo -e "  📦 Size: ${BUILD_SIZE}"
    echo -e "  📄 Files: ${FILE_COUNT}"
else
    echo -e "  ${RED}✗${NC} No build found"
fi
echo ""

# Check Node.js
echo -e "${BLUE}Node.js Environment:${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)
    echo -e "  ${GREEN}✓${NC} Node.js: ${NODE_VERSION}"
    echo -e "  ${GREEN}✓${NC} npm: ${NPM_VERSION}"
else
    echo -e "  ${RED}✗${NC} Node.js not found"
fi
echo ""

# Check Nginx
echo -e "${BLUE}Nginx Status:${NC}"
if command -v nginx &> /dev/null; then
    NGINX_VERSION=$(nginx -v 2>&1 | cut -d'/' -f2)
    echo -e "  ${GREEN}✓${NC} Nginx: ${NGINX_VERSION}"
    
    if sudo systemctl is-active --quiet nginx; then
        echo -e "  ${GREEN}✓${NC} Service: Running"
    else
        echo -e "  ${RED}✗${NC} Service: Not running"
    fi
    
    if [ -f "/etc/nginx/sites-enabled/flexibench.io" ]; then
        echo -e "  ${GREEN}✓${NC} Config: Enabled"
    else
        echo -e "  ${YELLOW}⚠${NC} Config: Not enabled"
    fi
else
    echo -e "  ${RED}✗${NC} Nginx not found"
fi
echo ""

# Check backups
echo -e "${BLUE}Backups:${NC}"
if [ -d "${PROJECT_DIR}/backups" ]; then
    BACKUP_COUNT=$(ls -1 "${PROJECT_DIR}/backups" 2>/dev/null | wc -l)
    if [ "$BACKUP_COUNT" -gt 0 ]; then
        echo -e "  ${GREEN}✓${NC} Available backups: ${BACKUP_COUNT}"
        LATEST_BACKUP=$(ls -t "${PROJECT_DIR}/backups" 2>/dev/null | head -n1)
        echo -e "  📦 Latest: ${LATEST_BACKUP}"
    else
        echo -e "  ${YELLOW}⚠${NC} No backups found"
    fi
else
    echo -e "  ${YELLOW}⚠${NC} Backup directory not found"
fi
echo ""

# Check logs
echo -e "${BLUE}Recent Activity:${NC}"
if [ -f "${PROJECT_DIR}/deploy.log" ]; then
    echo -e "  ${GREEN}✓${NC} Deploy log exists"
    LAST_DEPLOY=$(tail -n 20 "${PROJECT_DIR}/deploy.log" 2>/dev/null | grep "Deployment Completed" | tail -n1 | cut -d']' -f1 | cut -d'[' -f2)
    if [ -n "$LAST_DEPLOY" ]; then
        echo -e "  🕐 Last deployment: ${LAST_DEPLOY}"
    fi
else
    echo -e "  ${YELLOW}⚠${NC} No deploy log found"
fi

if [ -f "/var/log/nginx/flexibench.io.access.log" ]; then
    RECENT_REQUESTS=$(tail -n 100 /var/log/nginx/flexibench.io.access.log 2>/dev/null | wc -l)
    echo -e "  📊 Recent requests (last 100 lines): ${RECENT_REQUESTS}"
fi
echo ""

# Check website
echo -e "${BLUE}Website:${NC}"
echo -e "  🌐 URL: ${GREEN}https://flexibench.io${NC}"
echo -e "  🔌 API: ${GREEN}https://flexibench.io/api/*${NC} → localhost:3000"
echo ""

# Quick commands
echo -e "${BLUE}Quick Commands:${NC}"
echo -e "  Deploy:       ${YELLOW}./deploy.sh${NC}"
echo -e "  Quick deploy: ${YELLOW}./quick-deploy.sh${NC}"
echo -e "  With backup:  ${YELLOW}./backup-and-deploy.sh${NC}"
echo -e "  Rollback:     ${YELLOW}./rollback.sh${NC}"
echo -e "  View logs:    ${YELLOW}tail -f deploy.log${NC}"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
