// import { Link, NavLink } from 'react-router-dom';
// import { DataTable, DataTableSortStatus } from 'mantine-datatable';
// import { useState, useEffect } from 'react';
// import sortBy from 'lodash/sortBy';
// import { useDispatch, useSelector } from 'react-redux';
// import { IRootState } from '../../store';
// import { setPageTitle } from '../../store/slices/themeConfigSlice';
// import IconTrashLines from '../../components/Icon/IconTrashLines';
// import IconPlus from '../../components/Icon/IconPlus';
// import IconEdit from '../../components/Icon/IconEdit';
// import IconEye from '../../components/Icon/IconEye';
// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css';

// const AllProducts = () => {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(setPageTitle('Invoice List'));
//     });
//     const [items, setItems] = useState([
//         {
//             id: 1,
//             invoice: '081451',
//             name: 'Laurie Fox',

//             stock: '10',
//             category: 'Mens',
//              price: '2275.45',
//             status: { tooltip: 'Instock', color: 'success' },
//             profile: 'profile-1.jpeg',
//         },
//         {
//             id: 2,
//             invoice: '081452',
//             name: 'Alexander Gray',

//             stock: '10',
//             category: 'Mens',
//             price: '1044.00',
//             status: { tooltip: 'Instock', color: 'success' },
//             profile: 'profile-1.jpeg',
//         },
//         {
//             id: 3,
//             invoice: '081681',
//             name: 'James Taylor',

//             stock: '0',
//             category: 'Mens',
//              price: '20.00',
//             status: { tooltip: 'Out of Stock', color: 'danger' },
//             profile: 'profile-1.jpeg',
//         },
//         {
//             id: 4,
//             invoice: '082693',
//             name: 'Grace Roberts',

//             stock: '10',
//             category: 'Mens',
//              price: '344.00',
//             status: { tooltip: 'Instock', color: 'success' },
//             profile: 'profile-1.jpeg',
//         },
//         {
//             id: 5,
//             invoice: '084743',
//             name: 'Donna Rogers',

//             stock: '10',
//             category: 'Mens',
//              price: '405.15',
//             status: { tooltip: 'Instock', color: 'success' },
//             profile: 'profile-1.jpeg',
//         },
//         {
//             id: 6,
//             invoice: '086643',
//             name: 'Amy Diaz',

//             stock: '10',
//             category: 'Mens',
//              price: '100.00',
//             status: { tooltip: 'Instock', color: 'success' },
//             profile: 'profile-1.jpeg',
//         },
//         {
//             id: 7,
//             invoice: '086773',
//             name: 'Nia Hillyer',

//             stock: '0',
//             category: 'Mens',
//              price: '59.21',
//             status: { tooltip: 'Out of Stock', color: 'danger' },
//             profile: 'profile-1.jpeg',
//         },
//         {
//             id: 8,
//             invoice: '087916',
//             name: 'Mary McDonald',

//             stock: '0',
//             category: 'Mens',
//              price: '79.00',
//             status: { tooltip: 'Out of Stock', color: 'danger' },
//             profile: 'profile-1.jpeg',
//         },
//         {
//             id: 9,
//             invoice: '089472',
//             name: 'Andy King',

//             stock: '10',
//             category: 'Mens',
//              price: '149.00',
//             status: { tooltip: 'Instock', color: 'success' },
//             profile: 'profile-1.jpeg',
//         },
//         {
//             id: 10,
//             invoice: '091768',
//             name: 'Vincent Carpenter',

//             stock: '10',
//             category: 'Mens',
//              price: '400',
//             status: { tooltip: 'Instock', color: 'success' },
//             profile: 'profile-1.jpeg',
//         },
//         {
//             id: 11,
//             invoice: '095841',
//             name: 'Kelly Young',
//             stock: '0',
//             category: 'Mens',
//              price: '49.00',
//             status: { tooltip: 'Out of Stock', color: 'danger' },
//             profile: 'profile-1.jpeg',
//         },
//         {
//             id: 12,
//             invoice: '098424',
//             name: 'Alma Clarke',

//             stock: '10',
//             category: 'Mens',
//              price: '234.40',
//             status: { tooltip: 'Instock', color: 'success' },
//             profile: 'profile-1.jpeg',
//         },
//     ]);

