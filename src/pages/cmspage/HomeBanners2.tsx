import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconPlus from '../../components/Icon/IconPlus';
import IconEdit from '../../components/Icon/IconEdit';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useDeleteBanner2Mutation, useGetAllBanners2Query } from '../../../features/banner/banner2Api';

const HomeBanners2 = () => {
  const dispatch = useDispatch();
  const { data: banners = [], isLoading } = useGetAllBanners2Query();

  const [deleteBanner2] = useDeleteBanner2Mutation();

  const PAGE_SIZES = [10, 20, 30, 50, 100];

  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'Title',
    direction: 'asc',
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    dispatch(setPageTitle('Homepage Banners'));
  }, [dispatch]);
    
 

  // Combine sorting, search, and pagination

useEffect(() => {
  //  const bannerArray = Array.isArray(response?.banners) ? response.banners : [];


   let processed = banners.map((banner: any) => ({
    id: banner.id,
    Title: banner.title || '',
    Description: banner.description || '',
    Link: banner.linkUrl || '',
    status: {
      tooltip: banner.isActive ? 'Active' : 'Inactive',
      color: banner.isActive ? 'success' : 'danger',
    },
    imageUrl: banner.homepageImage || '',
  }));

  if (search) {
    const query = search.toLowerCase();
    processed = processed.filter((item: any) =>
      [item.Title, item.Link, item.status.tooltip]
        .some((field) => field.toLowerCase().includes(query))
    );
  }

  if (sortStatus.columnAccessor) {
    const sorted = sortBy(processed, sortStatus.columnAccessor);
    processed = sortStatus.direction === 'desc' ? sorted.reverse() : sorted;
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize;
  setRecords(processed.slice(from, to));
}, [banners, search, sortStatus, page, pageSize]);

 useEffect(() => {
  console.log('Fetched data:', banners);
}, [banners]);

  const deleteRow = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await deleteBanner2(id).unwrap();
      } catch (error) {
        console.error('Failed to delete banner:', error);
      }
    }
  };

  if (isLoading) return <div className="text-center py-5">Loading banners...</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="panel">
        <p className="text-2xl font-bold w-1/3">Homepage Banners</p>
      </div>

      <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
            <div className="flex items-center gap-2">
              <Link to="/cmspage/add-banner2" className="btn btn-primary gap-2">
                <IconPlus />
                Add New
              </Link>
            </div>

            <div className="ltr:ml-auto rtl:mr-auto">
              <input
                type="text"
                className="form-input w-auto"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="datatables pagination-padding">
            <DataTable
              className="whitespace-nowrap table-hover invoice-table"
              records={records}
              columns={[
                {
                  accessor: 'imageUrl',
                  sortable: false,
                  render: ({ imageUrl }) => (
                    <div className="flex items-center font-semibold">
                      <div className="p-0.5 bg-white-dark/30 rounded-full w-max ltr:mr-2 rtl:ml-2">
                        <img
                          className="h-16 w-16 rounded object-cover"
                          src={imageUrl || '/fallback.jpg'}
                          alt="banner"
                        />
                      </div>
                    </div>
                  ),
                },
                { accessor: 'Title', sortable: true },
                { accessor: 'Description', sortable: true },
                { accessor: 'Link', sortable: true },
                {
                  accessor: 'status',
                  sortable: false,
                  render: ({ status }) => (
                    <span className={`badge badge-outline-${status.color}`}>
                      {status.tooltip}
                    </span>
                  ),
                },
                {
                  accessor: 'action',
                  title: 'Actions',
                  sortable: false,
                  textAlignment: 'center',
                  render: ({ id }) => (
                    <div className="flex gap-4 items-center w-max mx-auto">
                      <Tippy content="Edit">
                        <NavLink to={`/cmspage/add-banner2/${id}`} className="flex hover:text-info">
                          <IconEdit className="w-4.5 h-4.5" />
                        </NavLink>
                      </Tippy>
                      <Tippy content="Delete">
                        <button
                          type="button"
                          className="flex hover:text-danger"
                          onClick={() => deleteRow(id)}
                        >
                          <IconTrashLines />
                        </button>
                      </Tippy>
                    </div>
                  ),
                },
              ]}
              highlightOnHover
              totalRecords={Array.isArray(banners) ? banners.length : 0}


              recordsPerPage={pageSize}
              page={page}
              onPageChange={setPage}
              recordsPerPageOptions={PAGE_SIZES}
              onRecordsPerPageChange={(size) => {
                setPageSize(size);
                setPage(1); // reset to first page
              }}
              sortStatus={sortStatus}
              onSortStatusChange={setSortStatus}
              selectedRecords={selectedRecords}
              onSelectedRecordsChange={setSelectedRecords}
              paginationText={({ from, to, totalRecords }) =>
                `Showing ${from} to ${to} of ${totalRecords} entries`
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanners2;
