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

// functions
// createChatEngineUser();
// GetorCreateUser();
// deleteChatEngineUser();

const axios = require("axios");

const createChatEngineUser = () => {
  axios.post(
    "https://api.chatengine.io/users/",
    {
      username: user.email,
      secret: user.uid,
      email: user.email,
      first_name: user.displayName,
    },
    { headers: { "Private-Key": "bc788352-e978-4c86-a04a-744d11c6f143" } }
  );
};

const GetorCreateUser = () => {
  axios.put(
    "https://api.chatengine.io/users/",
    {
      username: user.email,
      secret: user.uid,
    },
    { headers: { "Private-Key": "bc788352-e978-4c86-a04a-744d11c6f143" } }
  );
};

const deleteChatEngineUser = () => {
  axios.delete("https://api.chatengine.io/users/me/", {
    headers: {
      "Project-ID": "226182b3-156b-4e03-b5e9-9d46606d9634",
      "User-Name": user.email,
      "User-Secret": user.uid,
    },
  });
};

// /////
// const express = require("express");
// // const admin = require("../front/firebase-admin");
// const router = express.Router();

// const db = require("./database/index");
// const sellerRoutes = require("./routes/seller");
// const clientRoutes = require("./routes/client");
// const cors = require("cors");
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.static(__dirname + "/../react-client/dist"));
// app.use(express.urlencoded({ extended: true }));
// const PORT = 5000;
// app.use("/seller", sellerRoutes);
// app.use("/client", clientRoutes);
// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });

// // functions
// // createChatEngineUser();
// // GetorCreateUser();
// // deleteChatEngineUser();

// const axios = require("axios");

// // const createChatEngineUser = () => {
// //   axios.post(
// //     "https://api.chatengine.io/users/",
// //     {
// //       username: user.email,
// //       secret: user.uid,
// //       email: user.email,
// //       first_name: user.displayName,
// //     },
// //     { headers: { "Private-Key": "bc788352-e978-4c86-a04a-744d11c6f143" } }
// //   );
// // };

// // const GetorCreateUser = () => {
// //   axios.put(
// //     "https://api.chatengine.io/users/",
// //     {
// //       username: user.email,
// //       secret: user.uid,
// //     },
// //     { headers: { "Private-Key": "bc788352-e978-4c86-a04a-744d11c6f143" } }
// //   );
// // };

// // const deleteChatEngineUser = () => {
// //   axios.delete("https://api.chatengine.io/users/me/", {
// //     headers: {
// //       "Project-ID": "226182b3-156b-4e03-b5e9-9d46606d9634",
// //       "User-Name": user.email,
// //       "User-Secret": user.uid,
// //     },
// //   });
// // };

// // router.get("/users", async (req, res) => {
// //   try {
// //     const users = await admin.auth().listUsers();
// //     res.json(users);
// //   } catch (error) {
// //     console.error("Error listing users:", error);
// //     res.status(500).json({ error: "Failed to retrieve users" });
// //   }
// // });

// module.exports = router;
