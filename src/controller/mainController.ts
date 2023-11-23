import { Request, Response } from 'express';
import { checkPassword } from '../common/common';
import { insta } from '../utils/global';

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
}