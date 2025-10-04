import axios from 'axios';

// const BASE_URL = 'https://backend.triliv.in/api/user';
const BASE_URL = 'http://localhost:5000/api/user';


// login
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(`${BASE_URL}/login`, { email, password });
  return res.data; // { msg, token, user }
};

// signup
export const signupUser = async (name: string, email: string, password: string) => {
  const res = await axios.post(`${BASE_URL}/signup`, { name, email, password });
  return res.data; // { msg, user, token }
};

// get profile data
export const getProfile = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.user; // returns user object
};

// upload profile image
export const uploadProfileImage = async (imageData: FormData, token: string) => {
  const res = await axios.post(`${BASE_URL}/upload`, imageData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data; // { user: updatedUser }
};

// update profile details
export const updateProfileDetails = async (profileData: any, token: string) => {
  const res = await axios.put(`${BASE_URL}/profile`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return res.data; // { user: updatedUser, message: 'Profile updated successfully' }
};

// update password
export const updatePassword = async (
  passwordData: { currentPassword: string; newPassword: string; confirmPassword: string },
  token: string
) => {
  const res = await axios.put(`${BASE_URL}/password`, passwordData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return res.data; // { msg: 'Password updated successfully' }
};
