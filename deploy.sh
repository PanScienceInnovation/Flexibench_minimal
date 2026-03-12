#!/bin/bash

################################################################################
# Flexibench Frontend Deployment Script
# This script builds and deploys the Flexibench website
################################################################################

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/home/ubuntu/Flexibench_new/Flexibench_minimal"
BUILD_DIR="${PROJECT_DIR}/out"
NGINX_CONFIG="/etc/nginx/sites-available/flexibench.io"
LOG_FILE="${PROJECT_DIR}/deploy.log"

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to log messages
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Start deployment
print_info "Starting Flexibench frontend deployment..."
log_message "=== Deployment Started ==="

# Check if we're in the correct directory
if [ ! -f "${PROJECT_DIR}/package.json" ]; then
    print_error "package.json not found in ${PROJECT_DIR}"
    log_message "ERROR: package.json not found"
    exit 1
fi

cd "$PROJECT_DIR"
print_success "Changed to project directory: ${PROJECT_DIR}"

# Check Node.js and npm
print_info "Checking Node.js and npm..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    log_message "ERROR: Node.js not found"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    log_message "ERROR: npm not found"
    exit 1
fi

NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
print_success "Node.js ${NODE_VERSION} and npm ${NPM_VERSION} found"
log_message "Using Node.js ${NODE_VERSION} and npm ${NPM_VERSION}"

# Install dependencies
print_info "Installing/updating dependencies..."
log_message "Installing dependencies..."
if npm install --production=false; then
    print_success "Dependencies installed successfully"
    log_message "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    log_message "ERROR: Failed to install dependencies"
    exit 1
fi

# Run linting (optional, won't fail deployment)
print_info "Running linter..."
if npm run lint 2>&1 | tee -a "$LOG_FILE"; then
    print_success "Linting completed"
else
    print_warning "Linting found issues (continuing anyway)"
fi

# Build the project
print_info "Building Next.js project..."
log_message "Building project..."
if npm run build 2>&1 | tee -a "$LOG_FILE"; then
    print_success "Build completed successfully"
    log_message "Build completed successfully"
else
    print_error "Build failed"
    log_message "ERROR: Build failed"
    exit 1
fi

# Check if build output exists
if [ ! -d "$BUILD_DIR" ]; then
    print_error "Build directory not found: ${BUILD_DIR}"
    log_message "ERROR: Build directory not found"
    exit 1
fi

print_success "Build output found at ${BUILD_DIR}"

# Create URL-encoded symlinks for resource files
print_info "Creating URL-encoded symlinks for resource files..."
if [ -f "${PROJECT_DIR}/create-url-encoded-symlinks.sh" ]; then
    "${PROJECT_DIR}/create-url-encoded-symlinks.sh" 2>&1 | tee -a "$LOG_FILE"
    print_success "Symlinks created"
    log_message "URL-encoded symlinks created"
else
    print_warning "Symlink script not found, skipping"
fi

# Set proper permissions
print_info "Setting file permissions..."
chmod -R 755 "$BUILD_DIR"
print_success "Permissions set"
log_message "File permissions set"

# Test Nginx configuration
print_info "Testing Nginx configuration..."
if sudo nginx -t 2>&1 | tee -a "$LOG_FILE"; then
    print_success "Nginx configuration is valid"
    log_message "Nginx configuration valid"
else
    print_error "Nginx configuration test failed"
    log_message "ERROR: Nginx configuration invalid"
    exit 1
fi

# Reload Nginx
print_info "Reloading Nginx..."
if sudo systemctl reload nginx; then
    print_success "Nginx reloaded successfully"
    log_message "Nginx reloaded successfully"
else
    print_error "Failed to reload Nginx"
    log_message "ERROR: Failed to reload Nginx"
    exit 1
fi

# Check Nginx status
print_info "Checking Nginx status..."
if sudo systemctl is-active --quiet nginx; then
    print_success "Nginx is running"
    log_message "Nginx is active"
else
    print_warning "Nginx is not running properly"
    log_message "WARNING: Nginx not active"
fi

# Display deployment summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_success "🚀 Deployment completed successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
print_info "Project Directory: ${PROJECT_DIR}"
print_info "Build Directory: ${BUILD_DIR}"
print_info "Website URL: https://flexibench.io"
print_info "Log File: ${LOG_FILE}"
echo ""
print_info "Next steps:"
echo "  1. Test the website in your browser"
echo "  2. Check logs: tail -f /var/log/nginx/flexibench.io.access.log"
echo "  3. Monitor errors: tail -f /var/log/nginx/flexibench.io.error.log"
echo ""

log_message "=== Deployment Completed Successfully ==="
log_message ""

exit 0
