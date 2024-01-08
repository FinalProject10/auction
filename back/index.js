const express = require('express');
const db=require('./database/index')
const re =require('./models/relations')

const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/../react-client/dist"));
app.use(express.urlencoded({ extended: true }));
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });