#!/bin/bash

################################################################################
# Flexibench Backup & Deploy Script
# Creates a backup before deploying, allows rollback if needed
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="/home/ubuntu/Flexibench_website"
BACKUP_DIR="${PROJECT_DIR}/backups"
BUILD_DIR="${PROJECT_DIR}/out"
TIMESTAMP=$(date '+%Y%m%d_%H%M%S')
BACKUP_NAME="backup_${TIMESTAMP}"

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_info "🔄 Flexibench Backup & Deploy"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$PROJECT_DIR"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create backup of current build
if [ -d "$BUILD_DIR" ]; then
    print_info "Creating backup of current build..."
    BACKUP_PATH="${BACKUP_DIR}/${BACKUP_NAME}"
    cp -r "$BUILD_DIR" "$BACKUP_PATH"
    print_success "Backup created: ${BACKUP_PATH}"
    
    # Keep only last 5 backups
    print_info "Cleaning old backups (keeping last 5)..."
    cd "$BACKUP_DIR"
    ls -t | tail -n +6 | xargs -r rm -rf
    cd "$PROJECT_DIR"
    print_success "Old backups cleaned"
else
    print_warning "No existing build found to backup"
fi

# Build the project
print_info "Building project..."
if npm run build; then
    print_success "Build completed successfully"
else
    print_error "Build failed!"
    
    # Offer to rollback
    if [ -d "$BACKUP_PATH" ]; then
        echo ""
        print_warning "Would you like to rollback to the backup? (y/n)"
        read -r response
        if [[ "$response" =~ ^[Yy]$ ]]; then
            print_info "Rolling back..."
            rm -rf "$BUILD_DIR"
            cp -r "$BACKUP_PATH" "$BUILD_DIR"
            print_success "Rollback completed"
            exit 1
        fi
    fi
    exit 1
fi

# Set permissions
print_info "Setting permissions..."
chmod -R 755 "$BUILD_DIR"

# Reload Nginx
print_info "Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx
print_success "Nginx reloaded"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_success "✅ Deployment completed successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
print_info "🌐 Website: https://flexibench.io"
print_info "📦 Backup: ${BACKUP_PATH}"
echo ""
print_info "To rollback to this backup, run:"
echo "  ./rollback.sh ${BACKUP_NAME}"
echo ""
