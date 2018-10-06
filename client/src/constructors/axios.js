import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:8000' : '/',
});

export default client;
