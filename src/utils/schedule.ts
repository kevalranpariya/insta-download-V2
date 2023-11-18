import { scheduleJob } from 'node-schedule';
import { insta } from './global';
import { instaAPI } from '../common/instaURL';

const schedule = scheduleJob('0 0 * * *',async()=>{
  console.log(insta);
  insta.forEach(async(e:any)=>{
    console.log(e,'.......................................');
    await instaAPI(e.username, e.time, e.channelId);
    // console.log(await Promise.all(instaUrl),'....................................................');
  });
});

export default schedule;