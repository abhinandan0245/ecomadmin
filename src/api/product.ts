import axios from 'axios';

// const BASE_URL = 'https://backend.triliv.in/api';
const BASE_URL = 'http://localhost:5000/api';

// product api 

export const addProductAPI = async (formData: FormData, token: string) => {
  const response = await axios.post(`${BASE_URL}/product`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    //   'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateProductAPI = async ( id:string , formData: FormData, token: string) => {
  const response = await axios.put(`${BASE_URL}/product/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    //   'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


export const getAllProductAPI = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/productsAdmin` , {
    headers: {
      Authorization: `Bearer ${token}`,
    //   'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getByIdProductAPI = async (id:string , token: string) => {
  const response = await axios.get(`${BASE_URL}/product/${id}` , {
    headers: {
      Authorization: `Bearer ${token}`,
    //   'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const filterProductAPI = async (params: any, token: string) => {
  const response = await axios.get(`${BASE_URL}/product/filter`, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
  return response.data;
};

export const deleteProductAPI = async (id:string , token: string) => {
  const response = await axios.delete(`${BASE_URL}/product/${id}` , {
    headers: {
      Authorization: `Bearer ${token}`,
    //   'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


// brand api 


export const addBrandAPI = async (data: { name: string; description: string }, token: string) => {
  const response = await axios.post(`${BASE_URL}/brand`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const getAllBrandsAPI = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/brands`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllBrandsByCategoryAPI = async (categoryId: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/brandsby/category`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { categoryId }, // <-- Pass categoryId as query param
  });
  return response.data;
};

export const updateBrandAPI = async (id: string, data: { name: string; description: string }, token: string) => {
  const response = await axios.put(`${BASE_URL}/brand/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteBrandAPI = async (id: string, token: string) => {
  const response = await axios.delete(`${BASE_URL}/brand/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


// inventory api 

export const getAllEnventoryAPI = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/inventory`, { // <-- should be /inventories
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateEnventoryAPI = async (
  id: string,
  data: { productName?: string; stockAvailable?: number; productStatus?: boolean },
  token: string
) => {
  const response = await axios.put(`${BASE_URL}/inventory/${id}`, data, { // <-- should be /inventory/:id
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};