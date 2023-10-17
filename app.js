const axios = require("axios");
const express = require("express");
const app = express();
const port = 3000; // You can choose any available port

// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
// Define a route to render your EJS file
app.get("/", (req, res) => {
  // You can pass data to the EJS file here if needed
  res.render("index", { prayerTimes: null, pageTitle: "Prayer Times" });
});

// Define a route to handle form submission and send JSON data
app.post("/", async (req, res) => {
  const location = req.body.location;
  const country = req.body.locationC;

  try {
    // Make a request to the Aladhan API to get prayer times
    const response = await axios.get(
      `http://api.aladhan.com/v1/timingsByCity?city=${location}&country=${country}`
    );
    const prayerTimes = response.data.data.timings;

    res.render("index", { prayerTimes, pageTitle: "Prayer Times" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching prayer times. Please try again later." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
