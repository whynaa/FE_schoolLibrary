import axios from 'axios';
import { config } from './authorize'

export const getBorrow = async () => {
    try {
      const response = await axios.get('http://localhost:8000/borrow', config);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };