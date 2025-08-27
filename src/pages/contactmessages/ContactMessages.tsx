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
import { useDeleteContactMessageMutation, useGetContactMessageQuery } from '../../../features/contactmessages/contactMessagesApi';
import ConfirmDialog from '../../component/ConfirmDailog';
import { toast } from 'react-toastify';

const ContactMessages = () => {
  const dispatch = useDispatch();
  const { data: contactMessages = [], isLoading } = useGetContactMessageQuery();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [deleteContactMessage] = useDeleteContactMessageMutation();

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


   let processed = contactMessages.map((contact: any) => ({
    id: contact.id,
    Name: contact.name || '',
    Email: contact.email || '',
    Message: contact.message || '',
  }));

  if (search) {
    const query = search.toLowerCase();
    processed = processed.filter((item: any) =>
      [item.Name, item.Email, item.Message]
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
}, [contactMessages, search, sortStatus, page, pageSize]);

 useEffect(() => {
  console.log('Fetched data:', contactMessages);
}, [contactMessages]);

//   delete popup
  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId !== null) {
      setLoading(true);
      try {
       const response = await deleteContactMessage(deleteId).unwrap();
        toast.success(response?.message || 'Message deleted successfully!');
      } catch (error:any) {
        console.error('Failed to delete message:', error);
        toast.error(error?.data?.message || 'Failed to delete message');
      }
      setLoading(false);
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="panel">
        <p className="text-2xl font-bold w-1/3">Contact Messages</p>
      </div>

      <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
            {/* <div className="flex items-center gap-2">
              <Link to="/cmspage/add-banner2" className="btn btn-primary gap-2">
                <IconPlus />
                Add New
              </Link>
            </div> */}

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
              className="whitespace-nowrap table-hover  invoice-table"
              records={records}
              columns={[
                
                { accessor: 'Name', sortable: true },
                { accessor: 'Email', sortable: true },
                {
      accessor: 'Message',
      sortable: true,
      title: 'Message',
      render: ({ Message }) => (
        <div
          style={{
            minWidth: 250,
            maxWidth: 400,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
          className="py-2"
        >
          {Message}
        </div>
      ),
    },
                // {
                //   accessor: 'status',
                //   sortable: false,
                //   render: ({ status }) => (
                //     <span className={`badge badge-outline-${status.color}`}>
                //       {status.tooltip}
                //     </span>
                //   ),
                // },
                {
                  accessor: 'action',
                  title: 'Actions',
                  sortable: false,
                  textAlignment: 'center',
                  render: ({ id }) => (
                    <div className="flex gap-4 items-center w-max mx-auto">
                      
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
              totalRecords={Array.isArray(contactMessages) ? contactMessages.length : 0}


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

      {/* delete popup  */}

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Message"
        message="Are you sure you want to delete this message?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
        loading={loading}
      />

    </div>
  );
};

export default ContactMessages;
