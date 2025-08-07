import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import IconSend from '../../components/Icon/IconSend';
import IconPrinter from '../../components/Icon/IconPrinter';
import IconDownload from '../../components/Icon/IconDownload';
import IconEdit from '../../components/Icon/IconEdit';
import IconPlus from '../../components/Icon/IconPlus';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment,useRef } from 'react';
import IconX from '../../components/Icon/IconX';
import { Truck } from 'lucide-react';

const OrderDetails = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice Preview'));
    });
    const exportTable = () => {
        window.print();
    };

    const items = [
        {
            id: 1,
            image : '/image/watch1.png',
            title: 'Calendar App Customization',
            returnimage : '/image/watch1.png',
            title2: 'Calendar App Customization',
            status: { tooltip: 'Returned', color: 'success' },
            quantity: 1,
            price: '120',
            amount: '120',
        },
        {
            id: 2,
            image : '/image/airbuds1.png',
            title: 'Chat App Customization',
            returnimage : '/image/watch1.png',
            title2: 'Chat App Customization',
            status: { tooltip: '', color: 'danger' },
            quantity: 1,
            price: '230',
            amount: '230',
        },
        {
            id: 3,
            image : '/image/shirt1.png',
            title: 'Laravel Integration',
            returnimage : '/image/watch1.png',
            status: { tooltip: '', color: 'danger' },
            title2: 'Laravel Integration',
            quantity: 1,
            price: '405',
            amount: '405',
        },
        {
            id: 4,
            image : '/image/shirt2.jpg',
            title: 'Backend UI Design',
            returnimage : '/image/watch1.png',
            title2: 'Backend UI Design',
            status: { tooltip: '', color: 'danger' },
            quantity: 1,
            price: '2500',
            amount: '2500',
        },
    ];

    const columns = [
        {
            key: 'id',
            label: 'S.NO',
        },
        {
            key: 'title',
            label: 'ITEMS',
        },
        {
            key: 'title2',
            label: 'RETURN ITEMS',
        },
        {
            key: 'quantity',
            label: 'QTY',
        },
        {
            key: 'price',
            label: 'PRICE',
            class: 'ltr:text-right rtl:text-left',
        },
        {
            key: 'amount',
            label: 'AMOUNT',
            class: 'ltr:text-right rtl:text-left',
        },
    ];

     const [shippmentPopUp, setShippmentPopUp] = useState<any>(false);

     //  transfer otp popup 
    const shippmentPopUpOpen = (note: any = null) => {
        // setIsShowNoteMenu(false);
        // const json = JSON.parse(JSON.stringify(defaultParams));
        // setParams(json);
        // if (note) {
        //     let json1 = JSON.parse(JSON.stringify(note));
        //     setParams(json1);
        // }
        // settransferStdPopUp(false);
        setShippmentPopUp(true);
    };

    return (
        <div>
            <div className="flex items-center lg:justify-end justify-center flex-wrap gap-4 mb-6">
                {/* <button type="button" className="btn btn-info gap-2">
                    <IconSend />
                    Send Invoice
                </button> */}

                <button type="button" className="btn btn-primary gap-2" onClick={() => exportTable()}>
                    <IconPrinter />
                    Print
                </button>

                <button type="button" className="btn btn-success gap-2">
                    <IconDownload />
                    Download
                </button>

                <button onClick={shippmentPopUpOpen} className="btn btn-secondary gap-2">
                    {/* <IconPlus /> */}
                    <Truck />
                    Shippment
                </button>

                {/* <Link to="/apps/invoice/edit" className="btn btn-warning gap-2">
                    <IconEdit />
                    Edit
                </Link> */}
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
                        <div>13 Tetrick Road, Cypress Gardens, Florida, 33884, US</div>
                        <div>vristo@gmail.com</div>
                        <div>+1 (070) 123-4567</div>
                    </div>
                </div>

                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="flex justify-between lg:flex-row flex-col gap-6 flex-wrap">
                    <div className="flex-1">
                        <div className="space-y-1 text-white-dark">
                            <div>Customer Name:</div>
                            <div className="text-black dark:text-white font-semibold">John Doe</div>
                            <div>405 Mulberry Rd. Mc Grady, NC, 28649</div>
                            <div>redq@company.com</div>
                            <div>(128) 666 070</div>
                        </div>
                    </div>
                    <div className="flex justify-between sm:flex-row flex-col gap-6 lg:w-2/3">
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            {/* <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Invoice :</div>
                                <div>#8701</div>
                            </div> */}
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Delivered Date :</div>
                                <div>13 Sep 2022</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Return Requested Date :</div>
                                <div>13 Sep 2022</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Due Date :</div>
                                <div>13 Sep 2022</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Order ID :</div>
                                <div>#OD-85794</div>
                            </div>
                            <div className="flex items-center w-full justify-between">
                                <div className="text-white-dark">Shipment ID :</div>
                                <div>#SHP-8594</div>
                            </div>
                        </div>
                        <div className="xl:1/3 lg:w-2/6 sm:w-1/2">
                            <div className="flex items-center w-full gap-5 mb-2">
                                <div className="text-dark font-bold">Payment Mode:</div>
                                <div className="whitespace-nowrap font-bold">Credit Card</div>
                            </div>
                            <div className="flex items-center w-full gap-5 mb-2">
                                <div className="text-dark font-bold">Payment Status:</div>
                                <div className="whitespace-nowrap text-green-500 font-bold">Success</div>
                            </div>
                            {/* <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Account Number:</div>
                                <div>1234567890</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">SWIFT Code:</div>
                                <div>S58K796</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">IBAN:</div>
                                <div>L5698445485</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Country:</div>
                                <div>United States</div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="table-responsive mt-6">
                    <table className="table-striped">
                        <thead>
                            <tr>
                                {columns.map((column) => {
                                    return (
                                        <th key={column.key} className={column?.class}>
                                            {column.label}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src={item.image} alt={item.title} className='size-12' />
              {item.title}
             </div>
                      </td>
                                        <td>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* <img src={item.returnimage} alt={item.title2} className='size-12' /> */}
              {item.title2}  <span
  className={`text-xs px-2 py-1 rounded-full ${
    item.status?.color === 'danger' ? 'bg-red-100 text-red-600' :
    item.status?.color === 'success' ? 'bg-green-100 text-green-600' :
    'bg-gray-100 text-gray-600'
  }`}
>
  {item.status?.tooltip || 'Not Returned'}
</span>                        
                              
                            
             </div>
                      </td>
                                        <td>{item.quantity}</td>
                                        <td className="ltr:text-right rtl:text-left">₹{item.price}</td>
                                        <td className="ltr:text-right rtl:text-left">₹{item.amount}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 px-4 mt-6">
                    <div></div>
                    <div className="ltr:text-right rtl:text-left space-y-2">
                        <div className="flex items-center">
                            <div className="flex-1">Subtotal</div>
                            <div className="w-[37%]">₹3255</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Tax</div>
                            <div className="w-[37%]">₹700</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Shipping Rate</div>
                            <div className="w-[37%]">₹0</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Discount</div>
                            <div className="w-[37%]">₹10</div>
                        </div>
                        <div className="flex items-center font-semibold text-lg">
                            <div className="flex-1">Grand Total</div>
                            <div className="w-[37%]">₹3945</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='panel mt-4 flex justify-end'>
               <button className='btn btn-success w-44'>Save</button>
            </div>

            {/*transferOtpPopUp popup  */}
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
                                                                                        <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                                                                            {/* {params.id ? 'Edit Note' : 'Add Note'} */}
                                                                                            Shippment Id
                                                                                        </div>
                                                                              
                                                                                        
                                                                                        <div className="p-5">
                                                                                            <form>
                                                                                               
                                                                                            <div>
                                                                                                <input className='form-input' type="text" name="shippmentId" id="_shippmentId" placeholder='shippment Id'/>
                                                                                            </div>
                                                                                                
                                                                                          
                                                          
                                                                                                
                                                                                               
                                                                                                <div className="flex justify-center items-center mt-8">
                                                                                                <button onClick={() => setShippmentPopUp(false)} type="button" className="btn btn-success ltr:ml-4 rtl:mr-4" >
                                                                                                        {/* {params.id ? 'Update Note' : 'Add Note'} */}
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