//     const deleteRow = (id: any = null) => {
//         if (window.confirm('Are you sure want to delete selected row ?')) {
//             if (id) {
//                 setRecords(items.filter((user) => user.id !== id));
//                 setInitialRecords(items.filter((user) => user.id !== id));
//                 setItems(items.filter((user) => user.id !== id));
//                 setSearch('');
//                 setSelectedRecords([]);
//             } else {
//                 let selectedRows = selectedRecords || [];
//                 const ids = selectedRows.map((d: any) => {
//                     return d.id;
//                 });
//                 const result = items.filter((d) => !ids.includes(d.id as never));
//                 setRecords(result);
//                 setInitialRecords(result);
//                 setItems(result);
//                 setSearch('');
//                 setSelectedRecords([]);
//                 setPage(1);
//             }
//         }
//     };

//     const [page, setPage] = useState(1);
//     const PAGE_SIZES = [10, 20, 30, 50, 100];
//     const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
//     const [initialRecords, setInitialRecords] = useState(sortBy(items, 'invoice'));
//     const [records, setRecords] = useState(initialRecords);
//     const [selectedRecords, setSelectedRecords] = useState<any>([]);

//     const [search, setSearch] = useState('');
//     const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
//         columnAccessor: 'firstName',
//         direction: 'asc',
//     });

//     useEffect(() => {
//         setPage(1);
//         /* eslint-disable react-hooks/exhaustive-deps */
//     }, [pageSize]);

//     useEffect(() => {
//         const from = (page - 1) * pageSize;
//         const to = from + pageSize;
//         setRecords([...initialRecords.slice(from, to)]);
//     }, [page, pageSize, initialRecords]);

//     useEffect(() => {
//         setInitialRecords(() => {
//             return items.filter((item) => {
//                 return (
//                     item.invoice.toLowerCase().includes(search.toLowerCase()) ||
//                     item.name.toLowerCase().includes(search.toLowerCase()) ||
//                     item.price.toLowerCase().includes(search.toLowerCase()) ||
//                     item.stock.toLowerCase().includes(search.toLowerCase()) ||
//                     item. price.toLowerCase().includes(search.toLowerCase()) ||
//                     item.status.tooltip.toLowerCase().includes(search.toLowerCase())
//                 );
//             });
//         });
//     }, [search]);

//     useEffect(() => {
//         const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
//         setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
//         setPage(1);
//     }, [sortStatus]);

//     return (
//         <div className='flex flex-col gap-4'>
//             <div className='panel'>
//               <p className='text-2xl font-bold w-1/3 mb-8'>All Products</p>
//               <div className='flex justify-between items-center'>
//                 <div className='flex w-1/2 items-center'>
//                     <label htmlFor="Filter" className='w-1/6'>Filter :</label>
//                 <select name="Category" id="_Category" className='form-select flex-1'>
//                     <option value="Category">Category</option>
//                     <option value="Mens">Mens</option>
//                     <option value="WoMen">WoMen</option>
//                     <option value="Kids">Kids</option>
//                 </select>
//                 </div>
//                 <div className='flex justify-center items-center gap-4'>
//                     <label htmlFor="Pricerange" className='w-1/7'>Price Rang :</label>
//                     <div className='flex-1 flex items-center gap-4'>
//                     <input type="number" placeholder='From' className='form-input'/>
//                     <p>To</p>
//                     <input type="number" placeholder='To' className='form-input'/>
//                     </div>
//                 </div>
//               </div>
//             </div>
//             <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
//             <div className="invoice-table">
//                 <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
//                     <div className="flex items-center gap-2">
//                         <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
//                             <IconTrashLines />
//                             Delete
//                         </button>
//                         <Link to="/products/addnew" className="btn btn-primary gap-2">
//                             <IconPlus />
//                             Add New
//                         </Link>
//                     </div>

//                     <div className="ltr:ml-auto rtl:mr-auto">
//                         <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
//                     </div>
//                 </div>

