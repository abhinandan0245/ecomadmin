import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import { useCreateTermsConditionsMutation, useGetTermsConditionsQuery } from '../../../features/terms/termsApi';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';

const Aboutus = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Terms And Conditions'));
  }, [dispatch]);

  const { data, isLoading: isFetching } = useGetTermsConditionsQuery();

  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (data?.data?.content) {
      setContent(data.data.content);
    }
  }, [data]);

  const [createTermsConditions, { isLoading }] = useCreateTermsConditionsMutation();

  const handleSave = async () => {
    try {
      await createTermsConditions({ content }).unwrap();
      toast.success('Terms & Conditions saved successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save Terms & Conditions');
    }
  };

  return (
  
    <div className="flex flex-col gap-2.5">
      <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
        <div className="text-lg ps-5 leading-none">Terms And Conditions</div>
        <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
        <div className="mt-8 px-4">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
            
            {/* Editor */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Edit Terms & Conditions</h2>
              {isFetching ? (
                <p>Loading...</p>
              ) : (
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  className="bg-white mb-4"
                  theme="snow"
                />
              )}
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="btn btn-success text-white px-6 py-2 rounded"
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>

            {/* Live Preview */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Live Preview</h2>
              <div className="border p-4 bg-white rounded shadow prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
