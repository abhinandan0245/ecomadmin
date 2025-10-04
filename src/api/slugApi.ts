import axios from "axios";

// const BASE_URL = 'https://backend.triliv.in/api';
const BASE_URL = 'http://localhost:5000/api';

export const addSlugApi = async (slug: string, token: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/slug`,
      { slug },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      }
    );
    return response.data;
    
  } catch (error: any) {
    console.error("Failed to add slug!", error);
    throw error;
  }
};

export const suggestionSlugApi = async (query: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/slug/slug-suggestions`, {
      params: { q: query },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // withCredentials: true,  
    });
    console.log("data from response:",response.data);
    return response.data;
   
  } catch (err: any) {
    console.error("Error fetching slug suggestions:", err);
    throw err;
  }
};
