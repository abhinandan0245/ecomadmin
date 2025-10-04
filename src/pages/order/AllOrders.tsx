import { useState, useEffect, useMemo } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import { useAppDispatch } from '../../store/hooks';
import { useGetAllOrdersQuery, useCancelOrderMutation } from '../../../features/order/orderApi';
import ConfirmDialog from '../../component/ConfirmDailog';

import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { NavLink } from 'react-router-dom';
import ExportOrdersButton from '../../component/order/allorders/ExportOrdersButton';
import { useConfirmPickupFromOrderMutation, useCreateShipmentFromOrderMutation } from '../../../features/shipment/shipmentApi';

dayjs.extend(utc);
dayjs.extend(timezone);

const PAGE_SIZES = [10, 20, 30, 50, 100];

const AllOrders = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Order List'));
    }, [dispatch]);

    // Fetch orders
    const { data, isLoading } = useGetAllOrdersQuery();
    const orders = data?.data || [];

    const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

    // inside component
    const [createShipmentFromOrder, { isLoading: isCreatingShipment }] = useCreateShipmentFromOrderMutation();
    const [confirmPickupFromOrder, { isLoading: isConfirmingPickup }] = useConfirmPickupFromOrderMutation();
    const [creatingForId, setCreatingForId] = useState<number | null>(null);
    const [shipmentCreatedFor, setShipmentCreatedFor] = useState<number | null>(null);

    // UI state
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'orderId',
        direction: 'asc',
    });
    const [search, setSearch] = useState('');
    const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [date3, setDate3] = useState<any>('');

    // 🔑 Derived records (no extra useEffects)
    const filteredOrders = useMemo(() => {
        let filtered = orders;

        // Simple search filter
        if (search) {
            const s = search.toLowerCase();
            filtered = filtered.filter(
                (o: any) => o.orderId?.toString().includes(s) || o.Customer?.name?.toLowerCase().includes(s) || o.paymentMethod?.toLowerCase().includes(s) || o.orderStatus?.toLowerCase().includes(s)
            );
        }

        // TODO: Apply status filter & date range filter if you hook those selects
        return filtered;
    }, [orders, search]);

    const sortedOrders = useMemo(() => {
        const sorted = sortBy(filteredOrders, sortStatus.columnAccessor);
        return sortStatus.direction === 'desc' ? sorted.reverse() : sorted;
    }, [filteredOrders, sortStatus]);

    const pagedOrders = useMemo(() => {
        const from = (page - 1) * pageSize;
        return sortedOrders.slice(from, from + pageSize);
    }, [sortedOrders, page, pageSize]);

    // Cancel order handler
    const handleCancelOrder = async () => {
        if (!selectedOrder?.id) return;

        try {
            const result = await cancelOrder(selectedOrder.id).unwrap();
            toast.success(result?.message || 'Order cancelled successfully!');
            setShowCancelConfirm(false);
            setSelectedOrder(null);
        } catch (error) {
            console.error('Failed to cancel order:', error);
            toast.error('Failed to cancel order');
        }
    };

    if (isLoading) return <div className="text-center py-10">Loading...</div>;

    // shipment api call
    const handleCreateShipment = async (order: any) => {
        try {
            setCreatingForId(order.id);
            const res = await createShipmentFromOrder({ orderId: order.id }).unwrap();

            const waybill = res?.data?.waybill;
            const shipment = res?.data?.shipment;

            toast.success(res?.message || `Shipment created (WB: ${waybill || '-'})`);

               setShipmentCreatedFor(order.id);

            console.log('Shipment object:', shipment); // optional debug
        } catch (e: any) {
            toast.error(e?.data?.message || 'Failed to create shipment');
        } finally {
            setCreatingForId(null);
        }
    };


    const handleConfirmPickup = async (order: any) => {
    try {
        const res = await confirmPickupFromOrder({
            orderId: order.id,
            pickupDate: new Date().toISOString().slice(0, 10),
            pickupTime: '14:00:00',
            expectedPackageCount: 1,
        }).unwrap();

        toast.success(res?.message || 'Pickup confirmed successfully');
        setShipmentCreatedFor(null);
    } catch (e: any) {
        toast.error(e?.data?.message || 'Failed to confirm pickup');
    }
};

    return (
        <div className="flex flex-col gap-4">
            {/* Top filters */}
            <div className="panel">
                <p className="text-2xl font-bold w-1/3 mb-8">All Orders</p>
                <div className="flex justify-between gap-5 items-center">
                    <div className="flex w-1/2 items-center">
                        <label htmlFor="Filter" className="w-1/6">
                            Order Status :
                        </label>
                        <select
                            name="payment"
                            id="_payment"
                            className="form-select flex-1"
                            // TODO: hook this up to filteredOrders
                            onChange={() => {}}
                        >
                            <option value=""></option>
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
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

            {/* Orders table */}
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
                            records={pagedOrders}
                            columns={[
                                { accessor: 'orderId', title: 'Order Id', sortable: true },
                                {
                                    accessor: 'customerName',
                                    title: 'Customer',
                                    sortable: true,
                                    render: ({ Customer }) => <div>{Customer?.name}</div>,
                                },
                                {
                                    accessor: 'orderDate',
                                    title: 'Date and Time',
                                    sortable: true,
                                    render: ({ orderDate }) => dayjs(orderDate).tz('Asia/Kolkata').format('DD/MM/YYYY hh:mm A'),
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
                                    render: ({ amount }) => <div className="font-semibold">₹ {amount}</div>,
                                },
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
                                        const color = statusMap[label] || 'secondary';
                                        return <span className={`badge badge-outline-${color}`}>{label}</span>;
                                    },
                                },
                                {
                                    accessor: 'action',
                                    title: 'Actions',
                                    sortable: false,
                                    render: (order) => {
                                        const hasShipment = Array.isArray(order.shipments) && order.shipments.length > 0;

                                        // ✅ define canCreate here
                                        // const canCreate = !hasShipment && order.orderStatus !== 'Cancelled' && ['Pending', 'Processing'].includes(order.orderStatus);
                                        const canCreate = !hasShipment && order.orderStatus !== 'Cancelled' && ['Pending', 'Processing'].includes(order.orderStatus);

                                        return (
                                            <div className="flex gap-2 items-center">
                                                {/* View order */}
                                                <NavLink to={`/order/order-details/${order.id}`}>
                                                    <button className="btn btn-sm btn-primary">View</button>
                                                </NavLink>
                                                  

                                             {/* Create Shipment button for Processing & Ordered */}
{canCreate && (
  <button
    className="btn btn-sm btn-secondary"
    onClick={() => {
      handleCreateShipment(order);
      setShipmentCreatedFor(order.id);
    }}
    disabled={isCreatingShipment && creatingForId === order.id}
  >
    {isCreatingShipment && creatingForId === order.id ? 'Creating...' : 'Create Shipment'}
  </button>
)}

{/* Cancel button for Ordered & Processing */}
{['Ordered', 'Processing'].includes(order.orderStatus) && (
  <button
    className="btn btn-sm btn-danger"
    onClick={() => {
      const fullOrder = orders.find((o) => o.id === order.id);
      setSelectedOrder(fullOrder);
      setShowCancelConfirm(true);
    }}
  >
    Cancel Order
  </button>
)}
                                               
                                            
                                            </div>
                                        );
                                    },
                                },
                            ]}
                            totalRecords={filteredOrders.length}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={setPage}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            sortStatus={sortStatus}
                            onSortStatusChange={setSortStatus}
                            selectedRecords={selectedRecords}
                            onSelectedRecordsChange={setSelectedRecords}
                            highlightOnHover
                        />
                    </div>
                </div>
            </div>

            {/* Cancel confirm */}
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
                    setSelectedOrder(null);
                }}
                loading={isCancelling}
            />
        </div>
    );
};

export default AllOrders;
