import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import { DataTable } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { toast } from 'react-toastify';

import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconEdit from '../../components/Icon/IconEdit';

import {
  useGetFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} from '../../../features/faq/faqApi';
import ConfirmDialog from '../../component/ConfirmDailog';

const PAGE_SIZES = [10, 20, 30, 50];

const FaqList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('FAQs'));
  }, [dispatch]);

  // RTK Query hooks
  const { data: faqs = [], isLoading } = useGetFaqsQuery();
  const [createFaq] = useCreateFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();

  // Local state for form and pagination
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  // Memoized sorted FAQs
  const sortedFaqs = useMemo(() => sortBy(faqs, 'id'), [faqs]);

  // Memoized paginated records
  const records = useMemo(() => {
    const from = (page - 1) * pageSize;
    return sortedFaqs.slice(from, from + pageSize);
  }, [sortedFaqs, page, pageSize]);

  // Create or Update handler
  const handleAddOrUpdate = async () => {
    if (!question.trim() || !answer.trim()) {
      return toast.error('Question and Answer are required');
    }
    try {
      if (editingId !== null) {
        await updateFaq({ id: editingId, question, answer }).unwrap();
        toast.success('FAQ updated');
      } else {
        await createFaq({ question, answer }).unwrap();
        toast.success('FAQ created');
      }
      setQuestion('');
      setAnswer('');
      setEditingId(null);
      setPage(1); // optional: reset to first page after update/create
    } catch {
      toast.error('Failed to save FAQ');
    }
  };

  const handleEdit = (faq: any) => {
    setEditingId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
  };

//   const handleDelete = async (id: number) => {
//     if (!window.confirm('Are you sure to delete this FAQ?')) return;
//     try {
//       await deleteFaq(id).unwrap();
//       toast.success('FAQ deleted');
//       if (editingId === id) setEditingId(null);
//       setPage(1); // optional: reset to first page after delete
//     } catch {
//       toast.error('Failed to delete FAQ');
//     }
//   };

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openConfirmDialog = (id: number) => {
    setFaqToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (faqToDelete === null) return;

    setDeleting(true);
    try {
      await deleteFaq(faqToDelete).unwrap();
      toast.success('FAQ deleted');
      if (editingId === faqToDelete) setEditingId(null);
    } catch {
      toast.error('Failed to delete FAQ');
    } finally {
      setDeleting(false);
      setIsConfirmOpen(false);
      setFaqToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setFaqToDelete(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="panel">
        <h2 className="text-2xl font-bold">Add / Edit FAQ</h2>
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Question"
            className="form-input"
          />
          <textarea
            rows={5}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
            className="form-textarea"
          />
          <button
            type="button"
            className="btn btn-success w-max"
            onClick={handleAddOrUpdate}
          >
            {editingId !== null ? 'Update FAQ' : 'Add FAQ'}
          </button>
        </div>
      </div>

      <div className="panel">
        <h2 className="text-2xl font-bold">FAQ List</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <DataTable
            records={records}
            columns={[
              { accessor: 'question', sortable: true, title: 'Question' },
              { accessor: 'answer', sortable: true, title: 'Answer' },
              {
                accessor: 'actions',
                title: 'Actions',
                sortable: false,
                textAlignment: 'center',
                render: (faq) => (
                  <div className="flex gap-4 justify-center">
                    <Tippy content="Edit">
                      <button onClick={() => handleEdit(faq)}>
                        <IconEdit />
                      </button>
                    </Tippy>
                    <Tippy content="Delete">
                      <button onClick={() => openConfirmDialog(faq.id)}>
                        <IconTrashLines />
                      </button>
                    </Tippy>
                  </div>
                ),
              },
            ]}
            totalRecords={sortedFaqs.length}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={setPage}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize}
            highlightOnHover
            paginationText={({ from, to, totalRecords }) =>
              `Showing ${from} to ${to} of ${totalRecords} entries`
            }
          />
        )}
      </div>

        {/* delete confirm  */}

        <ConfirmDialog
  open={isConfirmOpen}
  title="Delete FAQ"
  message="Are you sure you want to delete this FAQ?"
  confirmText="Delete"
  cancelText="Cancel"
  loading={deleting}
  onConfirm={handleConfirmDelete}
  onCancel={handleCancelDelete}
/>

    </div>
  );
};

export default FaqList;
