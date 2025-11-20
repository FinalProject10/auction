# Real-Time Bidding Setup Guide

## ✅ What's Been Set Up

### 1. Dummy Products Created
5 auction items have been added to the database:

- **ID 1:** 2020 Mercedes-Benz C-Class - Starting Price: $25,000
- **ID 2:** 2019 BMW 3 Series - Starting Price: $28,000
- **ID 3:** 2021 Audi A4 - Starting Price: $32,000
- **ID 4:** 2020 Tesla Model 3 - Starting Price: $35,000
- **ID 5:** 2018 Porsche 911 - Starting Price: $75,000

### 2. Socket Server Implementation
Real-time bidding is now fully functional:

- **Room-based communication:** Each item has its own socket room (using item ID)
- **Real-time updates:** When a bid is placed, all users viewing that item get instant updates
- **Dual events:** Both `notification` and `placedBid` events are emitted for compatibility

### 3. How It Works

#### Backend Flow:
1. User places a bid via POST `/bid/placeBid`
2. Bid is saved to database
3. `sendMessageToRoom(itemId, bidAmount)` is called
4. Socket server broadcasts to all clients in the item's room
5. Frontend receives real-time update

#### Frontend Flow:
1. User opens item page → Socket connects
2. Socket emits `create` event with item ID → Joins item's room
3. When bid is placed → Socket emits `placeBid` event
4. Backend broadcasts → All clients in room receive `placedBid` event
5. UI updates automatically with new bid amount

## 🧪 Testing the Bidding System

### Step 1: Login as Client
```
Email: testclient@test.com
Password: Test123@
```

### Step 2: View an Item
Navigate to: `http://localhost:3000/item/1` (or any item ID 1-5)

### Step 3: Place a Bid
- Enter a bid amount higher than the starting price
- Click "Place Bid"
- The bid should appear immediately for all users viewing the same item

### Step 4: Test Real-Time Updates
1. Open the same item page in **two different browser windows/tabs**
2. Place a bid from one window
3. The other window should **automatically update** with the new bid amount

## 📡 Socket Events

### Client → Server Events:
- `create` - Join an item's room (room = item ID)
- `placeBid` - Place a bid (sends: `{ userId, itemId, bidAmount }`)

### Server → Client Events:
- `notification` - New bid notification (message = bid amount as string)
- `placedBid` - New bid placed (object: `{ bidAmount, itemId }`)

## 🔧 Socket Configuration

### Backend (`back/index.js`):
- Socket.IO server running on port 5001
- CORS enabled for `http://localhost:3000`
- Room-based broadcasting using item IDs

### Frontend (`front/app/item/(itemComponents)/bid/socket.tsx`):
- Connects to `http://localhost:5001`
- Joins room when component mounts
- Listens for `placedBid` and `notification` events

## 🐛 Troubleshooting

### Bids not updating in real-time?
1. Check browser console for socket connection errors
2. Verify backend logs show "📢 Sending notification to room X"
3. Ensure both clients are in the same room (same item ID)
4. Check that socket is connected: Look for "User Connected" in backend logs

### Socket connection fails?
1. Verify backend is running on port 5001
2. Check CORS configuration allows `http://localhost:3000`
3. Verify socket URL in frontend matches backend port

### Bid not saving?
1. Check MySQL connection (backend logs)
2. Verify user is logged in (userId in localStorage)
3. Check bid amount is greater than current highest bid
4. Verify item exists in database

## 📝 Notes

- Each item has its own socket room identified by the item ID
- Users automatically join the room when viewing an item
- Bids are validated: must be higher than previous bid or starting price
- Users can only bid once per item (prevents spam)
- All bids are saved to database and broadcast in real-time

## 🚀 Next Steps

To add more products, run:
```bash
cd back
node add-dummy-products.js
```

The script will create products if they don't already exist.

