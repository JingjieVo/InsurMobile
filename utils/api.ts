
import axios from 'axios';
import { ENV } from './constant';


const TOKEN_USER = 'eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjA0NDQ0NDQ0NDQiLCJ1c2VySWQiOjcsInN1YiI6IjA0NDQ0NDQ0NDQiLCJleHAiOjE3MzMwNjY0NDd9.46kTDTmHC7MqSHmz9iRvlBzYtpnjNJ9y_mq6mr2dWlk'



export const apiClient = axios.create({
    baseURL: ENV.BASE_URL,
    headers: {
      'Authorization': `Bearer ${TOKEN_USER}`,
      'Content-Type': 'application/json',
    },
  });