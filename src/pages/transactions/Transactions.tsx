import { NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect, useMemo } from 'react';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import { useGetAllTransactionsQuery } from '../../../features/transactions/transactionsApi';
import { Transaction } from '../../types';
import IconEye from '../../components/Icon/IconEye';

const PAGE_SIZES = [10, 20, 30, 50];

const Transactions = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetAllTransactionsQuery();

 // safe fallback
const transactions: Transaction[] = data?.transactions ?? []

  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'transactionId',
    direction: 'asc',
  });

  useEffect(() => {
    dispatch(setPageTitle('Transaction List'));
  }, [dispatch]);

  // Filter transactions based on search
  const filteredItems = useMemo(() => {
    return transactions.filter((item) =>
      item.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
      item.orderId?.toLowerCase().includes(search.toLowerCase()) ||
      item.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      item.paymentMethod?.toLowerCase().includes(search.toLowerCase()) ||
      item.status?.toLowerCase().includes(search.toLowerCase()) ||
      item.amount?.toString().includes(search)
    );
  }, [transactions, search]);

  // Sort and paginate
  const records = useMemo(() => {
    const sorted = sortBy(filteredItems, sortStatus.columnAccessor);
    const final = sortStatus.direction === 'desc' ? sorted.reverse() : sorted;
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    return final.slice(from, to);
  }, [filteredItems, sortStatus, page, pageSize]);

  if (isLoading) return <div className="p-6">Loading transactions...</div>;
  if (isError) return <div className="p-6 text-red-600">Failed to load transactions.</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="panel">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold">Transactions</p>
          <input
            type="text"
            placeholder="Search..."
            className="form-input w-1/3"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset to page 1 when search changes
            }}
          />
        </div>
      </div>

      <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="datatables pagination-padding">
            <DataTable
              className="whitespace-nowrap table-hover"
              records={records}
              columns={[
                { accessor: 'transactionId', title: 'Transaction ID', sortable: true },
                { accessor: 'orderId', title: 'Order ID', sortable: true },
                { accessor: 'customerName', title: 'Customer', sortable: true },
                { accessor: 'paymentMethod', title: 'Payment Method', sortable: true },
                { accessor: 'date', title: 'Date', sortable: true },
                {
                  accessor: 'amount',
                  title: 'Amount',
                  sortable: true,
                  titleClassName: 'text-right',
                  render: ({ amount }) => <div className="text-right font-semibold">₹{amount}</div>,
                },
                {
                  accessor: 'status',
                  title: 'Status',
                  sortable: true,
                  render: ({ status }) => (
                    <span className={`badge badge-outline-${status?.toLowerCase()}`}>
                      {status}
                    </span>
                  ),
                },
                {
                  accessor: 'actions',
                  title: 'Actions',
                  render: ({ id }) => (
                    <div className="flex gap-4 items-center justify-center">
                      <Tippy content="View" placement="top">
                        <NavLink
                          to={`/transactions/details/${id}`}
                          className="text-primary"
                        >
                          <IconEye />
                        </NavLink>
                      </Tippy>
                    </div>
                  ),
                },
              ]}
              highlightOnHover
              totalRecords={filteredItems.length}
              recordsPerPage={pageSize}
              page={page}
              onPageChange={setPage}
              recordsPerPageOptions={PAGE_SIZES}
              onRecordsPerPageChange={setPageSize}
              sortStatus={sortStatus}
              onSortStatusChange={setSortStatus}
              paginationText={({ from, to, totalRecords }) =>
                `Showing ${from} to ${to} of ${totalRecords} entries`
              }
              noRecordsText="No transactions found."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
