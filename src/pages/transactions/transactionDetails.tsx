import { useParams, useNavigate } from 'react-router-dom';
import { useGetTransactionByIdQuery } from '../../../features/transactions/transactionsApi';
import { Loader2, AlertTriangle, XCircle, ArrowLeft } from 'lucide-react';
import dayjs from 'dayjs';

const TransactionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: transaction, isLoading, isError, error } = useGetTransactionByIdQuery(id!);

  const handleBack = () => navigate('/transactions/transactions');

  const formatAmount = (amount: number) =>
    `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

  const getStatusBadge = (status: string) => {
    let color = 'gray';
    switch (status.toLowerCase()) {
      case 'success':
        color = 'green';
        break;
      case 'failed':
        color = 'red';
        break;
      case 'pending':
        color = 'yellow';
        break;
    }

    return (
      <span
        className={`px-3 py-1 text-sm rounded-full font-semibold bg-${color}-100 text-${color}-700`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
        <span className="ml-2 text-lg text-gray-600">Loading transaction...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center text-red-600">
        <XCircle className="w-10 h-10 mb-2" />
        <p className="text-lg font-semibold">Something went wrong while fetching the transaction.</p>
        {error && 'status' in error && (
          <p className="text-sm text-red-400 mt-1">
            Error {error.status}: {(error as any)?.data?.message || 'Unknown error'}
          </p>
        )}
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center text-yellow-600">
        <AlertTriangle className="w-10 h-10 mb-2" />
        <p className="text-lg font-semibold">Transaction not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Transactions
      </button>

      <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-4">Transaction Details</h2>
      <div className="space-y-4 text-gray-700">
        <DetailRow label="Transaction ID" value={`#${transaction.transactionId}`} />
        <DetailRow label="Order ID" value={`#${transaction.orderId}`} />
        <DetailRow label="Customer Name" value={transaction.customerName} />
        <DetailRow label="Amount" value={formatAmount(transaction.amount)} />
        <DetailRow label="Payment Method" value={transaction.paymentMethod} />
        <DetailRow label="Status" value={getStatusBadge(transaction.status)} isHtml />
        <DetailRow
          label="Date"
          value={dayjs(transaction.date).format('DD MMM YYYY, hh:mm A')}
        />
      </div>
    </div>
  );
};

const DetailRow = ({
  label,
  value,
  isHtml = false,
}: {
  label: string;
  value: string | JSX.Element;
  isHtml?: boolean;
}) => (
  <div className="flex justify-between items-center border-b pb-2">
    <span className="font-medium">{label}:</span>
    {isHtml ? value : <span>{value}</span>}
  </div>
);

export default TransactionDetail;
