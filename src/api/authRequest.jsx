import axios from "axios";

export const signInRequest = async (formData) => await axios.post('http://10.0.2.2:3000/signIn', formData)
.then(res => {
    return res.data;
  })
  .catch((error) => {
    console.log("error: ", error);
  });


export const loginRequest = async (formData) => axios.post('/login', formData);