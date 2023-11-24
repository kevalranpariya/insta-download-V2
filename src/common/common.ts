// import { TelegramTypes } from 'messaging-api-telegram';
import bot from '../config/telegram';
import { InputMediaPhoto } from 'messaging-api-telegram/dist/TelegramTypes';
import { teleSendPostURL } from '../utils/global';

export const checkPassword = (password:string)=>{
  const pass:string = process.env.PASS as string;
  if(pass === password) return;
  else throw new Error('Password incorrect');
};

export const teleVideoSend = async(channelId:string, URL: string, caption:string)=>{
  try {
    await bot.sendVideo(channelId, URL,{ caption: caption });
    console.log('Video has sent....................................');
  } catch (err:any) {
    console.log(err.message);
  }
};

export const teleMediaSend =async (channelId:string, URL: InputMediaPhoto[]) => {
  teleSendPostURL.push(URL);
};