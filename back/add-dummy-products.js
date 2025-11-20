const sequelize = require('./database/index');
const {
  Items,
  Seller,
  Bid,
  Client
} = require('./models/relations');

async function addDummyProducts() {
  try {
    await sequelize.authenticate();
    console.log('✓ Connected to MySQL');

    // Get the test seller (we created earlier)
    const seller = await Seller.findOne({ where: { email: 'testseller@test.com' } });
    
    if (!seller) {
      console.error('✗ Test seller not found. Please run setup-db-sequelize.js first.');
      process.exit(1);
    }

    console.log(`✓ Found seller: ${seller.name} (ID: ${seller.id})`);

    // Create dummy products
    const now = new Date();
    const futureDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    const timeEnd = futureDate.toISOString().slice(0, 19).replace('T', ' ');

    const dummyProducts = [
      {
        name: "2020 Mercedes-Benz C-Class",
        price: 25000,
        timeStart: now.toISOString().slice(0, 19).replace('T', ' '),
        timeEnd: timeEnd,
        description: "Luxury sedan with premium features. Low mileage, excellent condition. Perfect for daily commute or long drives.",
        images: [
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
          "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800"
        ],
        sellerId: seller.id,
        fuel: "Petrol",
        category: "Sedan",
        short_description: "Premium luxury sedan",
        body: "Sedan",
        climatisation: "Automatic",
        cubicCapacity: "1991cc",
        emissionClass: "Euro 6",
        mileage: "35000 km",
        parkingSensors: "Yes",
        airbags: "8",
        color: "Black",
        doorCount: "4",
        gearBox: "Automatic",
        numberOfSeats: 5,
        power: 184,
        reviews: 4,
        views: 150,
        watching: 12,
        sold: false,
        longitude: "10.1815",
        latitude: "36.8065"
      },
      {
        name: "2019 BMW 3 Series",
        price: 28000,
        timeStart: now.toISOString().slice(0, 19).replace('T', ' '),
        timeEnd: timeEnd,
        description: "Sporty and elegant BMW with advanced technology. Well maintained, single owner. Includes navigation and premium sound system.",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
          "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800"
        ]),
        sellerId: seller.id,
        fuel: "Petrol",
        category: "Sedan",
        short_description: "Sporty luxury sedan",
        body: "Sedan",
        climatisation: "Automatic",
        cubicCapacity: "1998cc",
        emissionClass: "Euro 6",
        mileage: "42000 km",
        parkingSensors: "Yes",
        airbags: "6",
        color: "White",
        doorCount: "4",
        gearBox: "Automatic",
        numberOfSeats: 5,
        power: 184,
        reviews: 5,
        views: 200,
        watching: 18,
        sold: false,
        longitude: "10.1815",
        latitude: "36.8065"
      },
      {
        name: "2021 Audi A4",
        price: 32000,
        timeStart: now.toISOString().slice(0, 19).replace('T', ' '),
        timeEnd: timeEnd,
        description: "Modern Audi with quattro all-wheel drive. Excellent condition, full service history. Perfect for all weather conditions.",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
          "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800"
        ]),
        sellerId: seller.id,
        fuel: "Petrol",
        category: "Sedan",
        short_description: "Modern luxury sedan",
        body: "Sedan",
        climatisation: "Automatic",
        cubicCapacity: "1984cc",
        emissionClass: "Euro 6",
        mileage: "28000 km",
        parkingSensors: "Yes",
        airbags: "8",
        color: "Silver",
        doorCount: "4",
        gearBox: "Automatic",
        numberOfSeats: 5,
        power: 190,
        reviews: 4,
        views: 180,
        watching: 15,
        sold: false,
        longitude: "10.1815",
        latitude: "36.8065"
      },
      {
        name: "2020 Tesla Model 3",
        price: 35000,
        timeStart: now.toISOString().slice(0, 19).replace('T', ' '),
        timeEnd: timeEnd,
        description: "Electric vehicle with autopilot. Low maintenance, eco-friendly. Includes supercharger access and premium interior.",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
          "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800"
        ]),
        sellerId: seller.id,
        fuel: "Electric",
        category: "Sedan",
        short_description: "Electric luxury sedan",
        body: "Sedan",
        climatisation: "Automatic",
        cubicCapacity: "N/A",
        emissionClass: "Zero Emission",
        mileage: "25000 km",
        parkingSensors: "Yes",
        airbags: "8",
        color: "Red",
        doorCount: "4",
        gearBox: "Automatic",
        numberOfSeats: 5,
        power: 283,
        reviews: 5,
        views: 300,
        watching: 25,
        sold: false,
        longitude: "10.1815",
        latitude: "36.8065"
      },
      {
        name: "2018 Porsche 911",
        price: 75000,
        timeStart: now.toISOString().slice(0, 19).replace('T', ' '),
        timeEnd: timeEnd,
        description: "Iconic sports car with exceptional performance. Rare color, excellent condition. Perfect for enthusiasts.",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
          "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800"
        ]),
        sellerId: seller.id,
        fuel: "Petrol",
        category: "Sports Car",
        short_description: "Iconic sports car",
        body: "Coupe",
        climatisation: "Automatic",
        cubicCapacity: "2981cc",
        emissionClass: "Euro 6",
        mileage: "15000 km",
        parkingSensors: "Yes",
        airbags: "6",
        color: "Yellow",
        doorCount: "2",
        gearBox: "Manual",
        numberOfSeats: 2,
        power: 370,
        reviews: 5,
        views: 500,
        watching: 45,
        sold: false,
        longitude: "10.1815",
        latitude: "36.8065"
      }
    ];

    console.log('\n📦 Creating dummy products...\n');

    for (const product of dummyProducts) {
      const [item, created] = await Items.findOrCreate({
        where: { name: product.name, sellerId: seller.id },
        defaults: product
      });

      if (created) {
        console.log(`✓ Created: ${product.name} (ID: ${item.id})`);
      } else {
        console.log(`- Already exists: ${product.name} (ID: ${item.id})`);
      }
    }

    console.log('\n✅ Dummy products added successfully!');
    console.log('\nYou can now view these products at:');
    console.log('  http://localhost:3000/item/[id]');
    console.log('\nProduct IDs:');
    const allItems = await Items.findAll({ 
      where: { sellerId: seller.id },
      attributes: ['id', 'name', 'price']
    });
    allItems.forEach(item => {
      console.log(`  - ${item.name}: ID ${item.id}, Starting Price: $${item.price}`);
    });

  } catch (error) {
    console.error('✗ Error adding dummy products:', error.message);
    if (error.original) {
      console.error('  Original error:', error.original.message);
    }
    throw error;
  } finally {
    await sequelize.close();
    console.log('\nDatabase connection closed');
  }
}

addDummyProducts()
  .then(() => {
    console.log('\n✓ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n✗ Script failed!');
    process.exit(1);
  });

