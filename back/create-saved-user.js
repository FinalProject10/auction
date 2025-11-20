const sequelize = require('./database/index');
const bcrypt = require('bcrypt');
const {
  Client,
  Admin,
  Seller,
  Memberships,
} = require('./models/relations');

async function createSavedUser() {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('✓ Connected to MySQL server');

    // Hash password for saved user
    const password = 'Saved123@';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get or create basic membership (required for clients)
    const [membership] = await Memberships.findOrCreate({
      where: { type: 'basic' },
      defaults: { type: 'basic', price: 0 }
    });

    // Create saved client user
    const [savedClient, clientCreated] = await Client.findOrCreate({
      where: { email: 'saveduser@test.com' },
      defaults: {
        name: 'Saved',
        lastName: 'User',
        email: 'saveduser@test.com',
        password: hashedPassword,
        telNumb: 12345678,
        cinNum: 12345678,
        memberships_id: membership.id
      }
    });

    if (clientCreated) {
      console.log('✓ Saved Client user created');
    } else {
      // Update password if user exists
      await savedClient.update({ password: hashedPassword });
      console.log('✓ Saved Client user already exists (password updated)');
    }

    // Create saved seller user
    const [savedSeller, sellerCreated] = await Seller.findOrCreate({
      where: { email: 'savedseller@test.com' },
      defaults: {
        name: 'Saved',
        lastName: 'Seller',
        email: 'savedseller@test.com',
        password: hashedPassword,
        telNumb: 87654321,
        cinNum: '87654321',
        batinda: '87654321',
        address: 'Test Address'
      }
    });

    if (sellerCreated) {
      console.log('✓ Saved Seller user created');
    } else {
      // Update password and ensure batinda exists
      await savedSeller.update({ 
        password: hashedPassword,
        batinda: savedSeller.batinda || '87654321',
        cinNum: savedSeller.cinNum || '87654321'
      });
      console.log('✓ Saved Seller user already exists (password updated)');
    }

    // Create saved admin user
    const [savedAdmin, adminCreated] = await Admin.findOrCreate({
      where: { email: 'savedadmin@test.com' },
      defaults: {
        name: 'Saved',
        lastName: 'Admin',
        email: 'savedadmin@test.com',
        password: hashedPassword,
        telNumb: 11111111,
        cinNum: 11111111
      }
    });

    if (adminCreated) {
      console.log('✓ Saved Admin user created');
    } else {
      // Update password if user exists
      await savedAdmin.update({ password: hashedPassword });
      console.log('✓ Saved Admin user already exists (password updated)');
    }

    console.log('\n========================================');
    console.log('=== Saved Test Users Created ===');
    console.log('========================================\n');
    console.log('Password for all saved users: Saved123@\n');
    console.log('SAVED CLIENT:');
    console.log('  Email: saveduser@test.com');
    console.log('  Password: Saved123@\n');
    console.log('SAVED SELLER:');
    console.log('  Email: savedseller@test.com');
    console.log('  Password: Saved123@\n');
    console.log('SAVED ADMIN:');
    console.log('  Email: savedadmin@test.com');
    console.log('  Password: Saved123@\n');
    console.log('========================================\n');

  } catch (error) {
    console.error('✗ Error creating saved users:', error.message);
    if (error.original) {
      console.error('  Original error:', error.original.message);
    }
    throw error;
  } finally {
    await sequelize.close();
    console.log('Database connection closed');
  }
}

createSavedUser()
  .then(() => {
    console.log('✓ Saved users setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n✗ Saved users setup failed!');
    console.error('Make sure MySQL is running and the database credentials are correct.');
    process.exit(1);
  });

