# Auction Backend API

A robust Express.js backend API for an auction platform with real-time bidding, user management, payment processing, and more.

## 🚀 Features

- ✅ **Real-time Bidding** - Socket.IO powered live auction system
- ✅ **User Management** - Client, Seller, and Admin roles
- ✅ **Authentication** - JWT-based authentication system
- ✅ **Payment Integration** - Stripe payment processing
- ✅ **Image Upload** - Cloudinary integration for image storage
- ✅ **Database** - MySQL with Sequelize ORM
- ✅ **Rate Limiting** - API rate limiting for security
- ✅ **Error Handling** - Centralized error handling middleware
- ✅ **Validation** - Request validation middleware
- ✅ **Firebase** - Firebase Admin SDK integration (optional)

## 📋 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **MySQL** - Relational database
- **Sequelize** - ORM for database management
- **JWT** - Authentication tokens
- **Stripe** - Payment processing
- **Cloudinary** - Image storage and optimization
- **Firebase Admin** - Firebase services (optional)
- **bcrypt** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Compression** - Response compression

## 📦 Installation

### Prerequisites

- Node.js 20+ 
- MySQL 8.0+
- npm or yarn

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/salmenkhelifi1/auction_backend.git
   cd auction_backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=auction_db
   DB_DIALECT=mysql

   # Server Configuration
   PORT=3001
   NODE_ENV=development

   # JWT Secret (generate a strong random string)
   JWT_SECRET=your-very-secret-jwt-key-here

   # CORS Configuration (comma-separated frontend URLs)
   CORS_ORIGINS=http://localhost:3000,http://localhost:3001
   FRONTEND_URL=http://localhost:3000

   # Stripe Configuration
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

   # Cloudinary Configuration (for image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Firebase Configuration (optional)
   FIREBASE_SERVICE_ACCOUNT_PATH=./auction-adca9-77aeb27bd088.json
   SOCKET_CORS_ORIGINS=http://localhost:3000
   ```

4. **Setup Database:**
   ```bash
   # Create database and tables
   node setup-db-sequelize.js
   ```

   Or manually create database:
   ```bash
   mysql -u root -p < shema.sql
   ```

5. **Start the server:**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:3001`

## 🗄️ Database Schema

The application uses MySQL with the following main tables:

- **clients** - User/client information
- **sellers** - Seller information
- **admins** - Admin users
- **items** - Auction items/products
- **bids** - Bidding records
- **memberships** - Membership plans
- **deposits** - User deposits
- **payments** - Payment transactions
- **pickups** - Item pickup scheduling
- **reclamations** - User complaints/reclamations
- **titleTransfers** - Title transfer records
- **proxyBids** - Proxy bidding configurations
- **sellerApprovals** - Seller approval requests

See `shema.sql` for complete database schema.

## 📡 API Endpoints

### Authentication
- `POST /api/client/register` - Register new client
- `POST /api/client/login` - Client login
- `POST /api/seller/register` - Register new seller
- `POST /api/seller/login` - Seller login
- `POST /api/admin/login` - Admin login

### Items/Auctions
- `GET /api/items/fetch-items` - Get all auction items
- `GET /api/items/fetch-items/:itemId` - Get specific item
- `GET /api/items/fetch-items/:userId/bids` - Get user's bids
- `POST /api/items/add` - Add new auction item
- `GET /api/items/itemsBided/:id` - Get items user has bid on

### Bidding
- `POST /api/bid` - Place a bid
- `GET /api/bidNotification/:id` - Get bid notifications
- `GET /api/bid/history/:itemId` - Get bidding history
- `POST /api/proxy-bid` - Set proxy bid

### Products
- `GET /api/products` - Get all products
- `POST /api/products/post` - Create product

### Payments
- `POST /api/payment` - Process payment
- `POST /api/deposit` - Make deposit

### Dashboard (Admin)
- `GET /api/dash/*` - Admin dashboard endpoints

### Cloudinary (Image Upload)
- `POST /api/cloudinary/upload` - Upload image

### Socket.IO Events

