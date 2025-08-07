import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// get all orders api 

export const getAllOrderAPI = async (
  token: string,
  params: { status?: string }
) => {
  const response = await axios.get(`${BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
  return response.data;
};
// get by id orders api

export const getByIdOrderAPI = async (id:string , token: string) => {
  const response = await axios.get(`${BASE_URL}/orders/${id}` , {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
// export const cancelOrderAPI = async (id:string , token: string) => {
//   const response = await axios.patch(`${BASE_URL}/orders/${id}/cancel` , {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };
export const cancelOrderAPI = async (id: string, token: string) => {
  const response = await axios.patch(
    `${BASE_URL}/orders/${id}/cancel`,
    {}, // no body needed
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
