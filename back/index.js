const express = require('express');
const db=require('./database/index')
const sellerRoutes=require('./routes/seller')
const clientRoutes=require('./routes/client')
const adminRoutes=require('./routes/admin')
const dashboard=require('./routes/AdminDashboardRouter')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/../react-client/dist"));
app.use(express.urlencoded({ extended: true }));
const PORT = 5000;
app.use('/seller',sellerRoutes)
app.use('/client',clientRoutes)
app.use('/admin',adminRoutes)
app.use('/dash',dashboard)
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });