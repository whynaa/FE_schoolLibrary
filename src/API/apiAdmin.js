import axios from 'axios';
import { config } from './authorize'

export const getAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin', config);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

export const addAdmin = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/admin', data, config);
      return response.data.success;
    } catch (error) {
      console.error(error);
    }
  };