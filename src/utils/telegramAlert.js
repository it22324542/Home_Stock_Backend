import axios from "axios";

export const sendTelegramAlert = async (message) => {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    console.warn("Telegram credentials not configured - alerts disabled");
    return;
  }

  try {
    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      }
    );
    console.log("Telegram alert sent:", message);
  } catch (error) {
    console.error("Failed to send Telegram alert:", error);
  }
};
