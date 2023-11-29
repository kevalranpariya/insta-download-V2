import { Request, Response } from 'express';
import { checkPassword } from '../common/common';
import { insta, teleSendPostURL } from '../utils/global';
import bot from '../config/telegram';

export class MainController{
  public instaPost = async(req:Request,res:Response)=>{
    try {
      const { password, username, channelId, time, caption } = req.body;
      checkPassword(password);
      insta.forEach((e:any)=>{
        if(username == e.username)throw new Error('Username is already exist');
      });
      //   console.log(insta)
      insta.push({
        username,
        channelId,
        time,
        caption
      });
      return res.status(200).json({
        status: 'success',
        data: {
          username,
          channelId,
          time,
          caption
        }
      });
    } catch (err:any) {
      return res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
  };

  public allPost =async (req:Request, res:Response) => {
    try {
      return res.status(200).json({
        status: 'success',
        data: insta
      });
    } catch (err:any) {
      return res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
  };

  public post =async (req:Request, res:Response) => {
    return res.status(200).json({
      message: 'Operation successfully',
      postCount: teleSendPostURL.length,
      data: teleSendPostURL,
    });
  };

  public postSent =async (req:Request, res:Response) => {
    const randomPost = Math.floor(Math.random() * teleSendPostURL.length);
    if(randomPost){
      console.log('Inside the else condition(teleSchedule)');
      const postURL = teleSendPostURL[randomPost];
      await bot.sendMediaGroup('@nodeinpro', postURL);
      teleSendPostURL.splice(randomPost, 1);
      return res.status(200).json({
        message: 'Post sent are successfully',
        success: true,
        data: postURL
      });
    }
    return res.status(200).json({
      message: 'Post not sent successfully',
      success: false,
    });
  };
}