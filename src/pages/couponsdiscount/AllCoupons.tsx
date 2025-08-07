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
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteCouponsThunk, getAllCouponsThunk, updateStatusToggle } from '../../store/thunks/couponThunk';
import { toast } from 'react-toastify';
import ConfirmDialog from '../../component/ConfirmDailog';

const AllCoupons = () => {
    const dispatch = useAppDispatch();
    const { coupons } = useAppSelector((state: IRootState) => state.coupon);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
    const [loadingDelete, setLoadingDelete] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle('Invoice List'));
        handleAllCoupons();
    }, [dispatch]);

    const handleAllCoupons = async () => {
        try {
            const result = await dispatch(getAllCouponsThunk()).unwrap();
            console.log('Coupons result from unwrap:', result); // ⬅️ Add this

            if (Array.isArray(result) && result.length > 0) {
                toast.success('Fetched coupons successfully!');
            } else {
                toast.info('No coupons found.');
            }
        } catch (error: any) {
            toast.error((error as string) || 'Failed to fetch coupons.');
        }
    };

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    // const [initialRecords, setInitialRecords] = useState(sortBy(items, 'invoice'));
    const [initialRecords, setInitialRecords] = useState<any[]>([]);

    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });

    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        if (coupons && Array.isArray(coupons)) {
            const mapped = coupons.map((c) => ({
                id: c.id,
                couponCode: c.couponCode,
                description: c.description,
                discountValue: `${c.discountValue}${c.discountType === 'percentage' ? '%' : '₹'}`,
                minOrderValue: c.minOrderValue,
                startDate: new Date(c.startDate).toLocaleDateString(),
                endDate: new Date(c.endDate).toLocaleDateString(),
                usageLimit: `${c.usedCount}/${c.usageLimit}`,
                status: {
                    tooltip: c.isActive ? 'Active' : 'Inactive',
                    color: c.isActive ? 'success' : 'danger',
                },
            }));

            setItems(mapped);
            setInitialRecords(mapped);
        }
    }, [coupons]);

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
                    item.couponCode?.toLowerCase().includes(search.toLowerCase()) ||
                    item.description?.toLowerCase().includes(search.toLowerCase()) ||
                    item.discountValue?.toLowerCase().includes(search.toLowerCase()) ||
                    item.status?.tooltip?.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search, items]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);

    // delete confirmation dialog
    const handleDeleteClick = (id: string) => {
        setSelectedCouponId(id);
        setShowConfirm(true);
    };

    // delete coupon api call

    const confirmDelete = async () => {
        if (!selectedCouponId) return;
        setLoadingDelete(true);
        try {
            await dispatch(deleteCouponsThunk(selectedCouponId)).unwrap();
            dispatch(getAllCouponsThunk());
        } catch (error: any) {
            toast.error(error || 'Failed to delete coupon.');
        } finally {
            setLoadingDelete(false);
            setShowConfirm(false);
            setSelectedCouponId(null);
        }
    };

    // update status

    const handleToggleStatus = async (id: string) => {
        try {
            await dispatch(updateStatusToggle(id)).unwrap(); // 🔁 Add this thunk
            toast.success('Coupon status updated');
            dispatch(getAllCouponsThunk()); // refresh list
        } catch (error) {
            toast.error('Failed to update coupon status');
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="panel">
                <p className="text-2xl font-bold w-1/3 mb-8">All Coupons</p>
                {/* <div className='flex justify-between items-center'>
                <div className='flex w-1/4 items-center'>
                    <label htmlFor="FilterByMethod" className='w-1/3'>Filter by Type :</label>
                <select name="Method" id="_Method" className='form-select flex-1'>
                    <option value="Selcet Type">Selcet Type</option>
                    <option value="Percentage">Percentage</option>
                    <option value="Fixed">Fixed</option>
                    <option value="Free Shipping">Free Shipping</option>
                </select>
                </div>
                <div className='flex w-1/4 items-center'>
                    <label htmlFor="FilterByStatus" className='w-1/3'>Filter by Status :</label>
                <select name="Status" id="_Status" className='form-select flex-1'>
                    <option value="Select Status">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Sheduled">Sheduled</option>
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
                            {/* <button type="button" className="btn btn-danger gap-2" >
                            <IconTrashLines />
                            Delete
                        </button> */}
                            <Link to="/couponsdiscount/create-coupons" className="btn btn-primary gap-2">
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
                                {
                                    accessor: 'couponCode',
                                    sortable: true,
                                },
                                {
                                    accessor: 'description',
                                    sortable: true,
                                },
                                // {
                                //     accessor: 'type',
                                //     sortable: true,
                                // },
                                {
                                    accessor: 'discountValue',
                                    sortable: true,
                                },
                                {
                                    accessor: 'minOrderValue',
                                    sortable: true,
                                },
                                {
                                    accessor: 'startDate',
                                    sortable: true,
                                },
                                {
                                    accessor: 'endDate',
                                    sortable: true,
                                },
                                {
                                    accessor: 'usageLimit',
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
                                            <Tippy content="Activate/Deactivate">
                                                <label className="w-12 h-6 relative">
                                                    <input onChange={() => handleToggleStatus(id)} type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />

                                                    <span
                                                        className={`outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4
    before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300`}
                                                    ></span>
                                                </label>
                                            </Tippy>
                                            <Tippy content="Edit">
                                                <NavLink to={`/couponsdiscount/create-coupons/${id}`} className="flex hover:text-info">
                                                    <IconEdit className="w-4.5 h-4.5" />
                                                </NavLink>
                                            </Tippy>

                                            {/* <NavLink to="" className="flex"> */}
                                            <Tippy content="Delete">
                                                <button type="button" className="flex hover:text-danger" onClick={() => handleDeleteClick(id)}>
                                                    <IconTrashLines />
                                                </button>
                                            </Tippy>
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

            {/* delete coupon popup */}

            <ConfirmDialog
                open={showConfirm}
                title="Delete Coupon"
                message="Are you sure you want to delete this coupon? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                loading={loadingDelete}
                onConfirm={confirmDelete}
                onCancel={() => setShowConfirm(false)}
            />
        </div>
    );
};

export default AllCoupons;
