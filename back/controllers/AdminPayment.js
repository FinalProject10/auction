const axios = require("axios");

module.exports = {
  add: async (req, res) => {
    const url = "https://developers.flouci.com/api/generate_payment";

    const payload = {
      app_token: "37995aef-a5f7-4257-8a99-203376d2445a",
      app_secret: "ea08f7ca-9a28-4c05-bdd6-679972de9fbc",
      accept_card: "true",
      amount: 7000,
      success_link: "http://localhost:3000/seccess",
      fail_link: "http://localhost:3000/cancel",
      session_timeout_secs: 1200,
      developer_tracking_id: "ce6448fb-bd8b-4bf9-a59d-3f248e445947",
    };

    const headers = {
      "Content-Type": "application/json",
    };

    await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => res.send(data))
      .catch((error) => res.send("Error:", error.message));
  },
  verify: async (req, res) => {
    const id_payement = req.params.id;

    await axios
      .get(`https://developers.flouci.com/api/verify_payment/${id_payement}`, {
        headers: {
          "Content-Type": "application/json",
          apppublic: "37995aef-a5f7-4257-8a99-203376d2445a",
          appsecret: "ea08f7ca-9a28-4c05-bdd6-679972de9fbc",
        },
      })
      .then((result) => {
        res.send(result.data);
      })
      .catch((error) => res.send("Error:", error.message));
  },
};