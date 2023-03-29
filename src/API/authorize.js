const myToken = localStorage.getItem('token')

export const config = {
    headers: { Authorization: `Bearer ${myToken}` }
  };