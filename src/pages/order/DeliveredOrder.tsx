import { NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect, useMemo } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import ExportOrdersButton from '../../component/order/allorders/ExportOrdersButton';
import { useGetDeliveredOrdersQuery } from '../../../features/order/orderApi';
import { Order } from '../../types';
import { Loader, Text } from 'lucide-react';

interface Props {
  orders: Order[];
}

const DeliveredOrder = () => {
  const dispatch = useDispatch();
  const { data: response, isLoading, isError , error } = useGetDeliveredOrdersQuery();
  const rawOrders = response?.data || [];
  
  useEffect(() => {
      dispatch(setPageTitle('Delivered List'));
    }, [dispatch]);
    
    

  const items: Order[] = useMemo(() => {
    return rawOrders.map((item) => ({
      ...item,
      status2: {
        tooltip: item.orderStatus || 'Delivered',
        color:
          item.orderStatus === 'Delivered'
            ? 'success'
            : item.orderStatus === 'Pending'
            ? 'warning'
            : item.orderStatus === 'Cancelled'
            ? 'danger'
            : 'info',
      },
      status: {
        tooltip: item.paymentStatus || 'Pending',
        color:
          item.paymentStatus === 'Success'
            ? 'success'
            : item.paymentStatus === 'Pending'
            ? 'warning'
            : 'danger',
      },
    }));
  }, [rawOrders]);

  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState<Order[]>([]);
  const [records, setRecords] = useState<Order[]>([]);
  const [selectedRecords, setSelectedRecords] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'orderId',
    direction: 'asc',
  });

  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

  // Filtering & Sorting
  // Filtering & Sorting
useEffect(() => {
 if (!response?.data) return;


  const filtered = items.filter((item) => {
    const valuesToSearch = [
      item.orderId?.toString() || '',
      item.customerName || '',
      item.customerEmail || '',
      item.customerMobile || '',
      item.paymentMethod || '',
      item.amount?.toString() || '',
      item.orderDate || '',
      item.paymentStatus || '',
      item.orderStatus || '',
    ];

    return valuesToSearch.some((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    );
  });

  const sorted = sortBy(filtered, sortStatus.columnAccessor);
  const finalSorted = sortStatus.direction === 'desc' ? sorted.reverse() : sorted;

  // Only set if changed
  setInitialRecords(finalSorted);
},  [response?.data, search, sortStatus]); // ✅ important: track data.orders not `items`


  // Pagination
  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords([...initialRecords.slice(from, to)]);
  }, [initialRecords, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

   if (isLoading) return <Loader />;

  if (isError) {
  console.error('Error:', error); // now valid
  return <div className="text-red-600 font-medium">Failed to load delivered orders</div>;
}

if (!response?.data || response.data.length === 0) {
  return <div className="text-gray-500 font-medium">No delivered orders found</div>;
}



  return (
    <div className="flex flex-col gap-4">
      <div className="panel">
        <p className="text-2xl font-bold w-1/3 mb-8">Delivered Orders</p>
        <div className="flex justify-between gap-5 items-center">
          <div className="flex justify-center items-center gap-4 flex-1">
            <label htmlFor="daterange" className="w-1/5">
              Date Range :
            </label>
            <Flatpickr
              options={{
                mode: 'range',
                dateFormat: 'Y-m-d',
                position: isRtl ? 'auto right' : 'auto left',
              }}
              className="form-input"
              onChange={() => {}}
            />
          </div>
        </div>
      </div>

      <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
            <div className="flex items-center gap-2">
              <ExportOrdersButton orders={initialRecords} />
            </div>
            <div className="ltr:ml-auto rtl:mr-auto">
              <input
                type="text"
                className="form-input w-auto"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="datatables pagination-padding">
            <DataTable
              className="whitespace-nowrap table-hover invoice-table"
              records={records}
              columns={[
                {
                  accessor: 'orderId',
                  sortable: true,
                  render: ({ orderId }) => (
                    <NavLink to={`/order/order-details/${orderId}`}>
                      <div className="text-primary underline hover:no-underline font-semibold">
                        #{orderId}
                      </div>
                    </NavLink>
                  ),
                },
                {
                  accessor: 'customerName',
                  title: 'Customer',
                  sortable: true,
                },
                {
                  accessor: 'customerEmail',
                  title: 'Email',
                  sortable: true,
                },
                {
                  accessor: 'customerMobile',
                  title: 'Mobile No.',
                  sortable: true,
                },
                {
                  accessor: 'orderDate',
                  title: 'Order Date',
                  sortable: true,
                },
                {
                  accessor: 'paymentMethod',
                  title: 'Payment Method',
                  sortable: true,
                },
                {
                  accessor: 'amount',
                  title: 'Amount',
                  sortable: true,
                  titleClassName: 'text-right',
                  render: ({ amount }) => (
                    <div className="text-right font-semibold">₹ {amount.toFixed(2)}</div>
                  ),
                },
                {
  accessor: 'paymentStatus',
  title: 'Payment Status',
  sortable: true,
  render: (row: Order) => (
    <span className={`badge badge-outline-${row.status?.color}`}>
      {row.status?.tooltip}
    </span>
  ),
},
{
  accessor: 'orderStatus',
  title: 'Order Status',
  sortable: true,
  render: (row : Order) => (
    <span className={`badge badge-outline-${row.status2?.color}`}>
      {row.status2?.tooltip}
    </span>
  ),
},
                {
                  accessor: 'action',
                  title: 'Actions',
                  sortable: false,
                  textAlignment: 'center',
                  render: ({ id }) => (
                    <div className="flex gap-4 items-center w-max mx-auto">
                      <NavLink to={`/order/order-details/${id}`} className="flex hover:text-primary">
                        <button className="btn btn-sm btn-primary">View</button>
                      </NavLink>
                    </div>
                  ),
                },
              ]}
              highlightOnHover
              totalRecords={initialRecords.length}
              recordsPerPage={pageSize}
              page={page}
              onPageChange={setPage}
              recordsPerPageOptions={PAGE_SIZES}
              onRecordsPerPageChange={setPageSize}
              sortStatus={sortStatus}
              onSortStatusChange={setSortStatus}
              selectedRecords={selectedRecords}
              onSelectedRecordsChange={setSelectedRecords}
              paginationText={({ from, to, totalRecords }) =>
                `Showing ${from} to ${to} of ${totalRecords} entries`
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveredOrder;
