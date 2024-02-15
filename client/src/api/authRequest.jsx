import axios from "axios";

export const signInRequest = async (formData) => await axios.post('http://192.168.100.10:4000/signIn', formData)
.then(res => {
    return res.data;
  })
  .catch((error) => {
    console.log("error: ", error);
  });


export const loginRequest = async (formData) => axios.post('http://192.168.100.10:4000/login', formData);

export const changeProfileRequest = async (userId, formData) => axios.put(`http://192.168.100.10:4000/change-profile/`);

export const changeNLRequest = async (userId, formData) => axios.put(`http://192.168.100.10:4000/change-nl/${userId}/${formData.name}/${formData.lastname}`);

export const changeUsernameRequest = async (userId, formData) => axios.put(`http://192.168.100.10:4000/change-username/${userId}/${formData.username}`);

export const changePasswordRequest = async (userId, formData) => axios.put(`http://192.168.100.10:4000/change-password/${userId}/${formData.oldPassword}/${formData.newPassword}/${formData.confirmNewPassword}`);