//                 <div className="datatables pagination-padding">
//                     <DataTable
//                         className="whitespace-nowrap table-hover invoice-table"
//                         records={records}
//                         columns={[
//                             {
//                                 accessor: 'Product Id',
//                                 sortable: true,
//                                 render: ({ invoice }) => (
//                                     <NavLink to="/apps/invoice/preview">
//                                         <div className="text-primary underline hover:no-underline font-semibold">{`#${invoice}`}</div>
//                                     </NavLink>
//                                 ),
//                             },
//                             {
//                                 accessor: 'ProductName',
//                                 sortable: true,
//                                 render: ({ name, id }) => (
//                                     <div className="flex items-center font-semibold">
//                                         <div className="p-0.5 bg-white-dark/30 rounded-full w-max ltr:mr-2 rtl:ml-2">
//                                             <img className="h-8 w-8 rounded-full object-cover" src={`/assets/images/profile-${id}.jpeg`} alt="" />
//                                         </div>
//                                         <div>{name}</div>
//                                     </div>
//                                 ),
//                             },
//                             // {
//                             //     accessor: 'price',
//                             //     sortable: true,
//                             // },
//                             {
//                                 accessor: 'stock',
//                                 sortable: true,
//                             },
//                             {
//                                 accessor: 'category',
//                                 sortable: true,
//                             },
//                             {
//                                 accessor: ' price',
//                                 sortable: true,
//                                 titleClassName: 'text-right',
//                                 render: ({  price, id }) => <div className="text-right font-semibold">{`₹${ price}`}</div>,
//                             },
//                             {
//                                 accessor: 'status',
//                                 sortable: true,
//                                 render: ({ status }) => <span className={`badge badge-outline-${status.color} `}>{status.tooltip}</span>,
//                             },
//                             {
//                                 accessor: 'action',
//                                 title: 'Actions',
//                                 sortable: false,
//                                 textAlignment: 'center',
//                                 render: ({ id }) => (
//                                     <div className="flex gap-4 items-center w-max mx-auto">
//                                        <Tippy content="Edit">
//                                        <NavLink to="/class/addclass" className="flex hover:text-info">
//                                             <IconEdit className="w-4.5 h-4.5" />
//                                         </NavLink>
//                                        </Tippy>
//                                         <NavLink to="/apps/invoice/preview" className="flex hover:text-primary">
//                                             <IconEye />
//                                         </NavLink>
//                                         {/* <NavLink to="" className="flex"> */}
//                                         <Tippy content="Delete">
//                                         <button type="button" className="flex hover:text-danger" onClick={(e) => deleteRow(id)}>
//                                             <IconTrashLines />
//                                         </button>
//                                         </Tippy>
//                                         {/* </NavLink> */}
//                                     </div>
//                                 ),
//                             },
//                         ]}
//                         highlightOnHover
//                         totalRecords={initialRecords.length}
//                         recordsPerPage={pageSize}
//                         page={page}
//                         onPageChange={(p) => setPage(p)}
//                         recordsPerPageOptions={PAGE_SIZES}
//                         onRecordsPerPageChange={setPageSize}
//                         sortStatus={sortStatus}
//                         onSortStatusChange={setSortStatus}
//                         selectedRecords={selectedRecords}
//                         onSelectedRecordsChange={setSelectedRecords}
//                         paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
//                     />
//                 </div>
//             </div>
//         </div>
//         </div>
//     );
// };

// export default AllProducts;

import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import { getAllProductThunk, deleteProductThunk, filterProductThunk } from '../../store/thunks/productThunk';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconPlus from '../../components/Icon/IconPlus';
import IconEdit from '../../components/Icon/IconEdit';
import IconEye from '../../components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import IconX from '../../components/Icon/IconX';
import { toast } from 'react-toastify';
import { getAllCategoryAPIThunk } from '../../store/thunks/categoryThunks';

