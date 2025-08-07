import { useEffect, useState, Fragment, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import IconPrinter from '../../components/Icon/IconPrinter';
import IconDownload from '../../components/Icon/IconDownload';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import { Truck } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getByIdOrdersThunk } from '../../store/thunks/orderThunks';

const OrderDetails = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { selectedOrder, loading } = useAppSelector((state) => state.orders);
    console.log(selectedOrder); // For debugging purposes, you can remove this later

    // All hooks at the top!
    const [shippmentPopUp, setShippmentPopUp] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle('Invoice Preview'));
        if (id) {
            dispatch(getByIdOrdersThunk(id));
        }
    }, [dispatch, id]);

    // Loading and not found checks
    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!selectedOrder) return <div className="text-center py-10 text-red-600">Order not found.</div>;

    // Parse products and address if needed
    let products = [];
    try {
        products = typeof selectedOrder.products === 'string' ? JSON.parse(selectedOrder.products) : selectedOrder.products;
    } catch {
        products = [];
    }

    let address = selectedOrder.address;
    try {
        address = typeof selectedOrder.address === 'string' ? JSON.parse(selectedOrder.address) : selectedOrder.address;
    } catch {
        address = selectedOrder.address;
    }

    const exportTable = () => {
        window.print();
    };

    const columns = [
        { key: 'id', label: 'S.NO' },
        { key: 'productId', label: 'Product ID' },
        { key: 'title', label: 'ITEMS' },
        { key: 'quantity', label: 'QTY' },
        { key: 'price', label: 'PRICE', class: 'text-end' },
        { key: 'amount', label: 'AMOUNT', class: 'text-end' },
    ];

    const shippmentPopUpOpen = () => setShippmentPopUp(true);

    // for show percent and discount 

const subtotal = Number(selectedOrder.subtotal ?? 0);
const discountAmount = Number(selectedOrder.discount ?? 0);
const taxAmount = Number(selectedOrder.tax ?? 0);
const shippingRate = Number(selectedOrder.shippingRate ?? 0);

const discountPercent = subtotal > 0 ? ((discountAmount / subtotal) * 100).toFixed(2) : '0.00';
const totalBeforeTax = subtotal - discountAmount + shippingRate;
const taxPercent = totalBeforeTax > 0 ? ((taxAmount / totalBeforeTax) * 100).toFixed(2) : '0.00';


    return (
        <div>
            <div className="flex items-center lg:justify-end justify-center flex-wrap gap-4 mb-6">
                <button type="button" className="btn btn-primary gap-2" onClick={exportTable}>
                    <IconPrinter />
                    Print
                </button>
                <button type="button" className="btn btn-success gap-2">
                    <IconDownload />
                    Download
                </button>
                <button onClick={shippmentPopUpOpen} className="btn btn-secondary gap-2">
                    <Truck />
                    Shippment
                </button>
            </div>
            <div className="panel">
                <div className="flex justify-between flex-wrap gap-4 px-4">
                    <div className="text-2xl font-semibold uppercase">Order Details</div>
                    <div className="shrink-0">
                        <img src="/assets/images/logo.svg" alt="img" className="w-14 ltr:ml-auto rtl:mr-auto" />
                    </div>
                </div>
                <div className="ltr:text-right rtl:text-left px-4">
                    <div className="space-y-1 mt-6 text-white-dark">
                        <div>
                            {' '}
                            {address?.line1 || '-'}, {address?.city || '-'}, {address?.state || '-'}, {address?.pincode || '-'}
                        </div>
                        <div>{selectedOrder.customerEmail || '-'}</div>
                        <div>{selectedOrder.customerMobile || '-'}</div>
                    </div>
                </div>

                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="flex justify-between lg:flex-row flex-col gap-6 flex-wrap">
                    <div className="flex-1">
                        <div className="space-y-1 text-white-dark">
                            <div>Customer Name:</div>
                            <div className="text-black dark:text-white font-semibold">{selectedOrder.customerName || '-'}</div>
                            <div>
                                {' '}
                                {address?.line1 || '-'}, {address?.city || '-'}, {address?.state || '-'}, {address?.pincode || '-'}
                            </div>
                            <div>{selectedOrder.customerEmail || '-'}</div>
                            <div>{selectedOrder.customerMobile || '-'}</div>
                        </div>
                    </div>
                    <div className="flex justify-between sm:flex-row flex-col gap-6 lg:w-2/3">
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Invoice :</div>
                                <div>{selectedOrder.invoiceNumber ?? '-'}</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Order Date :</div>
                                <div>
                                    {selectedOrder.orderDate
                                        ? new Date(selectedOrder.orderDate).toLocaleString('en-IN', {
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
                                <div>{selectedOrder.orderId || '-'}</div>
                            </div>
                            <div className="flex items-center w-full justify-between">
                                <div className="text-white-dark">Shipment ID :</div>
                                <div>{selectedOrder.shipmentId || '-'}</div>
                            </div>
                        </div>
                        <div className="xl:1/3 lg:w-2/6 sm:w-1/2">
                            <div className="flex items-center w-full gap-5 mb-2">
                                <div className="text-dark font-bold">Payment Mode:</div>
                                <div className="whitespace-nowrap font-bold">{selectedOrder.paymentMethod || '-'}</div>
                            </div>
                            <div className="flex items-center w-full gap-5 mb-2">
                                <div className="text-dark font-bold">Payment Status:</div>
                                <div className={`whitespace-nowrap font-bold ${selectedOrder.paymentStatus === 'Success' ? 'text-green-500' : 'text-red-500'}`}>
                                    {selectedOrder.paymentStatus || '-'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                            {Array.isArray(products) && products.length > 0 ? (
                                products.map((item: any, idx: number) => (
                                    <tr key={item.productId || idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.productId}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <img src={item.image} alt={item.title} className="size-12" />
                                                {item.title}
                                            </div>
                                        </td>
                                        <td>{item.qty ?? item.quantity}</td>
                                        <td className="text-end">₹{item.price}</td>
                                        <td className="text-end">₹{(item.price * (item.qty ?? item.quantity ?? 1)).toLocaleString('en-IN')}</td>
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
                <div className="grid sm:grid-cols-2 grid-cols-1 px-4 mt-6">
                    <div></div>
                    <div className="ltr:text-right rtl:text-left space-y-2">
                        <div className="flex items-center">
                            <div className="flex-1">Subtotal</div>
                            <div className="w-[37%]">₹{selectedOrder.subtotal ?? 0}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Discount ({discountPercent}%)</div>
                            <div className="w-[37%]">₹{selectedOrder.discount ?? 0}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Shipping Rate</div>
                            <div className="w-[37%]">₹{selectedOrder.shippingRate ?? 0}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">GST ({taxPercent}%)</div>
                            <div className="w-[37%]">₹{selectedOrder.tax ?? 0}</div>
                        </div>
                        

                        <div className="flex items-center font-semibold text-lg">
                            <div className="flex-1">Grand Total</div>
                            <div className="w-[37%]">₹{selectedOrder.grandTotal ?? 0}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="panel mt-4 flex justify-end">
                <button className="btn btn-success w-44">Save</button>
            </div>

            {/* Shipment popup */}
            <Transition appear show={shippmentPopUp} as={Fragment}>
                <Dialog as="div" open={shippmentPopUp} onClose={() => setShippmentPopUp(false)} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
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
    );
};

export default OrderDetails;
