require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const QRCode = require("qrcode");

const app = express();
const PORT = process.env.PORT || 3000; // Use the PORT from .env file, fallback to 3000

app.get("/generate", async (req, res) => {
  const { text } = req.query;
  if (!text) return res.status(400).send("Text query parameter is required");

  try {
    const qrDataUrl = await QRCode.toDataURL(text);
    res.json({ url: qrDataUrl });
  } catch (error) {
    res.status(500).send("Error generating QR code");
  }
});

app.listen(PORT, () =>
  console.log(`QR Code generator running on http://localhost:${PORT}/generate`)
);
