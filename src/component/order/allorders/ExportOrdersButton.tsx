import React, { FC } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Order } from '../../../types/index'; // ✅ reuse type

interface Props {
  orders: Order[];
}

const ExportOrdersButton: FC<Props> = ({ orders }) => {
  const handleExport = () => {
    if (!orders || orders.length === 0) {
      alert("No orders available to export.");
      return;
    }

    // flatten orders before export
    const formattedOrders = orders.map(order => ({
      OrderID: order.orderId,
      Date: order.createdAt,
      Customer: order.Customer ? order.Customer.name : "N/A",
      Subtotal: order.subtotal,
      Discount: order.discount,
      Shipping: order.shippingRate,
      Tax: order.tax,
      Total: order.grandTotal,
      PaymentMethod: order.paymentMethod,
      PaymentStatus: order.paymentStatus,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "orders-export.xlsx");
  };

  return (
    <button
      onClick={handleExport}
      className="btn btn-success text-white px-4 py-2 rounded"
    >
      Export Orders
    </button>
  );
};

export default ExportOrdersButton;
