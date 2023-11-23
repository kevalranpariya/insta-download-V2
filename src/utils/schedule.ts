import { scheduleJob } from 'node-schedule';
import { insta, teleSendPostURL } from './global';
import { instaAPI } from '../common/instaURL';
import bot from '../config/telegram';
// const rule = new schedule.RecurrenceRule();
// rule.hour = 0;
// rule.minute = 54;
// rule.second = 0;
const schedulee = scheduleJob('30 18 * * *',async()=>{
  insta.map(async(e:any)=>{
    const maxTimestamp = await instaAPI(e.username, e.time, e.channelId, e.caption);
    e.time = maxTimestamp;
    // console.log(await Promise.all(instaUrl),'....................................................');
  });
  const timeIntnal = setInterval(async()=>{
    if(!teleSendPostURL?.length){
      console.log('stop the interval timer');
      clearInterval(timeIntnal);
    }else{
      console.log('Inside the else condition(teleSchedule)');
      const postURL = teleSendPostURL[teleSendPostURL.length-1];
      await bot.sendMediaGroup('@nodeinpro', postURL);
      teleSendPostURL.pop();
    }
  },1000*60*15);
});

// const teleSchedule = scheduleJob('*/1 * * * * *',async()=>{
//   console.log('Inside the tele Schedule JOB,.....................................');
//   if(teleSendPostURL?.length){
//     console.log('Inside the if condition(teleSchedule)');
//     const postURL = teleSendPostURL[teleSendPostURL.length-1];
//     await bot.sendMediaGroup('@nodeinpro', postURL);
//     teleSendPostURL.pop();
//   }else console.log('Inside the else condition');
// });

export default {
  schedulee,
  // teleSchedule
};