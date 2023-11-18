import { config } from 'dotenv';
import { TelegramClient } from 'messaging-api-telegram';
config();
const apiKey = process.env.TELEGRAM_BOTTOKEN as string;
const bot = new TelegramClient({
  accessToken: apiKey
});

export default bot;