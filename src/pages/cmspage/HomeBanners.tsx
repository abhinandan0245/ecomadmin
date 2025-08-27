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
import { useDeleteBannerMutation, useGetAllBannersQuery } from '../../../features/banner/bannerApi';
import ConfirmDialog from '../../component/ConfirmDailog';

const HomeBanners = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Homepage Banners'));
  }, [dispatch]);

  const { data: banners = [], isLoading } = useGetAllBannersQuery();
  const [deleteBanner] = useDeleteBannerMutation();

  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);
  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);

  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'Order',
    direction: 'asc',
  });

    // State for delete confirmation
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Map and sort banners when data changes
  useEffect(() => {
    const mapped = banners.map((banner: any) => ({
      id: banner.id,
      Title: banner.title,
      Link: banner.linkUrl,
      Order: banner.order?.toString() || '0',
      status: {
        tooltip: banner.isActive ? 'Active' : 'Inactive',
        color: banner.isActive ? 'success' : 'danger',
      },
      imageUrl: banner.homepageImage,
    }));

    const sorted = sortBy(mapped, 'Order');
    setInitialRecords(sorted);
  }, [banners]);

  // Filter initialRecords by search text
  useEffect(() => {
    const filtered = initialRecords.filter((item) =>
      [item.Title, item.Link, item.Order, item.status.tooltip]
        .some((field) => field.toLowerCase().includes(search.toLowerCase()))
    );
    setRecords(filtered);
    setPage(1);
  }, [search, initialRecords]);

  // Pagination: slice records for current page and page size
  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords((prev) => prev.slice(from, to));
  }, [page, pageSize]);

  // Sort records on sortStatus change
  useEffect(() => {
    const sorted = sortBy(records, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === 'desc' ? sorted.reverse() : sorted);
    setPage(1);
  }, [sortStatus]);




  // Open confirm dialog
  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      setLoading(true);
      await deleteBanner(selectedId).unwrap();
      setConfirmOpen(false);
      setSelectedId(null);
    } catch (error) {
      console.error('Failed to delete banner:', error);
    } finally {
      setLoading(false);
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
              <Link to="/cmspage/add-banner" className="btn btn-primary gap-2">
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
                        <img className="h-16 w-16 rounded object-cover" src={imageUrl} alt="banner" />
                      </div>
                    </div>
                  ),
                },
                { accessor: 'Title', sortable: true },
                { accessor: 'Link', sortable: true },
                { accessor: 'Order', sortable: true },
                {
                  accessor: 'status',
                  sortable: true,
                  render: ({ status }) => (
                    <span className={`badge badge-outline-${status.color}`}>{status.tooltip}</span>
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
                        <NavLink to={`/cmspage/add-banner/${id}`} className="flex hover:text-info">
                          <IconEdit className="w-4.5 h-4.5" />
                        </NavLink>
                      </Tippy>
                      <Tippy content="Delete">
                        <button
                          type="button"
                          className="flex hover:text-danger"
                          onClick={() => handleDeleteClick(id)}
                        >
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
              onPageChange={setPage}
              recordsPerPageOptions={PAGE_SIZES}
              onRecordsPerPageChange={setPageSize}
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

       {/* ✅ Reusable Confirm Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Banner"
        message="Are you sure you want to delete this banner? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
        loading={loading}
      />

    </div>
  );
};

export default HomeBanners;
