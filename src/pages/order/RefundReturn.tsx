import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconPlus from '../../components/Icon/IconPlus';
import IconEdit from '../../components/Icon/IconEdit';
import IconEye from '../../components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import ExportOrdersButton from '../../component/order/allorders/ExportOrdersButton';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment,useRef } from 'react';
import IconX from '../../components/Icon/IconX';

interface Props {
  orders: any[];
}


const orders = [
    { id: "ORD001", customer: "John Doe", date: "2025-04-10", status: "Delivered",  total: 149.99 },
    { id: "ORD002", customer: "Alice Smith", date: "2025-04-11", status: "Pending", total: 89.50 },
  ];
const RefundReturn = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice List'));
    });
    const [items, setItems] = useState([
        {
            id: 1,
            invoice: '081451',
            name: 'Laurie Fox',
            product: 'men Shirt',
            Reason: 'Size issue',
            DeliveredDate: '10/04/2025',
            RequestedDate: '10/04/2025',
            DueDate: '10/04/2025',
            paymenytMethod: 'Debit Card',
            date: 'A',
            total: '15 Dec 2020',
            payment: '15 Dec 2020',
            amount: '2275.45',
            status: { tooltip: 'Successfully Recieved', color: 'success' },
            // status: { tooltip: 'Delivered', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 2,
            invoice: '081452',
            name: 'Alexander Gray',
            product: 'men Shirt',
            Reason: 'Size issue',
            DeliveredDate: '10/04/2025',
            RequestedDate: '10/04/2025',
            DueDate: '10/04/2025',
            paymenytMethod: 'Debit Card',
            date: 'alexGray3188@gmail.com',
            total: '20 Dec 2020',
            payment: '15 Dec 2020',
            amount: '1044.00',
            status: { tooltip: 'Successfully Recieved', color: 'success' },
            orderstatus: { tooltip: 'Delivered', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 3,
            invoice: '081681',
            name: 'James Taylor',
            product: 'men Shirt',
            Reason: 'Size issue',
            DeliveredDate: '10/04/2025',
            RequestedDate: '10/04/2025',
            DueDate: '10/04/2025',
            paymenytMethod: 'Debit Card',
            date: 'jamestaylor468@gmail.com',
            total: '27 Dec 2020',
            payment: '15 Dec 2020',
            amount: '20.00',
            status: { tooltip: 'Not Recieved', color: 'danger' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 4,
            invoice: '082693',
            name: 'Grace Roberts',
            product: 'men Shirt',
            Reason: 'Size issue',
            DeliveredDate: '10/04/2025',
            RequestedDate: '10/04/2025',
            DueDate: '10/04/2025',
            paymenytMethod: 'Debit Card',
            date: 'graceRoberts@company.com',
            total: '31 Dec 2020',
            payment: '15 Dec 2020',
            amount: '344.00',
            status: { tooltip: 'Successfully Recieved', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 5,
            invoice: '084743',
            name: 'Donna Rogers',
            product: 'men Shirt',
            Reason: 'Size issue',
            DeliveredDate: '10/04/2025',
            RequestedDate: '10/04/2025',
            DueDate: '10/04/2025',
            paymenytMethod: 'Debit Card',
            date: 'donnaRogers@hotmail.com',
            total: '03 Jan 2021',
            payment: '15 Dec 2020',
            amount: '405.15',
            status: { tooltip: 'Successfully Recieved', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 6,
            invoice: '086643',
            name: 'Amy Diaz',
            product: 'men Shirt',
            Reason: 'Size issue',
            DeliveredDate: '10/04/2025',
            RequestedDate: '10/04/2025',
            DueDate: '10/04/2025',
            paymenytMethod: 'Debit Card',
            date: 'amy968@gmail.com',
            total: '14 Jan 2020',
            payment: '15 Dec 2020',
            amount: '100.00',
            status: { tooltip: 'Successfully Recieved', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 7,
            invoice: '086773',
            name: 'Nia Hillyer',
            product: 'men Shirt',
            Reason: 'Size issue',
            DeliveredDate: '10/04/2025',
            RequestedDate: '10/04/2025',
            DueDate: '10/04/2025',
            paymenytMethod: 'Debit Card',
            date: 'niahillyer666@comapny.com',
            total: '20 Jan 2021',
            payment: '15 Dec 2020',
            amount: '59.21',
            status: { tooltip: 'Not Received', color: 'danger' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 8,
            invoice: '087916',
            name: 'Mary McDonald',
            product: 'men Shirt',
            Reason: 'Size issue',
            DeliveredDate: '10/04/2025',
            RequestedDate: '10/04/2025',
            DueDate: '10/04/2025',
            paymenytMethod: 'Debit Card',
            date: 'maryDonald007@gamil.com',
            total: '25 Jan 2021',
            payment: '15 Dec 2020',
            amount: '79.00',
            status: { tooltip: 'in Process', color: 'primary' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 9,
            invoice: '089472',
            name: 'Andy King',
            product: 'men Shirt',
            Reason: 'Size issue',
            DeliveredDate: '10/04/2025',
            RequestedDate: '10/04/2025',
            DueDate: '10/04/2025',
            paymenytMethod: 'Debit Card',
            date: 'kingandy07@company.com',
            total: '28 Jan 2021',
            payment: '15 Dec 2020',
            amount: '149.00',
            status: { tooltip: 'In Process', color: 'primary' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 10,
            invoice: '091768',
            name: 'Vincent Carpenter',
            product: 'men Shirt',
            Reason: 'Size issue',
            DeliveredDate: '10/04/2025',
            RequestedDate: '10/04/2025',
            DueDate: '10/04/2025',
            paymenytMethod: 'Debit Card',
            date: 'vincentcarpenter@gmail.com',
            total: '30 Jan 2021',
            payment: '15 Dec 2020',
            amount: '400',
            status: { tooltip: 'In Process', color: 'primary' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 11,
            invoice: '095841',
            name: 'Kelly Young',
            product: 'men Shirt',
            Reason: 'Size issue',
            DeliveredDate: '10/04/2025',
            RequestedDate: '10/04/2025',
            DueDate: '10/04/2025',
            paymenytMethod: 'Debit Card',
            date: 'youngkelly@hotmail.com',
            total: '06 Feb 2021',
            payment: '15 Dec 2020',
            amount: '49.00',
            status: { tooltip: 'In Process', color: 'primary' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 12,
            invoice: '098424',
            name: 'Alma Clarke',
            product: 'men Shirt',
            Reason: 'Size issue',
            DeliveredDate: '10/04/2025',
            RequestedDate: '10/04/2025',
            DueDate: '10/04/2025',
            paymenytMethod: 'Debit Card',
            date: 'alma.clarke@gmail.com',
            total: '10 Feb 2021',
            payment: '15 Dec 2020',
            amount: '234.40',
            status: { tooltip: 'Successfully Recieved', color: 'success' },
            profile: 'profile-1.jpeg',
        },
    ]);

    const deleteRow = (id: any = null) => {
        if (window.confirm('Are you sure want to delete selected row ?')) {
            if (id) {
                setRecords(items.filter((user) => user.id !== id));
                setInitialRecords(items.filter((user) => user.id !== id));
                setItems(items.filter((user) => user.id !== id));
                setSearch('');
                setSelectedRecords([]);
            } else {
                let selectedRows = selectedRecords || [];
                const ids = selectedRows.map((d: any) => {
                    return d.id;
                });
                const result = items.filter((d) => !ids.includes(d.id as never));
                setRecords(result);
                setInitialRecords(result);
                setItems(result);
                setSearch('');
                setSelectedRecords([]);
                setPage(1);
            }
        }
    };

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'invoice'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return items.filter((item) => {
                return (
                    item.invoice.toLowerCase().includes(search.toLowerCase()) ||
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.date.toLowerCase().includes(search.toLowerCase()) ||
                    item.total.toLowerCase().includes(search.toLowerCase()) ||
                    item.amount.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.tooltip.toLowerCase().includes(search.toLowerCase())||
                    // item.status2.tooltip.toLowerCase().includes(search.toLowerCase())
                    item.status.tooltip.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);

    // date range 
const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
const [date3, setDate3] = useState<any>('2022-07-05 to 2022-07-10');

const [rejectReturnPopUp, setRejectReturnPopUp] = useState<any>(false);
const [approveReturnPopUp, setApproveReturnPopUp] = useState<any>(false);

 //  reject return popup 
 const rejectReturnPopUpOpen = (note: any = null) => {
    // setIsShowNoteMenu(false);
    // const json = JSON.parse(JSON.stringify(defaultParams));
    // setParams(json);
    // if (note) {
    //     let json1 = JSON.parse(JSON.stringify(note));
    //     setParams(json1);
    // }
    // settransferStdPopUp(false);
    setRejectReturnPopUp(true);
};
 //  approve return popup 
 const approveReturnPopUpOpen = (note: any = null) => {
    // setIsShowNoteMenu(false);
    // const json = JSON.parse(JSON.stringify(defaultParams));
    // setParams(json);
    // if (note) {
    //     let json1 = JSON.parse(JSON.stringify(note));
    //     setParams(json1);
    // }
    // settransferStdPopUp(false);
    setApproveReturnPopUp(true);
};

    return (
        <div className='flex flex-col gap-4'>
            <div className='panel'>
              <p className='text-2xl font-bold w-1/3 mb-8'>Refund & Return</p>
              <div className='flex justify-between gap-5 items-center'>
                <div className='flex w-1/2 items-center'>
                    <label htmlFor="Filter" className='w-1/6'>Order Status :</label>
                <select name="payment" id="_payment" className='form-select flex-1'>
                    <option value="payment"></option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Deliverd">Deliverd</option>
                    <option value="Cancel">Cancel</option>
                </select>
                </div>
                <div className='flex justify-center items-center gap-4 flex-1'>
                    <label htmlFor="daterange" className='w-1/5'>Date Range :</label>
                    
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
                        {/* <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                            <IconTrashLines />
                            Delete
                        </button>
                        <Link to="/products/addnew" className="btn btn-primary gap-2">
                            <IconPlus />
                            Add New
                        </Link> */}
                      <ExportOrdersButton orders={orders as any[]} />
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
                                accessor: 'Order Id',
                                sortable: true,
                                render: ({ invoice }) => (
                                    <NavLink to="/apps/invoice/preview">
                                        <div className="text-primary underline hover:no-underline font-semibold">{`#${invoice}`}</div>
                                    </NavLink>
                                ),
                            },
                            {
                                accessor: 'customer',
                                sortable: true,
                                render: ({ name, id }) => (
                                    <div className="flex items-center font-semibold">
                                        {/* <div className="p-0.5 bg-white-dark/30 rounded-full w-max ltr:mr-2 rtl:ml-2">
                                            <img className="h-8 w-8 rounded-full object-cover" src={`/assets/images/profile-${id}.jpeg`} alt="" />
                                        </div> */}
                                        <div>{name}</div>
                                    </div>
                                ),
                            },
                            {
                                accessor: 'product',
                                sortable: true,
                            },
                            {
                                accessor: 'Reason',
                                sortable: true,
                            },
                            {
                                accessor: 'DeliveredDate',
                                sortable: true,
                            },
                            {
                                accessor: 'RequestedDate',
                                sortable: true,
                            },
                            {
                                accessor: 'DueDate',
                                sortable: true,
                            },
                            // {
                            //     accessor: 'paymenytMethod',
                            //     sortable: true,
                            // },
                            
                            // {
                            //     accessor: 'OrderAmount',
                            //     sortable: true,
                            //     titleClassName: 'text-right',
                            //     render: ({ amount, id }) => <div className="text-right font-semibold">{`₹ ${amount}`}</div>,
                            // },
                            {
                                accessor: 'Status',
                                sortable: true,
                                render: ({ status }) => <span className={`badge badge-outline-${status.color} `}>{status.tooltip}</span>,
                            },
                            // {
                            //     accessor: 'Order Status',
                            //     sortable: true,
                            //     render: ({ status }) => <span className={`badge badge-outline-${status.color} `}>{status.tooltip}</span>,
                            // },
                            // {
                            //     accessor: 'total',
                            //     sortable: true,
                            // },
                            // {
                            //     accessor: 'payment',
                            //     sortable: true,
                            // },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                textAlignment: 'center',
                                render: ({ id }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                       {/* <Tippy content="Edit"> */}
                                       {/* <NavLink to="/class/addclass" className="flex hover:text-info">
                                            <IconEdit className="w-4.5 h-4.5" />
                                            <button className='btn btn-sm btn-primary'>Mark as Shipped/Deliverd</button>
                                        </NavLink> */}
                                       {/* </Tippy> */}
                                        <NavLink to="/order/return-view" className="flex hover:text-primary">
                                            {/* <IconEye /> */}
                                            <button className='btn btn-sm btn-primary'>View</button>
                                        </NavLink>
                                        {/* <NavLink to="/order/order-details" className="flex hover:text-primary"> */}
                                            {/* <IconEye /> */}
                                            <button onClick={approveReturnPopUpOpen} className='btn btn-sm btn-success'>Approve Return</button>
                                        {/* </NavLink> */}
                                        {/* <NavLink to="" className="flex"> */}
                                        {/* <Tippy content="Delete"> */}
                                        {/* <button type="button" className="flex hover:text-danger" onClick={(e) => deleteRow(id)}>
                                            <IconTrashLines />
                                            <button className='btn btn-sm btn-danger'>Reject Return</button>
                                        </button> */}
                                        <button type="button" className="flex hover:text-danger" onClick={rejectReturnPopUpOpen}>
                                            {/* <IconTrashLines /> */}
                                            <button className='btn btn-sm btn-danger'>Reject Return</button>
                                        </button>
                                        {/* </Tippy> */}
                                        {/* </NavLink> */}
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

         {/*reject return popup  */}
         <Transition appear show={rejectReturnPopUp} as={Fragment}>
                                                                    <Dialog as="div" open={rejectReturnPopUp} onClose={() => setRejectReturnPopUp(false)} className="relative z-[51]">
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
                                                                                            onClick={() => setRejectReturnPopUp(false)}
                                                                                            className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                                                                        >
                                                                                            <IconX />
                                                                                        </button>
                                                                                        <div className="text-lg font-medium bg-[#fbfbfb] text-center dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                                                                            {/* {params.id ? 'Edit Note' : 'Add Note'} */}
                                                                                           Are You Sure Reject Return ?
                                                                                        </div>
                                                                              
                                                                                        
                                                                                        <div className="p-5">
                                                                                            <form>
                                                                                               
                                                                                            <div className='flex flex-col gap-0'>
                                                                                                <label htmlFor="Reason">Reason</label>
                                                                                                <input className='form-input' type="text" name="shippmentId" id="_shippmentId" placeholder='Reason'/>
                                                                                            </div>
                                                                                                
                                                                                          
                                                          
                                                                                                
                                                                                               
                                                                                                <div className="flex justify-center items-center mt-8">
                                                                                                <button onClick={() => setRejectReturnPopUp(false)} type="button" className="btn btn-success ltr:ml-4 rtl:mr-4" >
                                                                                                        {/* {params.id ? 'Update Note' : 'Add Note'} */}
                                                                                                       Yes
                                                                                                    </button>
                                                                                                  
                                                                                                    <button type="button" className="btn btn-outline-danger gap-2 ltr:ml-4 rtl:mr-4" onClick={() => setRejectReturnPopUp(false)}>
                                                                                                        No
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
         {/*approve return popup  */}
         <Transition appear show={approveReturnPopUp} as={Fragment}>
                                                                    <Dialog as="div" open={approveReturnPopUp} onClose={() => setApproveReturnPopUp(false)} className="relative z-[51]">
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
                                                                                            onClick={() => setApproveReturnPopUp(false)}
                                                                                            className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                                                                        >
                                                                                            <IconX />
                                                                                        </button>
                                                                                        <div className="text-lg font-medium bg-[#fbfbfb] text-center dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                                                                            {/* {params.id ? 'Edit Note' : 'Add Note'} */}
                                                                                           Are You Sure Approve Return ?
                                                                                        </div>
                                                                              
                                                                                        
                                                                                        <div className="p-5">
                                                                                            <form>
                                                                                               
                                                                                            {/* <div className='flex flex-col gap-0'>
                                                                                                <label htmlFor="Reason">Reason</label>
                                                                                                <input className='form-input' type="text" name="shippmentId" id="_shippmentId" placeholder='Reason'/>
                                                                                            </div> */}
                                                                                                
                                                                                          
                                                          
                                                                                                
                                                                                               
                                                                                                <div className="flex justify-center items-center mt-8">
                                                                                                <button onClick={() => setApproveReturnPopUp(false)} type="button" className="btn btn-success ltr:ml-4 rtl:mr-4" >
                                                                                                        {/* {params.id ? 'Update Note' : 'Add Note'} */}
                                                                                                       Yes
                                                                                                    </button>
                                                                                                  
                                                                                                    <button type="button" className="btn btn-outline-danger gap-2 ltr:ml-4 rtl:mr-4" onClick={() => setApproveReturnPopUp(false)}>
                                                                                                        No
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

export default RefundReturn;
