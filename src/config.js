const myToken = localStorage.getItem('token')

export const config = {
    headers: { Authorization: `Bearer ${myToken}` }
  };

export const baseURL = "http://localhost:8000"
export const photoURL = baseURL + "/image/photo/"
export const coverURL = baseURL + "/image/cover/"