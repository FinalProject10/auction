# AutoBid Car Auction Platform - Complete Documentation

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Database Schema](#database-schema)
3. [API Endpoints](#api-endpoints)
4. [Feature Descriptions](#feature-descriptions)
5. [Setup Instructions](#setup-instructions)
6. [Deployment Guide](#deployment-guide)
7. [Testing Guide](#testing-guide)
8. [Troubleshooting Guide](#troubleshooting-guide)

---

## System Architecture

### Overview
AutoBid is a full-stack car auction platform built with:
- **Backend**: Node.js + Express + Sequelize (MySQL)
- **Frontend**: Next.js + React + TypeScript
- **Real-time**: Socket.io
- **Payment**: Stripe + Flouci
- **Chat**: Firebase

### Architecture Diagram
```
┌─────────────┐
│   Frontend  │ (Next.js/React)
│  (Port 3000) │
└──────┬──────┘
       │ HTTP/WebSocket
       │
┌──────▼──────┐
│   Backend   │ (Express/Node.js)
│  (Port 3001) │
└──────┬──────┘
       │
       ├─── MySQL Database
       ├─── Socket.io (Real-time)
       ├─── Stripe/Flouci (Payments)
       └─── Firebase (Chat)
```

### Key Components
1. **Bidding Engine**: Handles live auctions with proxy bids and countdown timers
2. **Deposit System**: Manages client deposits and bidding power
3. **Payment Processor**: Calculates fees and processes payments
4. **Approval Workflow**: Seller approval system for conditional sales
5. **Pickup Manager**: Tracks pickup scheduling and late fees
6. **Title Transfer**: Manages title transfer documentation

---

## Database Schema

### Core Tables

#### items
Stores vehicle/auction item information.
- **New Fields Added**:
  - `vin` (VARCHAR 17): Vehicle Identification Number
  - `titleType` (ENUM): Clean, Salvage, Non-repairable, Rebuilt, Export-only
  - `damageType` (VARCHAR 255): Type of damage
  - `lotNumber` (VARCHAR 50): Auction lot number
  - `inspectionReport` (TEXT): Inspection details
  - `openingBid` (INT): Opening bid amount
  - `auctionStatus` (ENUM): scheduled, active, ended, pending_approval, sold, rejected

#### bid
Stores bid records.
- **Updated**: Added `createdAt` and `updatedAt` timestamps
- **Fields**: `id`, `bidAmount`, `clients_id`, `items_id`, `createdAt`, `updatedAt`

#### deposits
New table for client deposits.
- **Fields**: `id`, `clients_id`, `amount`, `status`, `maxBiddingPower`, `paymentMethod`, `transactionId`, `createdAt`, `updatedAt`
- **Relationships**: Belongs to Client

#### proxy_bids
New table for proxy/auto-bids.
- **Fields**: `id`, `clients_id`, `items_id`, `maxAmount`, `currentBid`, `isActive`, `incrementAmount`, `createdAt`, `updatedAt`
- **Relationships**: Belongs to Client and Item

#### auction_payments
New table for auction payments.
- **Fields**: `id`, `bid_id`, `items_id`, `clients_id`, `vehiclePrice`, `auctionFee`, `storageFee`, `totalAmount`, `status`, `paidAt`, `paymentMethod`, `transactionId`, `invoiceNumber`, `createdAt`, `updatedAt`
- **Relationships**: Belongs to Bid, Item, and Client

#### seller_approvals
New table for seller approval workflow.
- **Fields**: `id`, `items_id`, `bid_id`, `sellers_id`, `status`, `sellerResponse`, `counterofferAmount`, `deadline`, `respondedAt`, `createdAt`, `updatedAt`
- **Relationships**: Belongs to Item, Bid, and Seller

#### pickups
New table for pickup management.
- **Fields**: `id`, `items_id`, `clients_id`, `scheduledDate`, `pickupDeadline`, `status`, `releaseDocument`, `confirmedAt`, `lateFeeAmount`, `transportationCompany`, `createdAt`, `updatedAt`
- **Relationships**: Belongs to Item and Client

#### title_transfers
New table for title transfer tracking.
- **Fields**: `id`, `items_id`, `clients_id`, `titleType`, `status`, `documentUrl`, `transferDate`, `exportDocument`, `notes`, `createdAt`, `updatedAt`
- **Relationships**: Belongs to Item and Client

### Database Migration
Run the migration script to add all new tables:
```bash
mysql -u your_user -p your_database < back/migrations/add_auction_tables.sql
```

---

## API Endpoints

### Deposit Endpoints
- `POST /deposit/add` - Add a new deposit
- `GET /deposit/balance/:clientId` - Get deposit balance and max bidding power
- `GET /deposit/history/:clientId` - Get deposit history
- `PUT /deposit/refund/:depositId` - Refund a deposit

### Proxy Bid Endpoints
- `POST /proxy/create` - Create a proxy bid
- `GET /proxy/active/:clientId` - Get active proxy bids
- `DELETE /proxy/:id` - Cancel a proxy bid

### Bidding Endpoints (Enhanced)
- `POST /bid/placeBid` - Place a bid (now includes deposit validation)
- `GET /bid/current/:itemId` - Get current highest bid
- `GET /bid/history/:itemId` - Get bid history
- `GET /bid/winner/:itemId` - Get auction winner

### Seller Approval Endpoints
- `GET /approval/pending/:sellerId` - Get pending approvals
- `POST /approval/respond/:approvalId` - Seller responds (approve/reject/counteroffer)
- `GET /approval/status/:itemId` - Get approval status for an item

### Payment Endpoints
- `GET /payment/calculate/:itemId` - Calculate payment breakdown
- `POST /payment/process` - Process payment
- `GET /payment/history/:clientId` - Get payment history

### Pickup Endpoints
- `POST /pickup/schedule` - Schedule pickup
- `GET /pickup/pending/:clientId` - Get pending pickups
- `POST /pickup/confirm/:pickupId` - Confirm pickup completion

### Title Transfer Endpoints
- `POST /title/initiate` - Initiate title transfer
- `GET /title/status/:itemId` - Get title transfer status
- `PUT /title/upload/:titleTransferId` - Upload title document
- `PUT /title/complete/:titleTransferId` - Complete title transfer
- `GET /title/client/:clientId` - Get title transfers for a client

For complete API documentation, see `back/swagger.yaml` or visit `/api-docs` when Swagger UI is configured.

---

## Feature Descriptions

### 1. Deposit System
- Clients must add a refundable deposit to bid
- Deposit × 10 = maximum bidding power
- Example: $400 deposit = $4,000 max bidding power
- Deposits can be refunded if not used

### 2. Proxy Bid System
- Set maximum bid amount
- System automatically bids when you're outbid
- Stops at maximum amount
- Multiple proxy bids execute in order (lowest max first)

### 3. Live Auction Countdown
- 30-second countdown after last bid
- "Going Once" at 20 seconds
- "Going Twice" at 10 seconds
- "Sold" at 0 seconds
- Timer resets when new bid arrives

### 4. Seller Approval Workflow
- After auction ends, seller must approve
- Seller can: approve, reject, or counteroffer
- 3-day deadline for response
- Buyer notified of decision

### 5. Payment & Fees
- Auction fee: 10% of winning bid
- Storage fee: $50/day after pickup deadline
- Payment via Stripe/Flouci
- Invoice/receipt generation

### 6. Pickup Management
- 5-day pickup deadline after payment
- Release document generation
- Late storage fees calculated automatically
- Pickup confirmation tracking

### 7. Title Transfer
- Tracks title type and transfer status
- Document upload/download
- Export documentation support
- Transfer completion tracking

### 8. Car Intake & Verification
- VIN number tracking
- Title type classification
- Damage type documentation
- Lot number assignment
- Inspection report storage

---

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- MySQL 8.0+
- Git

### Backend Setup

1. **Navigate to backend directory**:
```bash
cd back
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment variables**:
Create `.env` file with:
```env
PORT=3001
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=final
JWT_SECRET=your_jwt_secret
CORS_ORIGINS=http://localhost:3000
FRONTEND_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
FIREBASE_SERVICE_ACCOUNT_PATH=./auction-adca9-77aeb27bd088.json
```

4. **Run database migrations**:
```bash
mysql -u your_user -p your_database < migrations/add_auction_tables.sql
```

5. **Start backend server**:
```bash
npm start
```

### Frontend Setup

1. **Navigate to frontend directory**:
```bash
cd front
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure API URL**:
Update `utils/api.ts` with your backend URL:
```typescript
export const API_URL = "http://localhost:3001";
```

4. **Start development server**:
```bash
npm run dev
```

### Database Setup

1. **Create database**:
```sql
CREATE DATABASE final;
```

2. **Run schema**:
```bash
mysql -u your_user -p final < back/shema.sql
```

3. **Run migrations**:
```bash
mysql -u your_user -p final < back/migrations/add_auction_tables.sql
```

---

## Deployment Guide

### Backend Deployment

1. **Build for production**:
```bash
cd back
npm install --production
```

2. **Set environment variables** on your hosting platform

3. **Start with PM2**:
```bash
pm2 start index.js --name autobid-backend
```

### Frontend Deployment

1. **Build Next.js app**:
```bash
cd front
npm run build
```

2. **Start production server**:
```bash
npm start
```

Or deploy to Vercel/Netlify for automatic deployments.

### Database Migration in Production

1. **Backup database first**:
```bash
mysqldump -u user -p database_name > backup.sql
```

2. **Run migrations**:
```bash
mysql -u user -p database_name < back/migrations/add_auction_tables.sql
```

---

## Testing Guide

### Manual Testing Checklist

#### Deposit System
- [ ] Add deposit via API
- [ ] Verify max bidding power calculation (deposit × 10)
- [ ] View deposit balance
- [ ] View deposit history
- [ ] Test refund functionality

#### Proxy Bids
- [ ] Create proxy bid
- [ ] Verify auto-bid execution when outbid
- [ ] Test multiple proxy bids (lowest max executes first)
- [ ] Cancel proxy bid
- [ ] Verify proxy bid stops at max amount

#### Live Auction
- [ ] Place first bid (opening bid)
- [ ] Place subsequent bids
- [ ] Verify bid increment rules ($5/$10/$50/$100)
- [ ] Test deposit validation (insufficient bidding power)
- [ ] Verify auction start time validation
- [ ] Test countdown timer reset on new bids

#### Seller Approval
- [ ] Verify approval created after auction ends
- [ ] Seller approves sale
- [ ] Seller rejects sale
- [ ] Seller makes counteroffer
- [ ] Verify buyer notification

#### Payments
- [ ] Calculate payment breakdown
- [ ] Verify auction fee (10% of winning bid)
- [ ] Process payment
- [ ] View payment history

#### Pickups
- [ ] Schedule pickup after payment
- [ ] Verify 5-day deadline
- [ ] Test late fee calculation
- [ ] Confirm pickup

#### Title Transfer
- [ ] Initiate title transfer after pickup
- [ ] Upload title document
- [ ] Track transfer status
- [ ] Complete transfer

### API Testing with Postman/curl

Example: Add deposit
```bash
curl -X POST http://localhost:3001/deposit/add \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": 1,
    "amount": 400,
    "paymentMethod": "stripe",
    "transactionId": "txn_123"
  }'
```

Example: Create proxy bid
```bash
curl -X POST http://localhost:3001/proxy/create \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": 1,
    "itemId": 1,
    "maxAmount": 5000
  }'
```

---

## Troubleshooting Guide

### Common Issues

#### 1. "Cannot place first bid" error
**Problem**: System blocking first bid even though opening bid exists.
**Solution**: Fixed in Phase 1. Ensure `item.price` is set and bid amount >= opening bid.

#### 2. "Insufficient bidding power" error
**Problem**: Client doesn't have enough deposit to bid.
**Solution**: Client must add deposit. Deposit × 10 = max bidding power.

#### 3. Proxy bid not executing
**Problem**: Proxy bid exists but doesn't auto-bid when outbid.
**Solution**: Check that proxy bid is active and maxAmount > current bid. Verify socket connection.

#### 4. Timestamps missing in bid queries
**Problem**: `createdAt` field not found.
**Solution**: Run migration to add timestamps to bid table.

#### 5. Field name errors (items_id vs itemId)
**Problem**: Sequelize queries failing with field name errors.
**Solution**: Models use field mapping. Ensure database columns match schema.

#### 6. Socket events not working
**Problem**: Real-time updates not appearing.
**Solution**: Verify Socket.io server is running and client connects to correct room.

#### 7. Seller approval not created
**Problem**: Approval not created after auction ends.
**Solution**: Check that `getAuctionWinner` endpoint is called and seller ID exists on item.

#### 8. Payment calculation errors
**Problem**: Fees calculated incorrectly.
**Solution**: Verify auction fee percentage (10%) and storage fee rate ($50/day).

### Debug Mode

Enable debug logging:
```bash
DEBUG=* npm start
```

### Database Connection Issues

Check database connection:
```bash
mysql -u your_user -p -e "SELECT 1"
```

Verify Sequelize connection in `back/database/index.js`.

### Socket.io Connection Issues

Check Socket.io server:
```javascript
// In browser console
const socket = io('http://localhost:3001');
socket.on('connect', () => console.log('Connected'));
```

---

## Additional Resources

- **API Documentation**: See `back/swagger.yaml`
- **User Stories**: See `USER_STORIES.md`
- **Database Schema**: See `back/shema.sql` and `back/migrations/add_auction_tables.sql`
- **Setup Guides**: See `ENV_SETUP.md`, `MYSQL_SETUP.md`, `BIDDING_SETUP.md`

---

## Support

For issues or questions:
1. Check this documentation
2. Review error logs
3. Check GitHub issues (if applicable)
4. Contact development team

---

**Last Updated**: 2024
**Version**: 1.0.0

