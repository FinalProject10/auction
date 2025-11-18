const sequelize = require('./database/index');
const bcrypt = require('bcrypt');
const {
  Bid,
  Client,
  Admin,
  Items,
  Memberships,
  Seller,
  Reclamation,
} = require('./models/relations');

async function setupDatabase() {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('✓ Connected to MySQL server');

    // Sync all models (create tables)
    // Note: This will create tables based on model definitions
    // If tables already exist, it won't recreate them unless force: true
    await sequelize.sync({ alter: true });
    console.log('✓ Database tables synced');

    // Create test membership (required for clients)
    const [membership, membershipCreated] = await Memberships.findOrCreate({
      where: { type: 'basic' },
      defaults: { type: 'basic', price: 0 }
    });
    
    if (membershipCreated) {
      console.log('✓ Created basic membership');
    } else {
      console.log('✓ Basic membership already exists');
    }

    // Hash password for test users
    const testPassword = 'Test123@';
    const hashedPassword = await bcrypt.hash(testPassword, 10);

    // Create test client
    const [client, clientCreated] = await Client.findOrCreate({
      where: { email: 'testclient@test.com' },
      defaults: {
        name: 'Test',
        lastName: 'Client',
        email: 'testclient@test.com',
        password: hashedPassword,
        telNumb: 12345678,
        cinNum: 12345678,
        memberships_id: membership.id
      }
    });

    if (clientCreated) {
      console.log('✓ Test Client created');
    } else {
      console.log('✓ Test Client already exists');
    }

    // Create test seller
    const [seller, sellerCreated] = await Seller.findOrCreate({
      where: { email: 'testseller@test.com' },
      defaults: {
        name: 'Test',
        lastName: 'Seller',
        email: 'testseller@test.com',
        password: hashedPassword,
        telNumb: 87654321,
        cinNum: '87654321',
        address: 'Test Address'
      }
    });

    if (sellerCreated) {
      console.log('✓ Test Seller created');
    } else {
      console.log('✓ Test Seller already exists');
    }

    // Create test admin
    const [admin, adminCreated] = await Admin.findOrCreate({
      where: { email: 'testadmin@test.com' },
      defaults: {
        name: 'Test',
        lastName: 'Admin',
        email: 'testadmin@test.com',
        password: hashedPassword,
        telNumb: 11111111,
        cinNum: 11111111
      }
    });

    if (adminCreated) {
      console.log('✓ Test Admin created');
    } else {
      console.log('✓ Test Admin already exists');
    }

    console.log('\n========================================');
    console.log('=== Test Users Created Successfully ===');
    console.log('========================================\n');
    console.log('Password for all users: Test123@\n');
    console.log('CLIENT:');
    console.log('  Email: testclient@test.com');
    console.log('  Password: Test123@\n');
    console.log('SELLER:');
    console.log('  Email: testseller@test.com');
    console.log('  Password: Test123@\n');
    console.log('ADMIN:');
    console.log('  Email: testadmin@test.com');
    console.log('  Password: Test123@\n');
    console.log('========================================\n');

  } catch (error) {
    console.error('✗ Error setting up database:', error.message);
    if (error.original) {
      console.error('  Original error:', error.original.message);
    }
    throw error;
  } finally {
    await sequelize.close();
    console.log('Database connection closed');
  }
}

setupDatabase()
  .then(() => {
    console.log('✓ Database setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n✗ Database setup failed!');
    console.error('Make sure MySQL is running and the database credentials are correct.');
    console.error('You can start MySQL with: brew services start mysql');
    console.error('Or: mysql.server start');
    process.exit(1);
  });

