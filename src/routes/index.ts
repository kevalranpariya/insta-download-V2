import { Express } from 'express';
import { MainController } from '../controller';

export default (server:Express):Express=>{
  const mainController = new MainController();
  server.post('/insta', mainController.instaPost);
  server.get('/insta', mainController.allPost);
  server.get('/post', mainController.post);
  return server;
};