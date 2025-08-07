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






export interface Order {
  id: number;
  orderId: number;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  paymentMethod: string;
  amount: number;
  paymentStatus: string;
  orderStatus: string;
  orderDate: string;
  status?: { tooltip: string; color: string };
  status2?: { tooltip: string; color: string };
}
