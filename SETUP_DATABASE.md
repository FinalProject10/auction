# Database Setup Guide

## Prerequisites

- MySQL must be installed and running
- Database credentials: root / 0000

## Step 1: Start MySQL Server

Try one of these commands to start MySQL:

```bash
# Option 1: Using Homebrew (if installed via Homebrew)
brew services start mysql

# Option 2: Using mysql.server script
sudo /usr/local/mysql/support-files/mysql.server start

# Option 3: If MySQL is installed in a different location
sudo launchctl load -w /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist
```

## Step 2: Create Database and Test Users

Once MySQL is running, execute:

```bash
cd back
node setup-db-sequelize.js
```

This will:

- Create the `final` database if it doesn't exist
- Create all required tables
- Create test users (Client, Seller, Admin)

## Test Users Created

All test users have the same password: **Test123@**

### Client Account

- **Email:** <testclient@test.com>
- **Password:** Test123@

### Seller Account

- **Email:** <testseller@test.com>
- **Password:** Test123@

### Admin Account

- **Email:** <testadmin@test.com>
- **Password:** Test123@

## Troubleshooting

If you get connection errors:

1. Verify MySQL is running: `ps aux | grep mysql`
2. Check MySQL port: `lsof -i :3306`
3. Verify credentials in `back/database/index.js`
4. Try connecting manually: `mysql -u root -p` (password: 0000)

## Alternative: Manual Database Setup

If the script doesn't work, you can manually run the SQL schema:

```bash
mysql -u root -p0000 < back/shema.sql
```

Then create users manually or use the Sequelize script.
