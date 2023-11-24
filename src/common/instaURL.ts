import axios, { AxiosResponse } from 'axios';
import { teleMediaSend, teleVideoSend } from './common';
// import { teleSendPostURL } from '../utils/global';

export const instaAPI = async(username:string, time:string, channelId:string, caption:string)=>{
  try {
    const response:AxiosResponse =
  await axios(`https://www.instagram.com/api/v1/feed/user/${username}/username/?count=12`,{
    headers: {
      'Cookie': process.env.INSTA_COOKIE,
      'X-Ig-App-Id': process.env.INSTA_APP_ID
    }
  });
    const instaPostData = response.data.items;
    //   const postArray = [];
    //   let carouselPost;
    for(const post of instaPostData){
    // console.log(post.id,'..........?????????????????????????????');
      if(post.device_timestamp> time){
        if(post?.video_versions?.length){
        // console.log(post.video_versions[0].url,'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        // postArray.push({
        //   type: 'reel',
        //   url: post.video_versions[0].url,
        // });
          const URL = post.video_versions[0].url;
          teleVideoSend(channelId, URL, caption);
        }else if(post?.carousel_media?.length){
          const carouselPost:any = [];
          const carousel_media = post?.carousel_media;
          carousel_media.filter(async(post:any)=>{
            //   console.log(post.image_versions2.candidates[0].url,'Post Images');

            if(post.video_versions?.length){
              await carouselPost.push({
                type: 'video',
                media: post.video_versions[0].url,
                caption: caption
              });
            }else {
              await carouselPost.push({
                type: 'photo',
                media: post.image_versions2.candidates[0].url,
                caption: caption
              });
            }
          });
          // console.log(carouselPost,'>>>>>>>>>>>>>>>>>>>>>>>>');
          // setTimeout(async ()=>{
          console.log('inside the set Time Out function');
          teleMediaSend(channelId, carouselPost);
        // },5*1000);
        // postArray.push({
        //   type: 'carousel',
        //   url: carouselPost
        // });
        }else console.log(post?.image_versions2?.length);
      }
    }

    const maxObject = instaPostData.reduce((max:any, current:any) => (
      current.device_timestamp > max.device_timestamp
        ? current
        : max
    ));

    return maxObject.device_timestamp;

    // console.log(teleSendPostURL);

    //   return await Promise.all(postArray);

  } catch (err) {
    console.log(err);
  }
};