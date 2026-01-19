# Flexibench Frontend Deployment Guide

This guide covers all deployment scripts and procedures for the Flexibench website.

## 📦 Deployment Scripts Overview

### 1. `deploy.sh` - Full Deployment
**Use for:** Production deployments, initial setup, or when dependencies changed

```bash
./deploy.sh
```

**What it does:**
- ✅ Checks Node.js and npm versions
- ✅ Installs/updates all dependencies
- ✅ Runs linter (optional, won't fail deployment)
- ✅ Builds the Next.js project
- ✅ Sets proper file permissions
- ✅ Tests Nginx configuration
- ✅ Reloads Nginx
- ✅ Logs everything to `deploy.log`

**Duration:** ~2-3 minutes (includes npm install)

---

### 2. `quick-deploy.sh` - Quick Rebuild
**Use for:** Fast updates when only code changed (no new dependencies)

```bash
./quick-deploy.sh
```

**What it does:**
- ⚡ Builds the project (skips npm install)
- ⚡ Sets permissions
- ⚡ Reloads Nginx

**Duration:** ~30-60 seconds

---

### 3. `backup-and-deploy.sh` - Safe Deployment
**Use for:** Critical updates where you want automatic backup

```bash
./backup-and-deploy.sh
```

**What it does:**
- 💾 Creates backup of current build
- 🔨 Builds new version
- 🗑️ Keeps only last 5 backups
- 🔄 Offers rollback if build fails
- ♻️ Reloads Nginx

**Duration:** ~1-2 minutes

---

### 4. `rollback.sh` - Restore Previous Version
**Use for:** Emergency rollback to previous working version

```bash
# Interactive mode (lists all backups)
./rollback.sh

# Direct rollback to specific backup
./rollback.sh backup_20260114_120000
```

**What it does:**
- 📋 Lists available backups (interactive mode)
- 💾 Creates safety backup before rollback
- 🔙 Restores selected backup
- ♻️ Reloads Nginx

---

## 🚀 Common Workflows

### First Time Deployment
```bash
./deploy.sh
```

### Daily Updates (code changes only)
```bash
./quick-deploy.sh
```

### Production Release (with backup)
```bash
./backup-and-deploy.sh
```

### Emergency Rollback
```bash
./rollback.sh
```

---

## 📁 Directory Structure

```
/home/ubuntu/Flexibench_website/
├── deploy.sh                 # Full deployment script
├── quick-deploy.sh           # Quick rebuild script
├── backup-and-deploy.sh      # Deployment with backup
├── rollback.sh               # Rollback script
├── deploy.log                # Deployment logs
├── backups/                  # Backup directory
│   ├── backup_20260114_120000/
│   ├── backup_20260114_130000/
│   └── ...
├── out/                      # Build output (served by Nginx)
├── app/                      # Next.js app source
├── components/               # React components
└── package.json              # Dependencies

```

---

## 🔧 Manual Deployment Steps

If you need to deploy manually:

```bash
# 1. Navigate to project
cd /home/ubuntu/Flexibench_website

# 2. Install dependencies (if needed)
npm install

# 3. Build the project
npm run build

# 4. Set permissions
chmod -R 755 out/

# 5. Test Nginx config
sudo nginx -t

# 6. Reload Nginx
sudo systemctl reload nginx
```

---

## 📊 Monitoring

### Check Deployment Logs
```bash
tail -f /home/ubuntu/Flexibench_website/deploy.log
```

### Check Website Access Logs
```bash
tail -f /var/log/nginx/flexibench.io.access.log
```

### Check Website Error Logs
```bash
tail -f /var/log/nginx/flexibench.io.error.log
```

### Check Nginx Status
```bash
sudo systemctl status nginx
```

---

## 🔍 Troubleshooting

### Build Fails
```bash
# Check Node.js version
node --version

# Clear cache and rebuild
rm -rf node_modules .next out
npm install
npm run build
```

### Nginx Won't Reload
```bash
# Check configuration
sudo nginx -t

# View detailed error
sudo systemctl status nginx

# Restart Nginx (if reload fails)
sudo systemctl restart nginx
```

### Website Shows Old Content
```bash
# Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
# Or clear browser cache

# Verify build timestamp
ls -la /home/ubuntu/Flexibench_website/out/
```

---

## 🔐 Permissions

All scripts require:
- **Read/Write** access to `/home/ubuntu/Flexibench_website/`
- **Sudo** access for Nginx operations

---

## 🌐 Website URLs

- **Production:** https://flexibench.io
- **API Endpoint:** https://flexibench.io/api/* (proxied to localhost:3000)

---

## 📝 Notes

1. **Backups:** Limited to 5 most recent backups (automatic cleanup)
2. **Logs:** Check `deploy.log` for detailed deployment history
3. **Build Time:** Full build takes ~2-3 minutes depending on changes
4. **Zero Downtime:** Nginx serves old version until new build completes
5. **SSL:** Managed by Certbot, auto-renewed

---

## ⚠️ Important

- Always test on staging before deploying to production
- Create backup before major changes
- Monitor logs after deployment
- Keep deploy scripts updated in version control

---

## 🆘 Emergency Contacts

If deployment fails and you need help:
1. Check `deploy.log` for errors
2. Check Nginx error logs
3. Use rollback script to restore previous version
4. Contact DevOps team

---

**Last Updated:** 2026-01-14
**Maintained By:** DevOps Team
