const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const jwt = require("jsonwebtoken");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "http://localhost:5005",
});

exports.sendFCM = functions.https.onRequest(async (request, response) => {
  const message = {
    data: {
      title: "FCM Notification",
      body: "This is a test notification.",
    },
    topic: "testTopic",
  };

  try {
    await admin.messaging().send(message);
    response.status(200).send("FCM message sent successfully.");
  } catch (error) {
    console.error("Error sending FCM message:", error);
    response.status(500).send("Error sending FCM message: " + error.message);
  }
});

exports.secureFunction = functions.https.onRequest(async (req, res) => {
  const jwtToken = req.headers.authorization;
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };
  await fetch("http://localhost:5005/auction-adca9/us-central1/sendFCM", {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: {
        title: "FCM Notification",
        body: "This is a test notification.",
      },
      topic: "testTopic",
    }),
  });
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

    res.status(200).send("Token is valid!");
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).send("Unauthorized: " + error.message);
  }
});
