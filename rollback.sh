#!/bin/bash

################################################################################
# Flexibench Rollback Script
# Rollback to a previous backup
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

PROJECT_DIR="/home/ubuntu/Flexibench_website"
BACKUP_DIR="${PROJECT_DIR}/backups"
BUILD_DIR="${PROJECT_DIR}/out"

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
print_info "🔙 Flexibench Rollback"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if backup directory exists
if [ ! -d "$BACKUP_DIR" ]; then
    print_error "Backup directory not found: ${BACKUP_DIR}"
    exit 1
fi

# If backup name provided as argument
if [ -n "$1" ]; then
    BACKUP_NAME="$1"
    BACKUP_PATH="${BACKUP_DIR}/${BACKUP_NAME}"
    
    if [ ! -d "$BACKUP_PATH" ]; then
        print_error "Backup not found: ${BACKUP_PATH}"
        exit 1
    fi
else
    # List available backups
    print_info "Available backups:"
    echo ""
    
    backups=($(ls -t "$BACKUP_DIR"))
    
    if [ ${#backups[@]} -eq 0 ]; then
        print_error "No backups found"
        exit 1
    fi
    
    for i in "${!backups[@]}"; do
        backup_date=$(echo "${backups[$i]}" | sed 's/backup_//' | sed 's/_/ /')
        echo "  [$i] ${backups[$i]} (${backup_date})"
    done
    
    echo ""
    echo -n "Select backup number to rollback (or 'q' to quit): "
    read -r selection
    
    if [ "$selection" = "q" ]; then
        print_info "Rollback cancelled"
        exit 0
    fi
    
    if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -ge "${#backups[@]}" ]; then
        print_error "Invalid selection"
        exit 1
    fi
    
    BACKUP_NAME="${backups[$selection]}"
    BACKUP_PATH="${BACKUP_DIR}/${BACKUP_NAME}"
fi

# Confirm rollback
print_warning "This will replace the current build with: ${BACKUP_NAME}"
echo -n "Are you sure? (y/n): "
read -r confirm

if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    print_info "Rollback cancelled"
    exit 0
fi

# Backup current build before rollback
if [ -d "$BUILD_DIR" ]; then
    print_info "Creating safety backup of current build..."
    SAFETY_BACKUP="${BACKUP_DIR}/safety_backup_$(date '+%Y%m%d_%H%M%S')"
    cp -r "$BUILD_DIR" "$SAFETY_BACKUP"
    print_success "Safety backup created: ${SAFETY_BACKUP}"
fi

# Perform rollback
print_info "Rolling back to ${BACKUP_NAME}..."
rm -rf "$BUILD_DIR"
cp -r "$BACKUP_PATH" "$BUILD_DIR"
print_success "Files restored"

# Set permissions
print_info "Setting permissions..."
chmod -R 755 "$BUILD_DIR"

# Reload Nginx
print_info "Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx
print_success "Nginx reloaded"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_success "✅ Rollback completed successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
print_info "🌐 Website: https://flexibench.io"
print_info "📦 Restored from: ${BACKUP_NAME}"
echo ""
