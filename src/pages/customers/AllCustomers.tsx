import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect, useMemo } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconPlus from '../../components/Icon/IconPlus';
import IconEye from '../../components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useDeleteCustomerMutation, useGetAllCustomersQuery } from '../../../features/customer/cutomerApi';
import ConfirmDialog from '../../component/ConfirmDailog';
import { toast } from 'react-toastify';

const AllCustomers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('All Customers'));
    }, [dispatch]);

    const { data, isLoading, error } = useGetAllCustomersQuery();
    const customers = data?.customers || []; // safe fallback
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

    const [deleteCustomer, { isLoading: deleting }] = useDeleteCustomerMutation();

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [search, setSearch] = useState('');
    const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'name',
        direction: 'asc',
    });

    // Filter + Sort + Paginate
    const filteredSortedCustomers = useMemo(() => {
        const filtered = customers.filter((customer) => {
            return (
                customer.name?.toLowerCase().includes(search.toLowerCase()) ||
                customer.email?.toLowerCase().includes(search.toLowerCase()) ||
                customer.mobile?.toLowerCase().includes(search.toLowerCase()) ||
                customer.status?.toLowerCase().includes(search.toLowerCase())
            );
        });

        const sorted = sortBy(filtered, sortStatus.columnAccessor);
        return sortStatus.direction === 'desc' ? sorted.reverse() : sorted;
    }, [customers, search, sortStatus]);

    const paginatedRecords = useMemo(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        return filteredSortedCustomers.slice(from, to);
    }, [filteredSortedCustomers, page, pageSize]);

    if (isLoading) return <p>Loading customers...</p>;
    if (error) return <p>Error loading customers</p>;

    //    delete customer
    const handleDelete = (id: string) => {
        setSelectedCustomerId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedCustomerId) {
            try {
               const result = await deleteCustomer(selectedCustomerId).unwrap();
               const message = result.message || 'Customer deleted successfully';
               toast.success(message);
                setConfirmOpen(false);
                setSelectedCustomerId(null);
                // refetch(); // Refresh the customer list
            } catch (err) {
                toast.error('Failed to delete customer');
                console.error('Delete failed', err);
            }
        }
    };

    // DELETE THIS:
    const handleCancelDelete = () => {
        setConfirmOpen(false);
        setSelectedCustomerId(null);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="panel">
                <p className="text-2xl font-bold w-1/3">All Customers</p>
            </div>

            <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
                <div className="invoice-table">
                    <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                        
                        <div className="ltr:ml-auto rtl:mr-auto">
                            <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>

                    <div className="datatables pagination-padding">
                        <DataTable
                            className="whitespace-nowrap table-hover invoice-table"
                            records={paginatedRecords}
                            columns={[
                                {
                                    accessor: 'name',
                                    title: 'Customer Name',
                                    sortable: true,
                                    render: ({ name, id }) => (
                                        <div className="flex items-center font-semibold">
                                            <div className="p-0.5 bg-white-dark/30 rounded-full w-max ltr:mr-2 rtl:ml-2">
                                                <img
                                                    className="h-8 w-8 rounded-full object-cover"
                                                    src={`/assets/images/profile-${id}.jpeg`}
                                                    alt=""
                                                    onError={(e) => (e.currentTarget.src = '/assets/images/default-avatar.png')}
                                                />
                                            </div>
                                            <div>{name}</div>
                                        </div>
                                    ),
                                },
                                {
                                    accessor: 'email',
                                    title: 'Email',
                                    sortable: true,
                                },
                                {
                                    accessor: 'mobile',
                                    title: 'Phone',
                                    sortable: true,
                                },
                                {
                                    accessor: 'status',
                                    title: 'Status',
                                    sortable: true,
                                    render: ({ status }) => <span className={`badge badge-outline-${status === 'Active' ? 'success' : 'danger'}`}>{status}</span>,
                                },
                                {
                                    accessor: 'action',
                                    title: 'Actions',
                                    sortable: false,
                                    render: ({ id }) => (
                                        <div className="flex gap-4 items-center w-max mx-auto">
                                            <Tippy content="View">
                                                <NavLink to={`/customers/customer/${id}`} className="flex hover:text-primary">
                                                    <IconEye />
                                                </NavLink>
                                            </Tippy>
                                            <Tippy content="Delete">
                                                <button type="button" className="flex hover:text-danger" onClick={() => handleDelete(id)}>
                                                    <IconTrashLines />
                                                </button>
                                            </Tippy>
                                        </div>
                                    ),
                                },
                            ]}
                            highlightOnHover
                            totalRecords={filteredSortedCustomers.length}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={setPage}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            sortStatus={sortStatus}
                            onSortStatusChange={setSortStatus}
                            selectedRecords={selectedRecords}
                            onSelectedRecordsChange={setSelectedRecords}
                            paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                        />
                    </div>
                </div>
            </div>
            <ConfirmDialog
                open={confirmOpen}
                title="Delete Customer"
                message="Are you sure you want to delete this customer?"
                confirmText="Yes, Delete"
                cancelText="Cancel"
                onConfirm={confirmDelete}
                onCancel={() => setConfirmOpen(false)}
                loading={deleting}
            />
        </div>
    );
};

export default AllCustomers;
