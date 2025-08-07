

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/category';

// add category api 

export const addCategoryAPI = async (data: { name: string; slug: string; status:boolean , size?: string[]}, token: string) => {
  const response = await axios.post(
    `${BASE_URL}/category`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// get all category api 

export const getAllCategoryAPI = async ( token: string) => {
  const response = await axios.get(
    `${BASE_URL}/categories`,
    
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// ✅ Get category by ID
export const getByIdCategoryAPI = async (id: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ✅ Search category by name
export const getSearchByNameCategoryAPI = async (name: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/categories/search/name`, {
    params: { name }, // send query param ?name=value
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// delete category api 

export const deleteCategoryApi = async (id:string , token:string) => {
     const response = await axios.delete(`${BASE_URL}/category/${id}` , {
      headers:{
        Authorization:`Bearer ${token}`
      }
     }
    
    );
    return response.data;
};
// update category api 

export const updateCategoryApi = async (id:string ,  updatedData: { name?: string; slug?: string; status?: boolean , size?: string[]}, token:string) => {
     const response = await axios.put(`${BASE_URL}/category/${id}`, updatedData , {
      headers:{
        Authorization:`Bearer ${token}`
      }
     }
    
    );
    return response.data;
};


// Add this new function to your existing categoryApi.ts
export const getCategorySizesAPI = async (categoryId: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/category/${categoryId}/sizes`, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return response.data;
};