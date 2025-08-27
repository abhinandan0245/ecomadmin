// src/features/shipment/shipmentApi.ts
import { baseApi } from '../../src/api/baseApi';

type ApiResponse<T = any> = { success: boolean; message?: string; data?: T };

export const shipmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShipmentFromOrder: builder.mutation<
  ApiResponse<{ waybill: string; shipment: any }>, // 👈 include shipment
  { orderId: number; pickupDate?: string }
>({
  query: (body) => ({
    url: '/shipment/create',
    method: 'POST',
    body,
  }),
  invalidatesTags: ['Orders', 'Shipments'],
}),

    cancelShipment: builder.mutation<ApiResponse, { waybill: string }>({
      query: ({ waybill }) => ({
        url: `/shipment/cancel/${waybill}`,
        method: 'POST',
      }),
      invalidatesTags: ['Orders', 'Shipments'],
    }),

    trackShipment: builder.query<ApiResponse, { waybill: string }>({
      query: ({ waybill }) => `/shipment/track/${waybill}`,
      providesTags: ['Shipments'],
    }),
  }),
});

export const {
  useCreateShipmentFromOrderMutation,
  useCancelShipmentMutation,
  useTrackShipmentQuery,
} = shipmentApi;