const AllProducts = () => {
    const dispatch = useAppDispatch();
    const { products, filteredProducts, loading, error } = useAppSelector((state: IRootState) => state.product);
    const { categories } = useAppSelector((state) => state.category);

    // Pagination, search, and sorting states
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [records, setRecords] = useState<any[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'productId',
        direction: 'asc',
    });
    const [deleteProdPop, setDeleteProdPop] = useState<any>(false);
    const [prodToDeleteId, setProdToDeleteId] = useState<{ id: string; title: string } | null>(null);
    const [filterCategory, setFilterCategory] = useState('');
    const [filterMinPrice, setFilterMinPrice] = useState('');
    const [filterMaxPrice, setFilterMaxPrice] = useState('');

    useEffect(() => {
        dispatch(setPageTitle('All Products'));
        // dispatch(getAllProductThunk());
        handleAllProduct();
    }, [dispatch]);

    const handleAllProduct = async () => {
        try {
            const result = await dispatch(getAllProductThunk()).unwrap();
            // If result is an array
            if (Array.isArray(result) && result.length > 0) {
                toast.success('Fetched products successfully!');
            } else {
                toast.info('No products found.');
            }
        } catch (err) {
            toast.error((err as string) || error || 'Failed to fetch Products.');
        }
    };

    // Update initialRecords when products or search changes
    // useEffect(() => {
    //     let filtered = products;
    //     if (search) {
    //         filtered = products.filter((item: any) =>
    //             (item.productId || '').toLowerCase().includes(search.toLowerCase()) ||
    //             (item.title || '').toLowerCase().includes(search.toLowerCase()) ||
    //             (item.price ? String(item.price) : '').toLowerCase().includes(search.toLowerCase()) ||
    //             (item.stock ? String(item.stock) : '').toLowerCase().includes(search.toLowerCase()) ||
    //             (item.category || '').toLowerCase().includes(search.toLowerCase()) ||
    //             (item.status || '').toLowerCase().includes(search.toLowerCase())
    //         );
    //     }
    //     setInitialRecords(sortBy(filtered, sortStatus.columnAccessor));
    //     setPage(1);
    // }, [products, search, sortStatus.columnAccessor]);

    // Instead of products, use filteredProducts
    useEffect(() => {
        let filtered = filteredProducts;

        // Filter by category
        if (filterCategory) {
            filtered = filtered.filter((item: any) => {
                if (item.category && typeof item.category === 'object') {
                    return String(item.category.id) === String(filterCategory);
                }
                return String(item.category) === String(filterCategory);
            });
        }

        // Filter by search
        if (search) {
            filtered = filtered.filter(
                (item: any) =>
                    (item.productId || '').toLowerCase().includes(search.toLowerCase()) ||
                    (item.title || '').toLowerCase().includes(search.toLowerCase()) ||
                    (item.price ? String(item.price) : '').toLowerCase().includes(search.toLowerCase()) ||
                    (item.stock ? String(item.stock) : '').toLowerCase().includes(search.toLowerCase()) ||
                    (item.category &&
                        typeof item.category === 'object' &&
                        ((item.category.name || '').toLowerCase().includes(search.toLowerCase()) || (item.category.id || '').toString().toLowerCase().includes(search.toLowerCase()))) ||
                    (item.status || '').toLowerCase().includes(search.toLowerCase())
            );
        }

        setInitialRecords(sortBy(filtered, sortStatus.columnAccessor));
        setPage(1);
    }, [filteredProducts, search, sortStatus.columnAccessor, filterCategory]);

    // Update records when page, pageSize, or initialRecords change
    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // Handle sorting
    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);

    // Delete row handler
    const deleteRow = (id: any = null) => {
        if (window.confirm('Are you sure want to delete selected row ?')) {
            if (id) {
                dispatch(deleteProductThunk(id));
            } else {
                let selectedRows = selectedRecords || [];
                selectedRows.forEach((row: any) => {
                    dispatch(deleteProductThunk(row.id));
                });
                setSelectedRecords([]);
            }
        }
    };

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div className="text-red-500">Error: {error}</div>;

    //  delete product api
    const handleDeleteProduct = async (id: string) => {
        try {
            const result = await dispatch(deleteProductThunk(id)).unwrap();
            handleAllProduct();
            toast.success(result?.message || 'Product Delete Successfully!');
            setDeleteProdPop(false); // 👈 Close modal after delete
            setProdToDeleteId(null); // 👈 Reset ID
        } catch (err) {
            console.log(err);
            toast.error((err as string) || 'Failed to Delete Product');
        }
    };

    //  delete category popup
    const handledeleteProdPopOpen = (id: string, title: string) => {
        setProdToDeleteId({ id, title }); // 👈 Set selected category id
        setDeleteProdPop(true);
    };

    // filter api call
    const handleFilter = async () => {
        const params: any = {};
        // if (filterCategory) params.categoryId = filterCategory;
        if (filterMinPrice) params.minPrice = filterMinPrice;
        if (filterMaxPrice) params.maxPrice = filterMaxPrice;

        try {
            if (Object.keys(params).length === 0) {
                await dispatch(getAllProductThunk()).unwrap();
            } else {
                await dispatch(filterProductThunk(params)).unwrap();
            }
            toast.success('Filtered products loaded!');
        } catch (err) {
            toast.error((err as string) || 'Failed to filter products');
        }
    };

    useEffect(() => {
        if (!categories || categories.length === 0) {
            dispatch(getAllCategoryAPIThunk());
        }
    }, [dispatch, categories]);

    return (
        <div className="flex flex-col gap-4">
            <div className="panel">
                <p className="text-2xl font-bold w-1/3 mb-8">All Products</p>
                <div className="flex justify-between items-center">
                    <div className="flex w-1/2 items-center">
                        <label htmlFor="Filter" className="w-1/6">
                            Filter :
                        </label>
                        <select
                            name="Category"
                            id="_Category"
                            className="form-select flex-1"
                            value={filterCategory}
                            onChange={(e) => {
                                setFilterCategory(e.target.value);
                                setTimeout(handleFilter, 0);
                            }}
                        >
                            <option value="">Category</option>
                            {(categories || []).map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <label htmlFor="Pricerange" className="w-1/7">
                            Price Range :
                        </label>
                        <div className="flex-1 flex items-center gap-4">
                            <input type="number" placeholder="From" className="form-input" value={filterMinPrice} onChange={(e) => setFilterMinPrice(e.target.value)} />
                            <p>To</p>
                            <input type="number" placeholder="To" className="form-input" value={filterMaxPrice} onChange={(e) => setFilterMaxPrice(e.target.value)} />
                            <button className="btn btn-primary" onClick={handleFilter}>
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
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
                                {
                                    accessor: 'productId',
                                    sortable: true,
                                    render: ({ productId }) => (
                                        <NavLink to="#">
                                            <div className="text-primary underline hover:no-underline font-semibold">{`#${productId}`}</div>
                                        </NavLink>
                                    ),
                                },
                                {
                                    accessor: 'title',
                                    sortable: true,
                                    render: ({ title }) => (
                                        <div className="flex items-center font-semibold">
                                            <div>{title}</div>
                                        </div>
                                    ),
                                },
                                {
                                    accessor: 'stock',
                                    sortable: true,
                                },
                                {
                                    accessor: 'category',
                                    sortable: true,
                                    render: ({ category }) => <span>{typeof category === 'object' && category !== null ? category.name : category || '-'}</span>,
                                },
                                {
                                    accessor: 'price',
                                    sortable: true,
                                    titleClassName: 'text-right',
                                    render: ({ priceVariants }) => {
                                        const parsed = JSON.parse(priceVariants || "[]");
                                        return (
                                          <div className="text-right font-semibold">
                                            ₹{parsed[0]?.price || 0}
                                          </div>
                                        );
                                      },
                                },
                                {
                                    accessor: 'status',
                                    sortable: true,
                                    render: ({ status }) => (
                                        <span className={`badge badge-outline-${status === 'in-stock' ? 'success' : 'danger'}`}>{status === 'in-stock' ? 'Instock' : 'Out of Stock'}</span>
                                    ),
                                },
                                {
                                    accessor: 'productStatus',
                                    sortable: true,
                                    render: ({ productStatus }) => {
                                        // Handle boolean or string
                                        const isActive = productStatus === true || productStatus === 'active' || productStatus === 'true';
                                        return <span className={`badge badge-outline-${isActive ? 'success' : 'danger'}`}>{isActive ? 'active' : 'inactive'}</span>;
                                    },
                                },
                                {
                                    accessor: 'action',
                                    title: 'Actions',
                                    sortable: false,
                                    textAlignment: 'center',
                                    render: ({ id, title }) => (
                                        <div className="flex gap-4 items-center w-max mx-auto">
                                            <Tippy content="Edit">
                                                <NavLink to={`/products/edit-product/${id}`} className="flex hover:text-info">
                                                    <IconEdit className="w-4.5 h-4.5" />
                                                </NavLink>
                                            </Tippy>
                                            {/* <NavLink to={`/products/view`} className="flex hover:text-primary">
                                                <IconEye />
                                            </NavLink> */}
                                            <Tippy content="Delete">
                                                <button type="button" className="flex hover:text-danger" onClick={() => handledeleteProdPopOpen(id, title)}>
                                                    <IconTrashLines />
                                                </button>
                                            </Tippy>
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

            {/*delete  popup  */}
            <Transition appear show={deleteProdPop} as={Fragment}>
                <Dialog as="div" open={deleteProdPop} onClose={() => setDeleteProdPop(false)} className="relative z-[51]">
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
                                        onClick={() => setDeleteProdPop(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <IconX />
                                    </button>

                                    <div className="text-lg font-medium bg-[#fbfbfb] text-center dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        Are you sure you want to delete this Product <span className="font-bold text-danger mx-1">"{prodToDeleteId?.title}"</span>?
                                    </div>

                                    <div className="p-5">
                                        <form>
                                            <div className="flex justify-center items-center mt-8">
                                                <button onClick={() => prodToDeleteId && handleDeleteProduct(prodToDeleteId.id)} type="button" className="btn btn-success ltr:ml-4 rtl:mr-4">
                                                    Delete
                                                </button>

                                                <button type="button" className="btn btn-outline-danger gap-2 ltr:ml-4 rtl:mr-4" onClick={() => setDeleteProdPop(false)}>
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

export default AllProducts;
