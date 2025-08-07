import React, { FC } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Order } from '../../../types'; // ✅ adjust path if needed

interface Props {
  orders: Order[];
}

const ExportOrdersButton: FC<Props> = ({ orders }) => {
  const handleExport = () => {
    if (!orders || orders.length === 0) {
      alert("No orders available to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(orders);
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
