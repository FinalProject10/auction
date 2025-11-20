# Database Migration: Add createdAt to Bid Table

This migration adds a `createdAt` timestamp column to the `bid` table to track when each bid was placed.

## Files

- `add_createdAt_to_bid.sql` - SQL migration script
- `add_createdAt_to_bid.js` - Node.js migration script

## How to Run

### Option 1: Using Node.js Script (Recommended)

```bash
cd back/migrations
node add_createdAt_to_bid.js
```

### Option 2: Using SQL Script

```bash
mysql -u your_username -p final < add_createdAt_to_bid.sql
```

Or connect to MySQL and run:

```sql
USE final;
SOURCE back/migrations/add_createdAt_to_bid.sql;
```

## What This Migration Does

1. **Adds `createdAt` column** to the `bid` table if it doesn't exist
   - Type: DATETIME
   - Default: CURRENT_TIMESTAMP
   - Position: After `clients_id` column

2. **Updates existing bids** with timestamps based on their item's auction start time
   - For bids without a timestamp, sets `createdAt` to the item's `timeStart`

3. **Adds an index** on `createdAt` for better query performance

## After Running Migration

- New bids will automatically have `createdAt` timestamps set when they are created
- Existing bids will have timestamps based on their item's auction start time
- The bid history chart will display accurate timestamps for all bids

## Notes

- The migration is safe to run multiple times (it checks if the column already exists)
- Existing bid records will be updated with approximate timestamps based on auction start times
- Future bids will have accurate timestamps automatically set by Sequelize

