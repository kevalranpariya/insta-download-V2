import { scheduleJob } from 'node-schedule';
import { globalInterval, insta, teleSendPostURL } from './global';
import { instaAPI } from '../common/instaURL';
import bot from '../config/telegram';
// const rule = new schedule.RecurrenceRule();
// rule.hour = 0;
// rule.minute = 54;
// rule.second = 0;

// globalInterval.intervalId = '';

// globalInterval.start(()=>{
//   console.log('Just');
// },1000);

// setTimeout(function () {
//   globalInterval.stop();
// }, 5000);

const schedulee = scheduleJob('30 17 * * *',async()=>{
  try {
    globalInterval.stop();
    insta.map(async(e:any)=>{
      const maxTimestamp = await instaAPI(e.username, e.time, e.channelId, e.caption);
      e.time = maxTimestamp;
    // console.log(await Promise.all(instaUrl),'....................................................');
    });
    // const timeIntnal = setInterval(async()=>{
    //   if(!teleSendPostURL?.length){
    //     console.log('stop the interval timer');
    //     clearInterval(timeIntnal);
    //   }else{
    //     console.log('Inside the else condition(teleSchedule)');
    //     const randomPost = Math.floor(Math.random() * teleSendPostURL.length);
    //     if(randomPost){
    //       const postURL = teleSendPostURL[randomPost];
    //       await bot.sendMediaGroup('@nodeinpro', postURL);
    //       teleSendPostURL.splice(randomPost, 1);
    //     }
    //   }
    // },1000*60*15);

    globalInterval.start(async()=>{
      if(!teleSendPostURL?.length){
        console.log('stop the interval timer');
        globalInterval.stop();
      }else{
        const randomPost = Math.floor(Math.random() * teleSendPostURL.length);
        if(randomPost){
          console.log('Inside the else condition(teleSchedule)');
          const postURL = teleSendPostURL[randomPost];
          await bot.sendMediaGroup('@nodeinpro', postURL);
          teleSendPostURL.splice(randomPost, 1);
        }
      }
    },1000*60*60*3);
  } catch (err:any) {
    console.log(err.message);
  }
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