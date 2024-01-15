import admin from"firebase-admin"


const serviceAccountKey = require('./utils/firebase-config.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: 'https://auction-adca9-default-rtdb.europe-west1.firebasedatabase.app'
});

module.exports = admin;
