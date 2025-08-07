import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconPlus from '../../components/Icon/IconPlus';
import ExportOrdersButton from '../../component/order/allorders/ExportOrdersButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { cancelOrderThunk, getAllOrdersThunk } from '../../store/thunks/orderThunks';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import ConfirmDialog from '../../component/ConfirmDailog';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const AllOrders = () => {
    const dispatch = useAppDispatch();
    // If your state is state.orders.orders, use: const orders = useAppSelector((state) => state.orders.orders);
    const { orders, loading } = useAppSelector((state) => state.orders);

    useEffect(() => {
        dispatch(setPageTitle('Order List'));
        dispatch(
            getAllOrdersThunk({
                status: '',
            })
        );
    }, [dispatch]);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [records, setRecords] = useState<any[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'invoice',
        direction: 'asc',
    });
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

    // Debug: Show raw orders
    // Remove this after debugging
    // console.log('orders:', orders);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        if (!orders || orders.length === 0) {
            setInitialRecords([]);
            return;
        }

        const filtered = orders.filter((item: any) => {
            const name = item.name?.toLowerCase() || '';
            const date = item.dateOfOrder?.toString().toLowerCase() || '';
            const total = item.total?.toString().toLowerCase() || '';
            const amount = item.amount?.toString().toLowerCase() || '';
            const paymentStatus = item.paymentStatus?.tooltip?.toLowerCase() || item.paymentStatus?.toLowerCase() || '';
            const orderStatus = item.orderStatus?.tooltip?.toLowerCase() || item.orderStatus?.toLowerCase() || '';

            return (
                name.includes(search.toLowerCase()) ||
                date.includes(search.toLowerCase()) ||
                total.includes(search.toLowerCase()) ||
                amount.includes(search.toLowerCase()) ||
                paymentStatus.includes(search.toLowerCase()) ||
                orderStatus.includes(search.toLowerCase())
            );
        });

        setInitialRecords(filtered);
    }, [search, orders]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus, initialRecords]);

    // date range
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [date3, setDate3] = useState<any>('');

    if (loading) return <div className="text-center py-10">Loading...</div>;

    // cance'l order api call

    const handleCancelOrder = async () => {
        if (!selectedOrder?.id) return;

        setIsCancelling(true);
        try {
            const result = await dispatch(cancelOrderThunk(selectedOrder.id)).unwrap();
            toast.success(result?.message || 'Order cancelled successfully!');
            setShowCancelConfirm(false);
            setSelectedOrder(null); // ✅ Reset
            dispatch(getAllOrdersThunk({ status: '' }));
        } catch (error) {
            console.error('Failed to cancel order:', error);
            toast.error('Failed to cancel order');
        } finally {
            setIsCancelling(false);
        }
    };

    // time zone
    dayjs.extend(utc);
    dayjs.extend(timezone);

    return (
        <div className="flex flex-col gap-4">
            <div className="panel">
                <p className="text-2xl font-bold w-1/3 mb-8">All Orders</p>
                <div className="flex justify-between gap-5 items-center">
                    <div className="flex w-1/2 items-center">
                        <label htmlFor="Filter" className="w-1/6">
                            Order Status :
                        </label>
                        <select name="payment" id="_payment" className="form-select flex-1">
                            <option value="payment"></option>
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Deliverd">Deliverd</option>
                            <option value="Cancel">Canceled</option>
                        </select>
                    </div>
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
                            value={date3}
                            className="form-input"
                            onChange={(date3) => setDate3(date3)}
                        />
                    </div>
                </div>
            </div>
            <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
                <div className="invoice-table">
                    <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                        <div className="flex items-center gap-2">
                            <ExportOrdersButton orders={orders} />
                        </div>
                        <div className="ltr:ml-auto rtl:mr-auto">
                            <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <div className="datatables pagination-padding">
                        <DataTable
                            className="whitespace-nowrap table-hover invoice-table"
                            records={records}
                            columns={[
                                {
                                    accessor: 'orderId',
                                    title: 'Order Id',
                                    sortable: true,
                                },
                                {
                                    accessor: 'customerName',
                                    title: 'Customer',
                                    sortable: true,

                                    render: ({ customerName, id }) => (
                                        <div className="flex items-center font-semibold">
                                            <div>{customerName}</div>
                                        </div>
                                    ),
                                },
                                // {
                                //     accessor: 'customerEmail',
                                //     title: 'Email',
                                //     sortable: true,
                                // },
                                // {
                                //     accessor: 'customerMobile',
                                //     title: 'Mobile',
                                //     sortable: true,
                                // },
                                {
                                    accessor: 'orderDate',
                                    title: 'Date and Time',
                                    sortable: true,
                                    render: ({ orderDate }) => {
                                        const formatted = dayjs(orderDate).tz('Asia/Kolkata').format('DD/MM/YYYY hh:mm A');
                                        return <div>{formatted}</div>;
                                    },
                                },

                                {
                                    accessor: 'paymentMethod',
                                    title: 'Payment Method',
                                    sortable: true,
                                },
                                {
                                    accessor: 'amount',
                                    title: 'Order Amount',
                                    sortable: true,
                                    // titleClassName: 'text-center',
                                    render: ({ amount }) => <div className=" font-semibold">{`₹ ${amount}`}</div>,
                                },
                                // {
                                //     accessor: 'paymentStatus',
                                //     title: 'Payment Status',
                                //     sortable: true,
                                //     render: ({ paymentStatus }) => {
                                //         const status = paymentStatus?.tooltip ? paymentStatus : { tooltip: paymentStatus, color: 'success' };
                                //         return <span className={`badge badge-outline-${status.color}`}>{status.tooltip}</span>;
                                //     },
                                // },
                                {
                                    accessor: 'orderStatus',
                                    title: 'Order Status',
                                    sortable: true,
                                    render: ({ orderStatus }) => {
    const statusMap: Record<string, string> = {
        Pending: 'warning',
        Processing: 'info',
        Shipped: 'primary',
        Delivered: 'success',
        Cancelled: 'danger',
        Failed: 'danger',
    };

    const label = typeof orderStatus === 'object' ? orderStatus.tooltip : orderStatus;
    const color = statusMap[label] || 'secondary'; // fallback color

    return <span className={`badge badge-outline-${color}`}>{label}</span>;
},
                                },
                                //                                 {
                                //   accessor: 'products',
                                //   title: 'Products',
                                //   sortable: false,
                                //   render: ({ products }) => {
                                //     let productList = [];

                                //     try {
                                //       const parsedProducts = typeof products === 'string' ? JSON.parse(products) : products;
                                //       productList = parsedProducts.map((p: any) => `${p.title} (x${p.qty})`);
                                //     } catch {
                                //       productList = ['Invalid format'];
                                //     }

                                //     return <div className="whitespace-nowrap max-w-[250px]">{productList.join(', ')}</div>;
                                //   },
                                // },

                                //                                {
                                //   accessor: 'address',
                                //   title: 'Address',
                                //   sortable: false,
                                //   render: ({ address }) => {
                                //     let formatted = '';

                                //     try {
                                //       const addr = typeof address === 'string' ? JSON.parse(address) : address;
                                //       formatted = `${addr.line1}, ${addr.city}, ${addr.state} - ${addr.pincode}`;
                                //     } catch {
                                //       formatted = 'Invalid address';
                                //     }

                                //     return <div className="whitespace-nowrap max-w-[250px]">{formatted}</div>;
                                //   },
                                // },

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
                                            {/* <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => {
                                                    const fullOrder = records.find((order) => order.id === id);
                                                    setSelectedOrder(fullOrder);
                                                    setShowCancelConfirm(true);
                                                }}
                                            >
                                                Cancel Order
                                            </button> */}
                                        </div>
                                    ),
                                },
                            ]}
                            highlightOnHover
                            totalRecords={initialRecords.length}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            sortStatus={sortStatus}
                            onSortStatusChange={setSortStatus}
                            selectedRecords={selectedRecords}
                            onSelectedRecordsChange={setSelectedRecords}
                            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        />
                    </div>
                </div>
            </div>

            {/* confirmation popoup  */}
            <ConfirmDialog
                open={showCancelConfirm}
                title="Cancel Order"
                message={
                    <div>
                        Are you sure you want to cancel this order?
                        <div className="mt-2">
                            <span className="font-medium">Order ID:</span> {selectedOrder?.orderId || 'N/A'}
                            <br />
                            <span className="font-medium">Customer:</span> {selectedOrder?.customerName || 'N/A'}
                            <br />
                            <span className="font-medium">Grand Total:</span> ₹{selectedOrder?.grandTotal || 'N/A'}
                        </div>
                    </div>
                }
                confirmText="Yes, Cancel"
                cancelText="No"
                onConfirm={handleCancelOrder}
                onCancel={() => {
                    setShowCancelConfirm(false);
                    setSelectedOrder(null); // ✅ Reset
                }}
                loading={isCancelling}
            />
        </div>
    );
};

export default AllOrders;
