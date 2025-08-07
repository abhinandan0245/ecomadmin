import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCreateContactMutation } from '../../../features/contactUs/contactApi';
import { toast } from 'react-toastify';

const Contact = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Contact Page'));
  }, [dispatch]);

  const [content, setContent] = useState<string>(`
    <h3>Contact Us</h3>
    <p>You can reach us at:</p>
    <p><strong>Phone:</strong> +1 234 567 890</p>
    <p><strong>Email:</strong> contact@example.com</p>
    <p><strong>Address:</strong> 123 Main St, City, Country</p>
  `);

  const [createContact, { isLoading }] = useCreateContactMutation();

  const handleSave = async () => {
    try {
      await createContact({ content }).unwrap();
      toast.success('Contact page saved successfully!');
    } catch (error) {
      toast.error('Failed to save contact page');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
        <div className="text-lg ps-5 leading-none">Contact</div>
        <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
        <div className="mt-8 px-4">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
            {/* Left: Editor */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Edit Contact Page</h2>
              <ReactQuill
                value={content}
                onChange={setContent}
                className="bg-white mb-4"
                theme="snow"
              />
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="btn btn-success text-white px-6 py-2 rounded w-44"
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>

            {/* Right: Live Preview */}
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

export default Contact;
