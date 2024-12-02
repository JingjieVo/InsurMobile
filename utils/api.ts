
import axios from 'axios';
import { ENV } from './constant';


const TOKEN_USER = 'eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjA0NDQ0NDQ0NDQiLCJ1c2VySWQiOjcsInN1YiI6IjA0NDQ0NDQ0NDQiLCJleHAiOjE3MzM2Nzg5MDZ9.4zHvBiWR04T38tBSv-Eq1m4zm4nxd0lTvRCbKqrxLqk'



export const apiClient = axios.create({
    baseURL: ENV.BASE_URL,
    headers: {
      'Authorization': `Bearer ${TOKEN_USER}`,
      'Content-Type': 'application/json',
    },
  });

  export const apiClientNoAuth = axios.create({
    baseURL: ENV.BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });