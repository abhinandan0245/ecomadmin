export interface Transaction {
  id: number; // Sequelize auto adds `id` unless you've removed it
  transactionId: string;
  orderId: string;
  customerName: string;
  paymentMethod: 'Credit Card' | 'Debit Card' | 'UPI' | 'Net Banking' | 'Cash on Delivery' | 'Razorpay';
  date: string; // or Date if you're parsing it
  amount: number;
  status: 'success' | 'pending' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface TransactionListResponse {
  total: number;
  transactions: Transaction[];
}






// export interface Order {
//   id: number;
//   orderId: number;
//   customerName: string;
//   customerEmail: string;
//   customerMobile: string;
//   paymentMethod: string;
//   amount: number;
//   paymentStatus: string;
//   orderStatus: string;
//   orderDate: string;
//   status?: { tooltip: string; color: string };
//   status2?: { tooltip: string; color: string };
// }


// src/types/index.ts
// src/types/index.ts

export type ImageVariant = {
  id?: number;
  imageUrls: string;
};

export type Product = {
  id: number;
  name?: string; // backend me "name" aata hai
  title?: string; // kabhi title bhi aa sakta hai
  sku?: string;
  hsnCode?: string;
  image?: string; // fallback
  imageVariants?: ImageVariant[];
};

export type OrderItem = {
  id: number;
  title: string;
  quantity: number;
  price: number;
  product?: Product;
};

export interface Customer {
  id: number;
  name: string;
  email: string;
  mobile: string;
  shippingAddress?: string;
  city?: string;
  state?: string;
  pincode?: string;
}



export type Shipment = {
  id: number;
  waybill: string;
  status: string;
};

export interface Order {
  id: number;
  orderId: string;
  createdAt: string;
  subtotal: number;
  discount: number;
  shippingRate: number;
  tax: number;
  grandTotal: number;
  paymentMethod: string;
  paymentStatus: string;
  invoiceNumber?: string;
  invoiceGeneratedAt?: string;
  invoiceTemplate?: string;
  Customer?: Customer; // 👈 yeh important
  orderItems: OrderItem[];
  shipments?: Shipment[];
}
