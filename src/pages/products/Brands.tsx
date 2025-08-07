import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect, useMemo } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/slices/themeConfigSlice'; // or brandThunk if separated
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconPlus from '../../components/Icon/IconPlus';
import IconEdit from '../../components/Icon/IconEdit';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { deleteBrandThunk, getAllBrandsThunk } from '../../store/thunks/productThunk';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toast } from 'react-toastify';
import ConfirmDialog from '../../component/ConfirmDailog';

const PAGE_SIZES = [10, 20, 30, 50, 100];

const Brands = () => {
    const dispatch = useAppDispatch();
    const { brands, loading, error } = useAppSelector((state: IRootState) => state.brand);
    const [deleteBrandPop, setDeleteBrandPop] = useState<any>(false);
    const [brandToDeleteId, setBrandToDeleteId] = useState<{ id: string; name: string } | null>(null);

    // Fetch brands on mount
    useEffect(() => {
        dispatch(setPageTitle('Brands'));
        haddleFetchBrands();
    }, [dispatch]);

    const haddleFetchBrands = async () => {
        try {
            const result = await dispatch(getAllBrandsThunk()).unwrap();
            // If result is an array
        if (Array.isArray(result) && result.length > 0) {
            toast.success('Fetched brands successfully!');
        } else {
            toast.info('No brands found.');
        }
        } catch (error: any) {
            toast.error(error.message || error || 'Failed to fetch Brands');
        }
    };

    // Table state
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'name',
        direction: 'asc',
    });
    const [selectedRecords, setSelectedRecords] = useState<any[]>([]);

    // Filter, sort, and paginate brands
    const filteredBrands = useMemo(() => {
        return brands.filter((brand) => (brand.name || '').toLowerCase().includes(search.toLowerCase()) || (brand.description || '').toLowerCase().includes(search.toLowerCase()));
    }, [brands, search]);

    const sortedBrands = useMemo(() => {
        const sorted = sortBy(filteredBrands, sortStatus.columnAccessor);
        return sortStatus.direction === 'desc' ? sorted.reverse() : sorted;
    }, [filteredBrands, sortStatus]);

    const paginatedBrands = useMemo(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        return sortedBrands.slice(from, to);
    }, [sortedBrands, page, pageSize]);

    //  delete product api
    const handleDeleteBrand = async (id: string) => {
        try {
            const result = await dispatch(deleteBrandThunk(id)).unwrap();
            // haddleFetchBrands();
            toast.success(result?.message || 'Product Delete Successfully');
            setDeleteBrandPop(false); // 👈 Close modal after delete
            setBrandToDeleteId(null); // 👈 Reset ID
        } catch (err) {
            console.log(err);
            toast.error((err as string) || 'Failed to Delete Product');
        }
    };

    //  delete category popup
    const handledeleteBrandPopOpen = (id: string, name: string) => {
        setBrandToDeleteId({ id, name }); // 👈 Set selected category id
        setDeleteBrandPop(true);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="panel">
                <p className="text-2xl font-bold w-1/3 ">Brands</p>
                <div className="flex justify-between items-center"></div>
            </div>
            <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
                <div className="invoice-table">
                    <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                        <div className="flex items-center gap-2">
                            {/* <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                                <IconTrashLines />
                                Delete
                            </button> */}
                            <Link to="/products/addbrand" className="btn btn-primary gap-2">
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
                            records={paginatedBrands}
                            columns={[
                                {
                                    accessor: 'name',
                                    sortable: true,
                                    render: ({ name }) => (
                                        <div className="flex items-center font-semibold">
                                            <div>{name}</div>
                                        </div>
                                    ),
                                },
                                {
                                    accessor: 'description',
                                    sortable: true,
                                },
                                {
                                    accessor: 'totalProduct',
                                    title: 'Total Products',
                                    sortable: true,
                                },
                                {
                                    accessor: 'status',
                                    title: 'Status',
                                    sortable: true,
                                    render: ({ status }) => <span className={`badge badge-outline-${status === 'active' ? 'success' : 'danger'}`}>{status === 'active' ? 'Active' : 'Inactive'}</span>,
                                },
                                {
                                    accessor: 'action',
                                    title: 'Actions',
                                    sortable: false,
                                    textAlignment: 'center',
                                    render: ({ id, name }) => (
                                        <div className="flex gap-4 items-center w-max mx-auto">
                                            <Tippy content="Edit">
                                                <NavLink to={`/products/edit/${id}`} className="flex hover:text-info">
                                                    <IconEdit className="w-4.5 h-4.5" />
                                                </NavLink>
                                            </Tippy>
                                            <Tippy content="Delete">
                                                <button type="button" className="flex hover:text-danger" onClick={() => handledeleteBrandPopOpen(id, name)}>
                                                    <IconTrashLines />
                                                </button>
                                            </Tippy>
                                        </div>
                                    ),
                                },
                            ]}
                            highlightOnHover
                            totalRecords={filteredBrands.length}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={setPage}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            sortStatus={sortStatus}
                            onSortStatusChange={setSortStatus}
                            selectedRecords={selectedRecords}
                            onSelectedRecordsChange={setSelectedRecords}
                            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                            fetching={loading}
                        />
                        {error && <div className="text-red-600 text-center mt-2">{error}</div>}
                    </div>
                </div>
            </div>

            {/* // ...inside your component */}
            <ConfirmDialog
                open={deleteBrandPop}
                title="Delete Brand"
                message={`Are you sure you want to delete this Brand "${brandToDeleteId?.name}"?`}
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={() => brandToDeleteId && handleDeleteBrand(brandToDeleteId.id)}
                onCancel={() => setDeleteBrandPop(false)}
                loading={loading}
            />
        </div>
    );
};

export default Brands;
