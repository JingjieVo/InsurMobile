import dotenv from "dotenv";
dotenv.config()
import axios from 'axios';


const TOKEN_USER = 'eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjA0NDQ0NDQ0NDQiLCJ1c2VySWQiOjcsInN1YiI6IjA0NDQ0NDQ0NDQiLCJleHAiOjE3MzI3MDAzODN9.10HakOi_saciXPBVHaYekdw8N63fMLhJZ0TPB1WL7Gs'



export const apiClient = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
      'Authorization': `Bearer ${TOKEN_USER}`,
      'Content-Type': 'application/json',
    },
  });