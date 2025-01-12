# KoinX Assignment

This project implements a cryptocurrency data service that includes:
- A background job to fetch cryptocurrency data periodically.
- APIs to retrieve and analyze the stored data.

---

## Tasks

### Task 1: Background Job
**Description:**  
Fetch the following details for Bitcoin, Matic, and Ethereum every 2 hours:
- Current price in USD
- Market cap in USD
- 24-hour price change (%)

**Implementation:**
- A cron job is set up using the `node-cron` package to execute every 2 hours.
- Data is fetched using the [CoinGecko API](https://api.coingecko.com/api/v3/simple/price).
- The fetched data is stored in a MongoDB collection with timestamps for future reference.

---

### Task 2: API - `/stats`
**Description:**  
Provides the latest data (price, market cap, and 24-hour change) for a requested cryptocurrency.

**Query Parameters:**
```json
{
  "coin": "bitcoin" // or matic-network, ethereum
}
 ```
# Task 3: Standard Deviation API - `/deviation`

## Description
This API calculates the **Standard Deviation (SD)** of the price for a specified cryptocurrency based on the last 100 records stored in the database.

Standard Deviation helps measure the variation or dispersion of the prices around the mean. A lower SD indicates the prices are closer to the average, while a higher SD shows more variation.

---

## Query Parameters
The API expects the following query parameter:
```json
{
  "coin": "bitcoin" // or matic-network, ethereum
}

