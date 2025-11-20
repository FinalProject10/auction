# MySQL Setup Guide

## Current Status
MySQL server is not running. The backend server will start but database operations will fail until MySQL is installed and running.

## Option 1: Install MySQL via Homebrew (Recommended)

```bash
# Install MySQL
brew install mysql

# Start MySQL service
brew services start mysql

# Secure MySQL installation (optional but recommended)
mysql_secure_installation
```

After installation, MySQL will start automatically on system boot.

## Option 2: Install MySQL via Official Installer

1. Download MySQL from: https://dev.mysql.com/downloads/mysql/
2. Install the `.dmg` package
3. Follow the installation wizard
4. MySQL will be installed in `/usr/local/mysql/`
5. Start MySQL: `sudo /usr/local/mysql/support-files/mysql.server start`

## Option 3: Use Docker (Alternative)

If you prefer Docker:

```bash
# Run MySQL in Docker
docker run --name mysql-auction \
  -e MYSQL_ROOT_PASSWORD=0000 \
  -e MYSQL_DATABASE=final \
  -p 3306:3306 \
  -d mysql:8.0

# To stop: docker stop mysql-auction
# To start: docker start mysql-auction
```

## Verify MySQL is Running

```bash
# Check if MySQL is running
brew services list | grep mysql

# Or check the port
lsof -i :3306

# Test connection
mysql -u root -p0000 -e "SELECT 1;"
```

## Create Database and Test Users

Once MySQL is running, execute:

```bash
cd back
node setup-db-sequelize.js
```

This will:
- Create the `final` database
- Create all required tables
- Create test users

## Test Users

All users have password: **Test123@**

- **Client:** testclient@test.com
- **Seller:** testseller@test.com  
- **Admin:** testadmin@test.com

## Troubleshooting

### MySQL won't start
```bash
# Check MySQL logs
tail -f /usr/local/var/mysql/*.err
# or
tail -f /opt/homebrew/var/mysql/*.err
```

### Connection refused
- Make sure MySQL is running: `brew services list`
- Check MySQL port: `lsof -i :3306`
- Verify credentials in `back/database/index.js`

### Permission denied
- Make sure you're using the correct password (currently: `0000`)
- Reset MySQL root password if needed

## Quick Start Commands

```bash
# Install MySQL
brew install mysql

# Start MySQL
brew services start mysql

# Wait a few seconds for MySQL to start, then setup database
cd back
node setup-db-sequelize.js

# Restart backend server (it should auto-restart with nodemon)
```

