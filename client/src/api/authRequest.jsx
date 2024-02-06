import axios from "axios";

export const signInRequest = async (formData) => await axios.post('http://192.168.100.10:4000/signIn', formData)
.then(res => {
    return res.data;
  })
  .catch((error) => {
    console.log("error: ", error);
  });


export const loginRequest = async (formData) => axios.post('http://192.168.100.10:4000/login', formData);