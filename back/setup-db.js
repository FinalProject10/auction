const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '0000',
};

const DB_NAME = 'final';

async function setupDatabase() {
  let connection;
  
  try {
    // Connect to MySQL server
    connection = await mysql.createConnection(DB_CONFIG);
    console.log('Connected to MySQL server');

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci`);
    console.log(`Database '${DB_NAME}' created or already exists`);

    // Use the database
    await connection.query(`USE \`${DB_NAME}\``);

    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, 'shema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    // Split by semicolons and execute each statement
    const statements = schemaSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('SET'));

    for (const statement of statements) {
      if (statement.length > 0) {
        try {
          await connection.query(statement);
        } catch (err) {
          // Ignore "already exists" errors
          if (!err.message.includes('already exists')) {
            console.log(`Warning: ${err.message}`);
          }
        }
      }
    }
    console.log('Schema executed successfully');

    // Hash passwords for test users
    const testPassword = 'Test123@';
    const hashedPassword = await bcrypt.hash(testPassword, 10);

    // Create test membership (required for clients)
    const [membershipResult] = await connection.query(
      `SELECT id FROM memberships WHERE type = 'basic' LIMIT 1`
    );
    
    let membershipId;
    if (membershipResult.length === 0) {
      const [insertResult] = await connection.query(
        `INSERT INTO memberships (type, price) VALUES ('basic', 0)`
      );
      membershipId = insertResult.insertId;
      console.log('Created basic membership');
    } else {
      membershipId = membershipResult[0].id;
    }

    // Create test client (table name is "client" in model, but "clients" in schema)
    const [clientCheck] = await connection.query(
      `SELECT id FROM clients WHERE email = 'testclient@test.com'`
    );
    
    if (clientCheck.length === 0) {
      await connection.query(
        `INSERT INTO clients (name, lastName, email, password, telNumb, cinNum, memberships_id) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ['Test', 'Client', 'testclient@test.com', hashedPassword, 12345678, 12345678, membershipId]
      );
      console.log('✓ Test Client created');
    } else {
      console.log('Test Client already exists');
    }

    // Create test seller (table name is "seller" in model, but "sellers" in schema)
    const [sellerCheck] = await connection.query(
      `SELECT id FROM sellers WHERE email = 'testseller@test.com'`
    );
    
    if (sellerCheck.length === 0) {
      await connection.query(
        `INSERT INTO sellers (name, lastName, email, password, telNumb, cinNum, address) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ['Test', 'Seller', 'testseller@test.com', hashedPassword, 87654321, 87654321, 'Test Address']
      );
      console.log('✓ Test Seller created');
    } else {
      console.log('Test Seller already exists');
    }

    // Create test admin
    const [adminCheck] = await connection.query(
      `SELECT id FROM admin WHERE email = 'testadmin@test.com'`
    );
    
    if (adminCheck.length === 0) {
      await connection.query(
        `INSERT INTO admin (name, lastName, email, password, telNumb, cinNum) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        ['Test', 'Admin', 'testadmin@test.com', hashedPassword, 11111111, 11111111]
      );
      console.log('✓ Test Admin created');
    } else {
      console.log('Test Admin already exists');
    }

    console.log('\n=== Test Users Created ===');
    console.log('Password for all users: Test123@');
    console.log('\nClient:');
    console.log('  Email: testclient@test.com');
    console.log('  Password: Test123@');
    console.log('\nSeller:');
    console.log('  Email: testseller@test.com');
    console.log('  Password: Test123@');
    console.log('\nAdmin:');
    console.log('  Email: testadmin@test.com');
    console.log('  Password: Test123@');

  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('\nDatabase connection closed');
    }
  }
}

setupDatabase()
  .then(() => {
    console.log('\n✓ Database setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n✗ Database setup failed:', error);
    process.exit(1);
  });

