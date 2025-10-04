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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllProductThunk, updateProductThunk } from '../../store/thunks/productThunk';
import UpdateProductModal from '../../component/UpdateProductModel';
import { toast } from 'react-toastify';

type ProductData = {
  Product: string;
  SKU: string;
  Stock: number;
};

const Inventory = () => {
    const dispatch = useAppDispatch();
     const { products, loading } = useAppSelector((state) => state.product);
     const [updateModalOpen, setUpdateModalOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState<any>(null);

const handleQuickUpdate = (product: any) => {
    setSelectedProduct(product);
    setUpdateModalOpen(true);
};



const handleUpdate = async (stock: number, productStatus: boolean , ) => {
    if (stock === null || stock === undefined || productStatus === null || productStatus === undefined) return;
    if (!selectedProduct) return;
    try {
        const formData = new FormData();
        formData.append('stock', String(stock));
        formData.append('productStatus', productStatus ? 'true' : 'false');
        await dispatch(updateProductThunk({ id: selectedProduct.id, formData })).unwrap();
        toast.success('Product updated!');
        setUpdateModalOpen(false);
        dispatch(getAllProductThunk());
    } catch (err: any) {
        toast.error('Failed to update product');
    }
};


   useEffect(() => {
        dispatch(setPageTitle('Inventory'));
        dispatch(getAllProductThunk());
    }, [dispatch]);
    

   

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<any[]>([]);
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

       // Filtering and sorting
    useEffect(() => {
    let filtered = products;
    if (search) {
        filtered = filtered.filter((item: any) => {
            const status = Number(item.stock ?? item.Stock) > 0 ? 'in-stock' : 'out-of-stock';
            return (
                (item.title || '').toLowerCase().includes(search.toLowerCase()) ||
                status.includes(search.toLowerCase()) ||
                (item.productStatus ? 'active' : 'inactive').includes(search.toLowerCase()) ||
                String(item.stock ?? item.Stock).includes(search)
            );
        });
    }
    // Normalize stock property
    const normalized = filtered.map((item: any) => ({
        ...item,
        stock: item.stock ?? item.Stock ?? 0,
    }));

    // Sort: low stock (<=4) first, then others
    const sorted = normalized.sort((a, b) => {
        const aLow = Number(a.stock) <= 4 ? 0 : 1;
        const bLow = Number(b.stock) <= 4 ? 0 : 1;
        if (aLow !== bLow) return aLow - bLow;
        return 0;
    });
    setInitialRecords(sortBy(sorted, sortStatus.columnAccessor));
    setPage(1);
}, [products, search, sortStatus.columnAccessor]);

    // Paginate records
    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);

  

  
 


    return (
        <div className='flex flex-col gap-4'>
            <div className='panel'>
              <p className='text-2xl font-bold w-1/3 mb-8'>Inventory</p>
              <div className='flex justify-between gap-5 items-center'>
                {/* <div className='flex w-1/2 items-center'>
                    <label htmlFor="Filter" className='w-1/6'>Filter :</label>
                <select name="CurrentQuantity" id="_CurrentQuantity" className='form-select flex-1'>
                    <option value="CurrentQuantity">Category</option>
                    <option value="Mens">Mens</option>
                    <option value="WoMen">WoMen</option>
                    <option value="Kids">Kids</option>
                </select>
                </div> */}
                {/* <div className='flex w-1/2 items-center'>
                    <label htmlFor="Filter" className='w-1/6'>Stock :</label>
                <select name="CurrentQuantity" id="_CurrentQuantity" className='form-select flex-1'>
                    <option value="CurrentQuantity">Choose</option>
                    <option value="Mens">InStock</option>
                    <option value="WoMen">OutOfStock</option>
                    <option value="Kids">Low Stock only</option>
                </select>
                </div> */}
                 
                 {/* notes for low stock warning in red color text */}

                <span className="text-red-600 font-semibold">
    * Products with stock 4 or less are considered low stock warning and highlighted in red.
                </span>


              </div>
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
                        records={records}
                        columns={[
                       
                            {
                                accessor: 'title',
                                title: 'Product Name',
                                sortable: true,
                            },
                            // {
                            //     accessor: 'SKU',
                            //     sortable: true,
                            // },
                            {
                                accessor: 'stock',
                                title : 'Stock Available',
                                sortable: true,
                            },
                            // {
                            //     accessor: 'LowStockWarning',
                            //     sortable: true,
                            // },
                            // {
                            //     accessor: 'amount',
                            //     sortable: true,
                            //     titleClassName: 'text-right',
                            //     render: ({ amount, id }) => <div className="text-right font-semibold">{`$${amount}`}</div>,
                            // },
                              {
                                    accessor: 'status',
                                    sortable: true,
                                    render: ({ status }) => (
                                        <span className={`badge badge-outline-${status === 'in-stock' ? 'success' : 'danger'}`}>{status === 'in-stock' ? 'Instock' : 'Out of Stock'}</span>
                                    ),
                                },
                            {
                                    accessor: 'productStatus',
                                    title: 'Product Status',
                                    sortable: true,
                                    render: ({ productStatus }) => (
                                        <span className={`badge badge-outline-${productStatus ? 'success' : 'danger'}`}>
                                            {productStatus ? 'Active' : 'Inactive'}
                                        </span>
                                    ),
                                },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                textAlignment: 'center',
                                render: (row) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                       {/* <Tippy content="Edit"> */}
                                       {/* <NavLink to="/class/addclass" className="flex hover:text-info"> */}
                                            {/* <IconEdit className="w-4.5 h-4.5" /> */}
<button className="btn btn-sm btn-success" onClick={() => handleQuickUpdate(row)}>
            Quick Update
        </button>
                                        {/* </NavLink> */}
                                       {/* </Tippy> */}
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
                rowStyle={(row: any) => {
    const stock = Number(row?.stock);
    if (!isNaN(stock) && stock <= 4) {
        return { backgroundColor: '#fee2e2', color: '#991b1b' };
    }
    return {};
}}
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

        {/* // At the bottom of your component: */}
<UpdateProductModal
    open={updateModalOpen}
    productName={selectedProduct?.title ?? ''}
    categoryName={selectedProduct?.category?.name ?? ''}
    brandName={selectedProduct?.brand ?? ''}
    currentStock={selectedProduct?.stock ?? 0}
    initialProductStatus={selectedProduct?.productStatus ?? true}
    onUpdate={handleUpdate}
    onCancel={() => setUpdateModalOpen(false)}
/>
        </div>
    );
};

export default Inventory;
