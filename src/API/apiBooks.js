import axios from 'axios';
import { config } from './authorize'

export const getBook = async () => {
    try {
      const response = await axios.get('http://localhost:8000/book', config);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };