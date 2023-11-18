import express, { Express, urlencoded } from 'express';
import { config } from 'dotenv';
import Routes from './routes';
config();
import './utils/schedule';
import './config/telegram';

// console.log(process.env.INSTA_COOKIE);
export default class Server{
  private server:Express;
  private PORT = process.env.PORT as string;
  private IP_ADDRESS = process.env.IP_ADDRESS as string;
  constructor(){
    this.server = express();
    this.server.use(urlencoded({ extended: true }));
    Routes(this.server);
    this.server.listen(Number(this.PORT), this.IP_ADDRESS);
  }
}

new Server();