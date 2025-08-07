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

const PaymentMethod = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice List'));
    });
    const [items, setItems] = useState([
        {
            id: 1,
            invoice: '081451',
            name: 'Laurie Fox',
           
            PaymentMethod: 'Stripe',
            Date: '17/04/2025',
             amount: '2275.45',
            status: { tooltip: 'Active', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 2,
            invoice: '081452',
            name: 'Alexander Gray',
            
            PaymentMethod: 'Stripe',
            Date: '17/04/2025',
            amount: '1044.00',
            status: { tooltip: 'Desable', color: 'danger' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 3,
            invoice: '081681',
            name: 'James Taylor',
           
            PaymentMethod: 'Stripe',
            Date: '17/04/2025',
             amount: '20.00',
            status: { tooltip: 'Desable', color: 'danger' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 4,
            invoice: '082693',
            name: 'Grace Roberts',
           
            PaymentMethod: 'Paypal',
            Date: '17/04/2025',
             amount: '344.00',
            status: { tooltip: 'Active', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 5,
            invoice: '084743',
            name: 'Donna Rogers',
           
            PaymentMethod: 'Paypal',
            Date: '17/04/2025',
             amount: '405.15',
            status: { tooltip: 'Active', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 6,
            invoice: '086643',
            name: 'Amy Diaz',
            
            PaymentMethod: 'Paypal',
            Date: '17/04/2025',
             amount: '100.00',
            status: { tooltip: 'Active', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 7,
            invoice: '086773',
            name: 'Nia Hillyer',
            
            PaymentMethod: 'COD',
            Date: '17/04/2025',
             amount: '59.21',
            status: { tooltip: 'Desable', color: 'danger' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 8,
            invoice: '087916',
            name: 'Mary McDonald',
            
            PaymentMethod: 'COD',
            Date: '17/04/2025',
             amount: '79.00',
            status: { tooltip: 'Desable', color: 'danger' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 9,
            invoice: '089472',
            name: 'Andy King',
            
            PaymentMethod: 'COD',
            Date: '17/04/2025',
             amount: '149.00',
            status: { tooltip: 'Active', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 10,
            invoice: '091768',
            name: 'Vincent Carpenter',
            
            PaymentMethod: 'COD',
            Date: '17/04/2025',
             amount: '400',
            status: { tooltip: 'Desable', color: 'danger' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 11,
            invoice: '095841',
            name: 'Kelly Young',            
            PaymentMethod: 'COD',
            Date: '17/04/2025',
             amount: '49.00',
            status: { tooltip: 'Desable', color: 'danger' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 12,
            invoice: '098424',
            name: 'Alma Clarke',
            
            PaymentMethod: 'COD',
            Date: '17/04/2025',
             amount: '234.40',
            status: { tooltip: 'Active', color: 'success' },
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
                    item.amount.toLowerCase().includes(search.toLowerCase()) ||
                    item.PaymentMethod.toLowerCase().includes(search.toLowerCase()) ||
                    item. amount.toLowerCase().includes(search.toLowerCase()) ||
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

    return (
        <div className='flex flex-col gap-4'>
            <div className='panel'>
              <p className='text-2xl font-bold w-1/3'>Payment Methods</p>
              {/* <div className='flex justify-between items-center'>
                <div className='flex w-1/4 items-center'>
                    <label htmlFor="FilterByMethod" className='w-1/3'>Filter by Method :</label>
                <select name="Method" id="_Method" className='form-select flex-1'>
                    <option value="Selcet Method">Selcet Method</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="UPi">UPi</option>
                    <option value="COD">COD</option>
                </select>
                </div>
                <div className='flex w-1/4 items-center'>
                    <label htmlFor="FilterByStatus" className='w-1/3'>Filter by Status :</label>
                <select name="Status" id="_Status" className='form-select flex-1'>
                    <option value="Select Status">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Desable">Desable</option>
                </select>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
  <label htmlFor="dateFrom" className="w-full sm:w-auto font-medium">
    Filter by date:
  </label>
  <div className="flex gap-4 items-center w-full sm:w-auto">
    <input
      type="date"
      id="dateFrom"
      name="dateFrom"
      className="form-input border rounded px-3 py-2"
    />
    <span>to</span>
    <input
      type="date"
      id="dateTo"
      name="dateTo"
      className="form-input border rounded px-3 py-2"
    />
  </div>
</div>

              </div> */}
            </div>
            <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                            <IconTrashLines />
                            Delete
                        </button>
                        <Link to="/products/addnew" className="btn btn-primary gap-2">
                            <IconPlus />
                            Add New
                        </Link>
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
                            // {
                            //     accessor: 'Order Id',
                            //     sortable: true,
                            //     render: ({ invoice }) => (
                            //         <NavLink to="/apps/invoice/preview">
                            //             <div className="text-primary underline hover:no-underline font-semibold">{`#${invoice}`}</div>
                            //         </NavLink>
                            //     ),
                            // },
                            // {
                            //     accessor: 'CustomerName',
                            //     sortable: true,
                            //     render: ({ name, id }) => (
                            //         <div className="flex items-center font-semibold">
                            //             <div className="p-0.5 bg-white-dark/30 rounded-full w-max ltr:mr-2 rtl:ml-2">
                            //                 <img className="h-8 w-8 rounded-full object-cover" src={`/assets/images/profile-${id}.jpeg`} alt="" />
                            //             </div>
                            //             <div>{name}</div>
                            //         </div>
                            //     ),
                            // },
                            // {
                            //     accessor: 'amount',
                            //     sortable: true,
                            // },
                            {
                                accessor: 'PaymentMethod',
                                sortable: true,
                            },
                            {
                                accessor: 'Date',
                                sortable: true,
                            },
                            // {
                            //     accessor: ' Amount',
                            //     sortable: true,
                            //     titleClassName: 'text-right',
                            //     render: ({  amount, id }) => <div className="text-right font-semibold">{`₹${ amount}`}</div>,
                            // },
                            {
                                accessor: 'status',
                                sortable: true,
                                render: ({ status }) => <span className={`badge badge-outline-${status.color} `}>{status.tooltip}</span>,
                            },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                textAlignment: 'center',
                                render: ({ id }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                       <Tippy content="Edit">
                                       <NavLink to="/class/addclass" className="flex hover:text-info">
                                            <IconEdit className="w-4.5 h-4.5" />
                                        </NavLink>
                                       </Tippy>
                                     <Tippy content="Enable/Desable">
                                     <label className="w-12 h-6 relative">
    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
    <span className="outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
</label>
                                     </Tippy>
                                        {/* <NavLink to="/apps/invoice/preview" className="flex hover:text-primary">
                                            <IconEye />
                                        </NavLink> */}
                                        {/* <NavLink to="" className="flex"> */}
                                        {/* <Tippy content="Delete">
                                        <button type="button" className="flex hover:text-danger" onClick={(e) => deleteRow(id)}>
                                            <IconTrashLines />
                                        </button>
                                        </Tippy> */}
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
        </div>
    );
};

export default PaymentMethod;
