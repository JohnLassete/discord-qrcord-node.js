require("dotenv").config(); // Load environment variables from .env file
const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("!qr ")) {
    const text = message.content.slice(4);
    try {
      const response = await axios.get(
        `http://localhost:${
          process.env.PORT
        }/generate?text=${encodeURIComponent(text)}`
      );
      const base64Image = response.data.url.split(",")[1]; // Extract the base64 data part
      const imageBuffer = Buffer.from(base64Image, "base64"); // Convert to buffer

      // Send the buffer as an attachment
      message.channel.send({
        files: [{ attachment: imageBuffer, name: "qrcode.png" }],
      });
    } catch (error) {
      console.error(error);
      message.reply("Failed to generate QR code.");
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
