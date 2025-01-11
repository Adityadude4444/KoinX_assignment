const axios = require("axios");
const Crypto = require("../models/Crypto");

const fetchCryptoData = async () => {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,matic-network,ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_change=true";
  try {
    const response = await axios.get(url);
    const data = response.data;

    const coins = [
      { name: "bitcoin", data: data.bitcoin },
      { name: "matic-network", data: data["matic-network"] },
      { name: "ethereum", data: data.ethereum },
    ];

    for (const coin of coins) {
      await Crypto.create({
        coin: coin.name,
        price: coin.data.usd,
        marketCap: coin.data.usd_market_cap,
        change24h: coin.data.usd_24h_change,
      });
    }

    console.log("Crypto data fetched and stored");
  } catch (err) {
    console.error("Error fetching crypto data:", err);
  }
};

module.exports = fetchCryptoData;
