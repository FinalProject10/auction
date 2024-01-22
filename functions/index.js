const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
admin.initializeApp();
exports.sendFCM = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const message = {
      data: {
        title: "FCM Notification",
        body: "This is a test notification.",
      },
      topic: "testTopic",
    };

    try {
      // Send FCM message
      await admin.messaging().send(message);

      // Save message details in Firestore
      const firestore = admin.firestore();
      const messagesCollection = firestore.collection("messages");

      const newMessage = {
        title: message.data.title,
        body: message.data.body,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      };

      await messagesCollection.add(newMessage);

      response.status(200).send("FCM message sent and saved successfully.");
    } catch (error) {
      console.error("Error sending/saving FCM message:", error);
      response
        .status(500)
        .send("Error sending/saving FCM message: " + error.message);
    }
  });
});

exports.secureFunction = functions.https.onRequest(async (req, res) => {
  const jwtToken = req.headers.authorization;

  try {
    if (!jwtToken) {
      throw new Error("Authorization header is missing.");
    }

    // Check for the "Bearer " prefix and extract the actual token
    const tokenParts = jwtToken.split(" ");

    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      throw new Error("Invalid Authorization header format.");
    }

    const actualToken = tokenParts[1];

    // Verify and decode the JWT token
    const decodedToken = jwt.verify(actualToken, "salim123");

    console.log("Decoded Token:", decodedToken);

    // Use 'await' when making an asynchronous request with 'node-fetch'
    await fetch("http://localhost:5001/auction-adca9/us-central1/sendFCM", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwtToken,
      },
      body: JSON.stringify({
        data: {
          title: "FCM Notification",
          body: "This is a test notification.",
        },
        topic: "testTopic",
      }),
    });

    res.status(200).send("Token is valid!");
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).send("Unauthorized: " + error.message);
  }
});
