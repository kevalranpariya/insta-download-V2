// import { TelegramTypes } from 'messaging-api-telegram';
import bot from '../config/telegram';
import { InputMediaPhoto } from 'messaging-api-telegram/dist/TelegramTypes';

export const checkPassword = (password:string)=>{
  const pass:string = process.env.PASS as string;
  if(pass === password) return;
  else throw new Error('Password incorrect');
};

export const teleVideoSend = async(channelId:string, URL: string)=>{
  await bot.sendVideo(channelId, URL);
  console.log('Video has sent....................................');
};

export const teleMediaSend =async (channelId:string, URL: InputMediaPhoto[]) => {
  // console.log(channelId, URL, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('Inside the tele media send');
  await bot.sendMediaGroup(channelId,URL);

};