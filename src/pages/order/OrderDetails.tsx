import { useState, Fragment, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IconPrinter from '../../components/Icon/IconPrinter';
import IconDownload from '../../components/Icon/IconDownload';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import { Truck } from 'lucide-react';
import { useGetOrderByIdQuery } from '../../../features/order/orderApi';
import { Customer, Order } from '../../types';
import IconArrowBackward from '../../components/Icon/IconArrowBackward';

import html2pdf from 'html2pdf.js';

const OrderDetails = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useGetOrderByIdQuery(Number(id));
    const order: Order | undefined = data?.data;
    //   const order = data?.data; // 👈 backend se jo data aaya hai usme se nikaal lo
    const navigate = useNavigate();
    const [shippmentPopUp, setShippmentPopUp] = useState(false);

    const invoiceRef = useRef<HTMLDivElement>(null);

    // const handleDownload = () => {
    //   if (invoiceRef.current) {
    //     const opt = {
    //       margin:       0.3,
    //       filename:     invoice-${Date.now()}.pdf,
    //       image:        { type: "jpeg", quality: 0.98 },
    //       html2canvas:  { scale: 2 },
    //       jsPDF:        { unit: "in", format: "a4", orientation: "portrait" }
    //     };
    //     html2pdf().set(opt).from(invoiceRef.current).save();
    //   }
    // };

    const downloadPDF = () => {
        if (invoiceRef.current) {
            const element = invoiceRef.current;
            const opt = {
                margin: 0.3,
                filename: `invoice-${order?.orderId || Date.now()}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true }, // ✅ images load hongi
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            };
            html2pdf().set(opt).from(element).save();
        }
    };

    const exportTable = () => window.print();

    const columns = [
        { key: 'id', label: 'S.NO' },
        { key: 'productId', label: 'HSN Code' },
        { key: 'title', label: 'ITEMS' },
        { key: 'quantity', label: 'QTY' },
        { key: 'price', label: 'PRICE', class: 'text-end' },
        { key: 'amount', label: 'AMOUNT', class: 'text-end' },
    ];

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Failed to load order</div>;
    if (!order) return <div>No order found</div>;

    const products = order?.orderItems ?? [];
    const address: Customer | undefined = order?.Customer;
    // const shipmentAddress = order?.shipments?.[0]?.customerAddress ? JSON.parse(order.shipments[0].customerAddress) : null;

    console.log("order", order)
    return (
        <div>
            {/* Buttons */}
            <div className="flex items-center lg:justify-end justify-center flex-wrap gap-4 mb-6">
                <button type="button" className="btn btn-dark gap-2" onClick={() => navigate(-1)}>
                    <IconArrowBackward />
                    Back To Orders
                </button>
                <button type="button" className="btn btn-primary gap-2" onClick={exportTable}>
                    <IconPrinter />
                    Print
                </button>
                <button type="button" onClick={downloadPDF} className="btn btn-success gap-2">
                    <IconDownload />
                    Download
                </button>
            </div>

            <div ref={invoiceRef} className="panel">
                {/* Order Info */}
                <div className="">
                    <div className="flex justify-between flex-wrap gap-4 px-4">
                        <div className="text-2xl font-semibold uppercase">Tax Invoice</div>
                        <div className="shrink-0">
                            <img src="/logo2.png" alt="img" className="w-[50%] ltr:ml-auto rtl:mr-auto" />
                        </div>
                    </div>

                    {/* Customer Address */}
                    <div className="ltr:text-right rtl:text-left px-4">
                        <div className="space-y-1 mt-6 text-white-dark">
                            <div>
                                <p className="text-lg">Ashirwad Enterprises</p>
                                <p>94 Shekhawat Marg Krishna Nagar,</p>
                                <p>Vaishali Nagar, Jaipur Rajasthan</p>
                                <p>302021</p>
                                <p>GSTIN: 08AEAPT6698H2ZT</p>
                            </div>
                            {/* <div>
              {address?.shippingAddress || '-'}, {address?.city || '-'}, {address?.state || '-'}, {address?.pincode || '-'}
            </div>
            <div>{address?.email || '-'}</div>
            <div>{address?.mobile || '-'}</div> */}
                        </div>
                    </div>

                    <hr className="border-white-light dark:border-[#1b2e4b] my-6" />

                    {/* Customer + Invoice Details */}
                    <div className="flex justify-between lg:flex-row flex-col gap-6 flex-wrap">
                       <div className="flex-1">
                            <div className="text-black dark:text-white font-semibold">
                                {order?.shippingName || '-'}
                                <div>
                                    {' '}
                                    {order?.shippingAddress || '-'}, {order?.shippingCity || '-'}, {order?.shippingState || '-'}, {order?.shippingPostalCode || '-'}
                                </div>{' '}
                                <div>{order?.shippingEmail || '-'}</div> <div>{order?.shippingPhone || '-'}</div>{' '}
                            </div>
                        </div>

                        <div className="flex justify-between sm:flex-row flex-col gap-6 lg:w-2/3">
                            <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                                <div className="flex items-center w-full justify-between mb-2">
                                    <div className="text-white-dark">Invoice :</div>
                                    <div>{order.invoiceNumber ?? '-'}</div>
                                </div>
                                <div className="flex items-center w-full justify-between mb-2">
                                    <div className="text-white-dark">Order Date :</div>
                                    <div>
                                        {order.createdAt
                                            ? new Date(order.createdAt).toLocaleString('en-IN', {
                                                  timeZone: 'Asia/Kolkata',
                                                  day: 'numeric',
                                                  month: 'numeric',
                                                  year: 'numeric',
                                                  hour: 'numeric',
                                                  minute: '2-digit',
                                                  hour12: true,
                                              })
                                            : '-'}
                                    </div>
                                </div>
                                <div className="flex items-center w-full justify-between mb-2">
                                    <div className="text-white-dark">Order ID :</div>
                                    <div>{order.orderId}</div>
                                </div>
                                <div className="flex items-center w-full justify-between">
                                    <div className="text-white-dark">Shipment ID :</div>
                                    <div>{order.shipments?.[0]?.waybill || '-'}</div>
                                </div>
                            </div>

                            <div className="xl:1/3 lg:w-2/6 sm:w-1/2">
                                <div className="flex items-center w-full gap-5 mb-2">
                                    <div className="text-dark font-bold">Payment Mode:</div>
                                    <div className="whitespace-nowrap font-bold">{order.paymentMethod || '-'}</div>
                                </div>
                                <div className="flex items-center w-full gap-5 mb-2">
                                    <div className="text-dark font-bold">Payment Status:</div>
                                    <div className={`whitespace-nowrap font-bold ${order.paymentStatus === 'Success' ? 'text-green-500' : 'text-red-500'}`}>{order.paymentStatus || '-'}</div>
                                </div>
                                {/* <div className="flex items-center w-full gap-5 mb-2">
                                    <div className="text-dark font-bold">Order Status:</div>
                                    <div
                                        className={`whitespace-nowrap font-bold ${
                                            order.orderStatus === 'Processing'
                                                ? 'text-blue-500'
                                                : order.orderStatus === 'Ordered'
                                                ? 'text-indigo-500'
                                                : order.orderStatus === 'Picked Up'
                                                ? 'text-yellow-500'
                                                : order.orderStatus === 'Out For Delivery'
                                                ? 'text-orange-500'
                                                : order.orderStatus === 'Delivered'
                                                ? 'text-green-600'
                                                : order.orderStatus === 'Cancelled'
                                                ? 'text-red-600'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        {order.orderStatus || '-'}
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="table-responsive mt-6">
                        <table className="table-striped">
                            <thead>
                                <tr>
                                    {columns.map((column) => (
                                        <th key={column.key} className={column?.class}>
                                            {column.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((item: any, idx: number) => (
                                        <tr key={item.id || idx}>
                                            <td>{idx + 1}</td>
                                            <td>{item.product.hsnCode}</td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <img src={  (item.imageUrls ? JSON.parse(item.imageUrls)[0] : null) || item.product?.image || "/placeholder.png"} alt={item.title} className="size-12" />
                                                    {item.title}
                                                </div>
                                            </td>
                                            <td>{item.quantity}</td>
                                            <td className="text-end">₹{item.price}</td>
                                            <td className="text-end">₹{(item.price * item.quantity).toLocaleString('en-IN')}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={columns.length} className="text-center text-gray-400">
                                            No products found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="grid sm:grid-cols-2 grid-cols-1 px-4 mt-6">
                        <div></div>
                        <div className="ltr:text-right rtl:text-left space-y-2">
                            <div className="flex items-center">
                                <div className="flex-1">Subtotal</div>
                                <div className="w-[37%]">₹{order.subtotal ?? 0}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-1">Discount</div>
                                <div className="w-[37%]">₹{order.discount ?? 0}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-1">Shipping Rate</div>
                                <div className="w-[37%]">₹{order.shippingRate ?? 0}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-1">GST</div>
                                <div className="w-[37%]">₹{order.tax ?? 0}</div>
                            </div>
                            <div className="flex items-center font-semibold text-lg">
                                <div className="flex-1">Grand Total</div>
                                <div className="w-[37%]">₹{order.grandTotal ?? 0}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shipment Popup */}
                <Transition appear show={shippmentPopUp} as={Fragment}>
                    <Dialog as="div" open={shippmentPopUp} onClose={() => setShippmentPopUp(false)} className="relative z-[51]">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-[black]/60" />
                        </Transition.Child>
                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center px-4 py-8">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                        <button
                                            type="button"
                                            onClick={() => setShippmentPopUp(false)}
                                            className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                        >
                                            <IconX />
                                        </button>
                                        <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Shippment Id</div>
                                        <div className="p-5">
                                            <form>
                                                <div>
                                                    <input className="form-input" type="text" name="shippmentId" id="_shippmentId" placeholder="shippment Id" />
                                                </div>
                                                <div className="flex justify-center items-center mt-8">
                                                    <button onClick={() => setShippmentPopUp(false)} type="button" className="btn btn-success ltr:ml-4 rtl:mr-4">
                                                        Save
                                                    </button>
                                                    <button type="button" className="btn btn-outline-danger gap-2 ltr:ml-4 rtl:mr-4" onClick={() => setShippmentPopUp(false)}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    );
};

export default OrderDetails;