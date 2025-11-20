/**
 * Script to add test bid data to the database
 * This creates sample bids for testing the bid history feature
 */

const sequelize = require('../database/index');
const { Op } = require('sequelize');
const Bid = require('../models/bid');
const Item = require('../models/items');
const Client = require('../models/clients');

async function addTestBidData() {
  try {
    console.log('Starting to add test bid data...');
    
    await sequelize.authenticate();
    console.log('✓ Connected to database');

    // Get all items (we'll filter by start time in code)
    const allItems = await Item.findAll({
      limit: 10 // Get first 10 items
    });

    // Filter items that have started
    const now = new Date();
    const items = allItems.filter(item => {
      const startTime = new Date(item.timeStart);
      return startTime <= now;
    });

    if (items.length === 0) {
      console.log('⚠ No items found that have started. Please create some items first.');
      process.exit(0);
    }

    // Get all clients
    const clients = await Client.findAll({
      limit: 5
    });

    if (clients.length === 0) {
      console.log('⚠ No clients found. Please create some clients first.');
      process.exit(0);
    }

    console.log(`✓ Found ${items.length} items and ${clients.length} clients`);

    let bidsCreated = 0;

    // For each item, create multiple bids from different clients
    for (const item of items) {
      const itemStartTime = new Date(item.timeStart);
      const itemEndTime = new Date(item.timeEnd);

      // Determine the auction duration in minutes
      const auctionDuration = (itemEndTime - itemStartTime) / (1000 * 60);
      
      // Create 3-8 bids per item
      const numBids = Math.floor(Math.random() * 6) + 3;
      let currentBidAmount = item.price || 1000;

      for (let i = 0; i < numBids; i++) {
        // Select a random client
        const randomClient = clients[Math.floor(Math.random() * clients.length)];
        
        // Calculate timestamp: distribute bids over the auction duration
        // Bids should be spread out over time, with more bids near the end (typical auction behavior)
        const progress = (i + 1) / numBids;
        // Use a curve that concentrates bids towards the end (auction sniping effect)
        const timeProgress = Math.pow(progress, 0.7); // 0.7 creates a curve
        const minutesSinceStart = Math.floor(auctionDuration * timeProgress);
        
        // Create timestamp for this bid
        let bidTime = new Date(itemStartTime.getTime() + (minutesSinceStart * 60 * 1000));
        
        // Make sure bid time doesn't exceed auction end or current time
        const maxTime = now > itemEndTime ? itemEndTime : now;
        if (bidTime > maxTime) {
          bidTime = new Date(maxTime.getTime() - (numBids - i) * 60 * 1000);
        }
        if (bidTime < itemStartTime) {
          bidTime = new Date(itemStartTime.getTime() + (i + 1) * 60 * 1000);
        }

        // Calculate bid amount with increment
        const increment = currentBidAmount < 100 ? 5 : 
                         currentBidAmount < 1000 ? 10 : 
                         currentBidAmount < 10000 ? 50 : 100;
        
        const incrementMultiplier = 1 + Math.random() * 2; // Random increment 1x to 3x
        currentBidAmount = Math.floor(currentBidAmount + (increment * incrementMultiplier));

        // Check if bid already exists for this item/client combination
        const existingBid = await Bid.findOne({
          where: {
            itemId: item.id,
            ClientId: randomClient.id,
            bidAmount: currentBidAmount
          }
        });

        if (!existingBid) {
          try {
            await Bid.create({
              bidAmount: currentBidAmount,
              ClientId: randomClient.id,
              itemId: item.id,
              createdAt: bidTime
            });
            bidsCreated++;
            console.log(`  ✓ Created bid: $${currentBidAmount} by ${randomClient.name || 'Client'} for item #${item.id} at ${bidTime.toLocaleString()}`);
          } catch (error) {
            console.log(`  ✗ Failed to create bid for item #${item.id}: ${error.message}`);
          }
        }
      }
    }

    console.log(`\n✓ Test data creation completed!`);
    console.log(`✓ Created ${bidsCreated} test bids`);
    console.log(`\nYou can now view the bid history on item pages!`);
    
    process.exit(0);
  } catch (error) {
    console.error('✗ Failed to add test bid data:', error);
    process.exit(1);
  }
}

// Run the script
addTestBidData();

