import axios from 'axios';
import { config } from './authorize'

export const getMember = async () => {
    try {
      const response = await axios.get('http://localhost:8000/member', config);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

export const addMember = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/member', data, config);
      return response.data.message;
    } catch (error) {
      console.error(error);
    }
  }

export const editMember = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/member/' + data.id , data, config);
      return response.data.success;
    } catch (error) {
      console.error(error);
    }
  }

export const delMember = async (id) => {
    try {
      const response = await axios.post('http://localhost:8000/member/'+ id, config);
      return response.data.message;
    } catch (error) {
      console.error(error);
    }
  };