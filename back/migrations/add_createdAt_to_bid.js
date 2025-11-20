/**
 * Migration script to add createdAt column to bid table
 * Run this script to add timestamp tracking to existing bid records
 */

const sequelize = require('../database/index');

async function addCreatedAtToBid() {
  try {
    console.log('Starting migration: Adding createdAt column to bid table...');
    
    await sequelize.authenticate();
    console.log('✓ Connected to database');

    // Check if column already exists
    const [results] = await sequelize.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'final' 
      AND TABLE_NAME = 'bid' 
      AND COLUMN_NAME = 'createdAt'
    `);

    if (results.length > 0) {
      console.log('✓ createdAt column already exists');
    } else {
      // Add createdAt column (after itemId since that's the last column)
      await sequelize.query(`
        ALTER TABLE \`final\`.\`bid\` 
        ADD COLUMN \`createdAt\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP AFTER \`itemId\`
      `);
      console.log('✓ Added createdAt column to bid table');
    }

    // Update existing bids with timestamps based on auction start time
    const [updateResults] = await sequelize.query(`
      UPDATE \`final\`.\`bid\` b
      INNER JOIN \`final\`.\`items\` i ON b.\`itemId\` = i.\`id\`
      SET b.\`createdAt\` = i.\`timeStart\`
      WHERE b.\`createdAt\` IS NULL OR b.\`createdAt\` = '1970-01-01 00:00:00'
    `);
    console.log(`✓ Updated ${updateResults.affectedRows || 0} existing bid records`);

    // Add index on createdAt for better query performance
    try {
      await sequelize.query(`
        CREATE INDEX \`idx_bid_createdAt\` ON \`final\`.\`bid\` (\`createdAt\`)
      `);
      console.log('✓ Added index on createdAt column');
    } catch (indexError) {
      if (indexError.message.includes('Duplicate key name')) {
        console.log('✓ Index on createdAt already exists');
      } else {
        throw indexError;
      }
    }

    console.log('\n✓ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
addCreatedAtToBid();

