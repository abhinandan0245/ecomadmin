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

const StatusOfTicket = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice List'));
    });
    const [items, setItems] = useState([
        {
            id: 1,
            invoice: '081451',
            name: 'Laurie Fox',
            Subject: 'Laurie Fox',
            DateTime: 'Laurie Fox',
            ClassToAssignSubject: 'lauriefox@company.com',
            CodeOfSubject: '15 Dec 2020',
            amount: '2275.45',
            status: { tooltip: 'Requested', color: 'warning' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 2,
            invoice: '081452',
            name: 'Alexander Gray',
             Subject: 'Laurie Fox',
            DateTime: 'Laurie Fox',
            ClassToAssignSubject: 'alexGray3188@gmail.com',
            CodeOfSubject: '20 Dec 2020',
            amount: '1044.00',
            status: { tooltip: 'In Progress', color: 'primary' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 3,
            invoice: '081681',
            name: 'James Taylor',
             Subject: 'Laurie Fox',
            DateTime: 'Laurie Fox',
            ClassToAssignSubject: 'jamestaylor468@gmail.com',
            CodeOfSubject: '27 Dec 2020',
            amount: '20.00',
            status: { tooltip: 'Closed', color: 'danger' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 4,
            invoice: '082693',
            name: 'Grace Roberts',
             Subject: 'Laurie Fox',
            DateTime: 'Laurie Fox',
            ClassToAssignSubject: 'graceRoberts@company.com',
            CodeOfSubject: '31 Dec 2020',
            amount: '344.00',
            status: { tooltip: 'Replyied', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 5,
            invoice: '084743',
            name: 'Donna Rogers',
             Subject: 'Laurie Fox',
            DateTime: 'Laurie Fox',
            ClassToAssignSubject: 'donnaRogers@hotmail.com',
            CodeOfSubject: '03 Jan 2021',
            amount: '405.15',
            status: { tooltip: 'Requested', color: 'warning' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 6,
            invoice: '086643',
            name: 'Amy Diaz',
             Subject: 'Laurie Fox',
            DateTime: 'Laurie Fox',
            ClassToAssignSubject: 'amy968@gmail.com',
            CodeOfSubject: '14 Jan 2020',
            amount: '100.00',
            status: { tooltip: 'In Progres', color: 'primary' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 7,
            invoice: '086773',
            name: 'Nia Hillyer',
             Subject: 'Laurie Fox',
            DateTime: 'Laurie Fox',
            ClassToAssignSubject: 'niahillyer666@comapny.com',
            CodeOfSubject: '20 Jan 2021',
            amount: '59.21',
            status: { tooltip: 'Closed', color: 'danger' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 8,
            invoice: '087916',
            name: 'Mary McDonald',
             Subject: 'Laurie Fox',
          
             DateTime: 'Laurie Fox',
            ClassToAssignSubject: 'maryDonald007@gamil.com',
            CodeOfSubject: '25 Jan 2021',
            amount: '79.00',
            status: { tooltip: 'closed', color: 'danger' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 9,
            invoice: '089472',
            name: 'Andy King',
            Subject: 'Laurie Fox',
           
            DateTime: 'Laurie Fox',
            ClassToAssignSubject: 'kingandy07@company.com',
            CodeOfSubject: '28 Jan 2021',
            amount: '149.00',
            status: { tooltip: 'replyied', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 10,
            invoice: '091768',
            name: 'Vincent Carpenter',
             Subject: 'Laurie Fox',
            DateTime: 'Laurie Fox',
            ClassToAssignSubject: 'vincentcarpenter@gmail.com',
            CodeOfSubject: '30 Jan 2021',
            amount: '400',
            status: { tooltip: 'Replyied', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 11,
            invoice: '095841',
            name: 'Kelly Young',
             Subject: 'Laurie Fox',
            DateTime: 'Laurie Fox',
            ClassToAssignSubject: 'youngkelly@hotmail.com',
            CodeOfSubject: '06 Feb 2021',
            amount: '49.00',
            status: { tooltip: 'closed', color: 'danger' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 12,
            invoice: '098424',
            name: 'Alma Clarke',
             Subject: 'Laurie Fox',
            DateTime: 'Laurie Fox',
            ClassToAssignSubject: 'alma.clarke@gmail.com',
            CodeOfSubject: '10 Feb 2021',
            amount: '234.40',
            status: { tooltip: 'In Progress', color: 'primary' },
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
                    item.ClassToAssignSubject.toLowerCase().includes(search.toLowerCase()) ||
                    item.CodeOfSubject.toLowerCase().includes(search.toLowerCase()) ||
                    item.amount.toLowerCase().includes(search.toLowerCase()) ||
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
        <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                            <IconTrashLines />
                            Delete
                        </button>
                        <Link to="/subject/addsubject" className="btn btn-primary gap-2">
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
                            {
                                accessor: 'TicketId',
                                sortable: true,
                                render: ({ invoice }) => (
                                    <NavLink to="/apps/invoice/preview">
                                        <div className="text-primary underline hover:no-underline font-semibold">{`#${invoice}`}</div>
                                    </NavLink>
                                ),
                            },
                            // {
                            //     accessor: 'name of subject',
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
                            {
                                accessor: 'Subject',
                                sortable: true,
                            },
                            {
                                accessor: 'DateTime',
                                sortable: true,
                            },
                            // {
                            //     accessor: 'CodeOfSubject',
                            //     sortable: true,
                            // },
                            // {
                            //     accessor: 'section',
                            //     sortable: true,
                            //     titleClassName: 'text-right',
                            //     render: ({ amount, id }) => <div className="text-right font-semibold">{`$${amount}`}</div>,
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
                                        {/* <Tippy content="Edit">
                                        <NavLink to="/subject/addsubject" className="flex hover:text-info">
                                            <IconEdit className="w-4.5 h-4.5" />
                                        </NavLink>
                                        </Tippy> */}
                                        <NavLink to="/support/manage-status" className="flex hover:text-primary">
                                            <button type='button' className='btn btn-sm btn-success'>Manage</button>
                                        </NavLink>
                                        {/* <Tippy content="Delete">
                                        <NavLink to="" className="flex">
                                        <button type="button" className="flex hover:text-danger" onClick={(e) => deleteRow(id)}>
                                            <IconTrashLines />
                                        </button>
                                        </NavLink>
                                        </Tippy> */}
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
    );
};

export default StatusOfTicket;
