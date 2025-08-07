import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const createCouponApi = async (couponData: any , token: string) => {
  const response = await axios.post(`${BASE_URL}/coupon`, couponData , {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const getAllCouponsApi = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/coupons`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
export const updateCouponsApi = async (token: string, id: string, couponData: any) => {
  const response = await axios.put(`${BASE_URL}/coupon/${id}`, couponData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
export const getByIdCouponsApi = async (token: string, id: string) => {
  const response = await axios.get(`${BASE_URL}/coupon/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
export const deleteCouponsApi = async (token: string, id: string) => {
  const response = await axios.delete(`${BASE_URL}/coupon/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
export const toggleCouponStatusApi = async (token: string, id: string) => {
  const response = await axios.put(`${BASE_URL}/coupon/${id}/status`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};



  