**Client Events:**
- `join_room` - Join auction room
- `leave_room` - Leave auction room
- `place_bid` - Place a bid in real-time
- `disconnect` - User disconnects

**Server Events:**
- `bid_update` - New bid placed
- `auction_update` - Auction status update
- `error` - Error notifications

## 🔧 Configuration

### Environment Variables

Required environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | MySQL user | `root` |
| `DB_PASSWORD` | MySQL password | - |
| `DB_NAME` | Database name | `final` |
| `PORT` | Server port | `3001` |
| `JWT_SECRET` | JWT signing secret | - |
| `CORS_ORIGINS` | Allowed CORS origins | - |
| `STRIPE_SECRET_KEY` | Stripe API key | - |

Optional variables:
- `CLOUDINARY_*` - Cloudinary configuration
- `FIREBASE_SERVICE_ACCOUNT_PATH` - Firebase config path
- `SOCKET_CORS_ORIGINS` - Socket.IO CORS origins

### CORS Configuration

Update `CORS_ORIGINS` to include your frontend URLs:
```env
CORS_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app
```

## 🚀 Deployment

### Railway (Recommended - Easiest)

1. **Sign up at [railway.app](https://railway.app)**
2. **Create new project** → Deploy from GitHub
3. **Add MySQL database** → Railway creates it automatically
4. **Deploy backend** → Set root directory to `/`
5. **Configure environment variables** → Add all required variables
6. **Deploy!**

See `README_DEPLOYMENT.md` for detailed deployment guide.

### Other Platforms

- **Render** - See `render.yaml` configuration
- **Fly.io** - See `fly.toml` configuration
- **Docker** - See `Dockerfile` for containerized deployment

## 📝 Database Migrations

### Initial Setup
```bash
node setup-db-sequelize.js
```

### Manual SQL Import
```bash
mysql -u root -p auction_db < shema.sql
```

### Sequelize Sync (Development)
```javascript
// This will sync models with database
await sequelize.sync({ alter: true });
```

## 🧪 Testing

### Test User Creation

After database setup, test users are created:
- **Client:** `testclient@test.com` / `Test123@`
- **Seller:** `testseller@test.com` / `Test123@`
- **Admin:** Check database for admin credentials

## 📁 Project Structure

```
back/
├── config/              # Configuration files
├── controllers/         # Route controllers
├── database/            # Database configuration
├── middleware/          # Express middleware
├── migrations/          # Database migrations
├── models/              # Sequelize models
├── routes/              # API routes
├── scripts/             # Utility scripts
├── utils/               # Helper utilities
├── index.js             # Main server file
├── package.json         # Dependencies
└── shema.sql            # Database schema
```

## 🔒 Security Features

- **Helmet** - Security headers
- **Rate Limiting** - API rate limiting
- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt password encryption
- **CORS** - Controlled cross-origin access
- **Input Validation** - Request validation middleware
- **Error Handling** - Centralized error handling

## 📊 API Rate Limiting

Rate limits are configured per endpoint:
- General API: Configurable via middleware
- Bidding endpoints: Stricter limits to prevent spam

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists
- Check network connectivity

### Port Already in Use
```bash
# Find process using port 3001
lsof -i :3001

# Kill the process
kill -9 <PID>
```

### Socket.IO Connection Issues
- Verify CORS settings include frontend URL
- Check `SOCKET_CORS_ORIGINS` environment variable
- Ensure WebSocket is enabled on deployment platform

### Environment Variables Not Loading
- Ensure `.env` file exists in root directory
- Verify variable names match exactly
- Restart server after changing `.env`

## 📚 API Documentation

For detailed API documentation, see:
- `swagger.yaml` - OpenAPI/Swagger specification
- Route files in `routes/` directory
- Controller files in `controllers/` directory

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

Salmen Khelifi

## 🔗 Links

- **Repository:** https://github.com/salmenkhelifi1/auction_backend
- **Frontend:** https://github.com/salmenkhelifi1/auction-test-front

## 📞 Support

For support, please open an issue in the repository.

---

**Made with ❤️ for the Auction Platform**

