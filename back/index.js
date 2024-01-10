const express = require("express");
const db = require("./database/index");
const re = require("./models/relations");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/../react-client/dist"));
app.use(express.urlencoded({ extended: true }));
const PORT = 5000;
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
