const express = require("express");
const Crypto = require("../models/Crypto");

const router = express.Router();

router.get("/deviation", async (req, res) => {
  const { coin } = req.query;

  if (!coin) return res.status(400).json({ error: "Coin is required" });

  try {
    const records = await Crypto.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100);

    if (records.length < 2)
      return res
        .status(400)
        .json({ error: "Not enough data to calculate standard deviation" });

    const prices = records.map((record) => record.price);

    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance =
      prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
      prices.length;
    const standardDeviation = Math.sqrt(variance);

    res.json({ deviation: standardDeviation.toFixed(2) });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
