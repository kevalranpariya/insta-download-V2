import { scheduleJob } from 'node-schedule';
import { insta, teleSendPostURL } from './global';
import { instaAPI } from '../common/instaURL';
import bot from '../config/telegram';
// const rule = new schedule.RecurrenceRule();
// rule.hour = 0;
// rule.minute = 54;
// rule.second = 0;
const schedulee = scheduleJob('30 18 * * *',async()=>{
  console.log(insta);
  insta.map(async(e:any)=>{
    console.log(e,'.......................................');
    const maxTimestamp = await instaAPI(e.username, e.time, e.channelId);
    e.time = maxTimestamp;
    console.log(maxTimestamp);
    // console.log(await Promise.all(instaUrl),'....................................................');
  });
});

const teleSchedule = scheduleJob('*/5 * * * *',async()=>{
  console.log('Inside the tele Schedule JOB,.....................................');
  if(teleSendPostURL?.length){
    console.log('Inside the if condition(teleSchedule)');
    const postURL = teleSendPostURL[teleSendPostURL.length-1];
    await bot.sendMediaGroup('@nodeinpro', postURL);
    teleSendPostURL.pop();
  }else console.log('Inside the else condition');
});

export default {
  schedulee,
  teleSchedule
};