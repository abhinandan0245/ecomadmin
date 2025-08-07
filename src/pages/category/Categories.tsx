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
import { deleteCategoryThunk, getAllCategoryAPIThunk } from '../../store/thunks/categoryThunks';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment,  useRef } from 'react';
import IconX from '../../components/Icon/IconX';

const Categories = () => {
    const dispatch = useAppDispatch();  
    useEffect(() => {
        dispatch(setPageTitle('Cotegories'));
    });
    const token = useAppSelector((state: IRootState) => state.auth.token);
    const { categories, loading, error } = useAppSelector((state: IRootState) => state.category);
    const [deleteCatPop, setDeleteCatPop] = useState<any>(false);
    const [catToDeleteId, setCatToDeleteId] = useState<{id:string ; name:string} | null>(null);

    // get all categories api call 

     const handleGetAllCategory = async() => {
        if (!token) {
            toast.error("Token not found!");
            return;
          }
          

     try {
              const result =  await dispatch(getAllCategoryAPIThunk()).unwrap();
               // If result is an array
        if (Array.isArray(result) && result.length > 0) {
            toast.success('Fetched categories successfully!');
        } else {
            toast.info('No categories found.');
        }
                console.log(result);
            } catch (err) {
                toast.error((err as string) || 'Failed to add category.');
            }
     }

     useEffect(() => {
        handleGetAllCategory();
     },[token]);


    //  delete category api 
    const handleDeleteCategory = async(id:string) => {
        if(!token){
            toast.error("Token not found!");
            return;

        }

       
        try{
         const result =  await dispatch(deleteCategoryThunk({id})).unwrap();
           handleGetAllCategory()
           toast.success(result?.data?.message || "Category Delete Successfully!")
           setDeleteCatPop(false); // 👈 Close modal after delete
           setCatToDeleteId(null); // 👈 Reset ID

        }catch(err) {
   console.log(err)
   toast.error(err as string || "Failed to Delete Category")
        }
    };


    //  delete category popup 
    const handleDeleteCatPopOpen = (id:string, name:string) => {
        setCatToDeleteId({id , name}); // 👈 Set selected category id
        setDeleteCatPop(true);
    };
   

    // const deleteRow = (id: any = null) => {
    //     if (window.confirm('Are you sure want to delete selected row ?')) {
    //         if (id) {
    //             setRecords(categories.filter((user) => user.id !== id));
    //             setInitialRecords(categories.filter((user) => user.id !== id));
    //             setcategories(categories.filter((user) => user.id !== id));
    //             setSearch('');
    //             setSelectedRecords([]);
    //         } else {
    //             let selectedRows = selectedRecords || [];
    //             const ids = selectedRows.map((d: any) => {
    //                 return d.id;
    //             });
    //             const result = categories.filter((d) => !ids.includes(d.id as never));
    //             setRecords(result);
    //             setInitialRecords(result);
    //             setcategories(result);
    //             setSearch('');
    //             setSelectedRecords([]);
    //             setPage(1);
    //         }
    //     }
    // };

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(categories, 'invoice'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });
  
    useEffect(() => {
        setInitialRecords(sortBy(categories, 'name')); // use a valid field like 'name'
    }, [categories]);
    

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
            return categories.filter((item) => {
                return (
                    // item.invoice.toLowerCase().includes(search.toLowerCase()) ||
                    item.name.toLowerCase().includes(search.toLowerCase())
                    // item.Slug.toLowerCase().includes(search.toLowerCase()) ||
                    // item.ProductCount.toLowerCase().includes(search.toLowerCase()) ||
                    // item.amount.toLowerCase().includes(search.toLowerCase()) ||
                    // item.status.tooltip.toLowerCase().includes(search.toLowerCase())
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
              <p className='text-2xl font-bold w-1/3 '>Categories</p>
              <div className='flex justify-between items-center'>
                {/* <div className='flex w-1/2 items-center'>
                    <label htmlFor="Filter" className='w-1/6'>Filter :</label>
                <select name="parentCategory" id="_parentCategory" className='form-select flex-1'>
                    <option value="parentCategory">Category</option>
                    <option value="Mens">Mens</option>
                    <option value="WoMen">WoMen</option>
                    <option value="Kids">Kids</option>
                </select>
                </div> */}
                {/* <div className='flex justify-center items-center gap-4'>
                    <label htmlFor="Slugrange" className='w-1/7'>Slug Rang :</label>
                    <div className='flex-1 flex items-center gap-4'>
                    <input type="number" placeholder='From' className='form-input'/>
                    <p>To</p>
                    <input type="number" placeholder='To' className='form-input'/>
                    </div>
                </div> */}
              </div>
            </div>
            <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-2">
                        {/* <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                            <IconTrashLines />
                            Delete
                        </button> */}
                        <Link to="/category/addnewcat" className="btn btn-primary gap-2">
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
                            //     accessor: 'class Id',
                            //     sortable: true,
                            //     render: ({ invoice }) => (
                            //         <NavLink to="/apps/invoice/preview">
                            //             <div className="text-primary underline hover:no-underline font-semibold">{`#${invoice}`}</div>
                            //         </NavLink>
                            //     ),
                            // },
                            // {
                            //     accessor: 'name',
                            //     sortable: true,
                            //     render: ({ name}) => (
                            //         <div className="flex items-center font-semibold">
                            //             <div className="p-0.5 bg-white-dark/30 rounded-full w-max ltr:mr-2 rtl:ml-2">
                            //                 <img className="h-8 w-8 rounded-full object-cover" src={`/assets/images/profile-.jpeg`} alt="" />
                            //             </div>
                            //             <div>{name}</div>
                            //         </div>
                            //     ),
                            // },
                            {
                                accessor: 'name',
                                title: 'Name',
                                sortable: true,
                            },
                            {
                                accessor: 'slug',
                                title: 'Slug',
                                sortable: true,
                            },
                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                render: ({ status }) => {
                                  const isActive = status === true; // or !!status
                                  const label = isActive ? 'Active' : 'Inactive';
                                  const colorClass = isActive ? 'badge-outline-success' : 'badge-outline-danger';
                              
                                  return (
                                    <span className={`badge ${colorClass}`}>
                                      {label}
                                    </span>
                                  );
                                },
                              },
                              
                            
                            
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                textAlignment: 'center',
                                
                                render: ({id , name}) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        
                                         {/* edit category  */}

                                       <Tippy content="Edit">
                                       <NavLink to={`/category/edit-category/${id}`} className="flex hover:text-info">
                                            <IconEdit className="w-4.5 h-4.5" />
                                        </NavLink>
                                       </Tippy>
                                        
                                        {/* delete category ------------------------------------------------------------ */}
                                        {/* <NavLink to="" className="flex"> */}
                                        <Tippy content="Delete">
                                        <button type="button" className="flex hover:text-danger" onClick={() => handleDeleteCatPopOpen(id , name)}>
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



         {/*delete category  popup  */}
         <Transition appear show={deleteCatPop} as={Fragment}>
                                                                    <Dialog as="div" open={deleteCatPop} onClose={() => setDeleteCatPop(false)} className="relative z-[51]">
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
                                                                                            onClick={() => setDeleteCatPop(false)}
                                                                                            className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                                                                        >
                                                                                            <IconX />
                                                                                        </button>
                                                                                        
                                                                                        <div className="text-lg font-medium bg-[#fbfbfb] text-center dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                                           
                                                                                        Are you sure you want to delete this category <span className="font-bold text-danger mx-1">"{catToDeleteId?.name}"</span>?
                                                        </div>
                                                                                       
                                                                                        <div className="p-5">
                                                                                            <form>                                                                                       
                                                                                            
                                                                                                                                                                                               <div className="flex justify-center items-center mt-8">
                                                                                                <button  onClick={() => catToDeleteId && handleDeleteCategory(catToDeleteId.id)} type="button" className="btn btn-success ltr:ml-4 rtl:mr-4" >
                                                                                                        Delete 
                                                                                                    </button>
                                                                                                  
                                                                                                    <button type="button" className="btn btn-outline-danger gap-2 ltr:ml-4 rtl:mr-4" onClick={() => setDeleteCatPop(false)}>
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

export default Categories;
