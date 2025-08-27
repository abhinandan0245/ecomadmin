import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateShippingInfoMutation } from '../../../features/shippingInfo/shippingInfoApi';

const ShippingInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Shipping Information'));
  }, [dispatch]);

  const [content, setContent] = useState<string>(`
    <h2>Shipping Information</h2>
    <p>We respect your privacy and are committed to protecting your personal information.</p>
    <h3>Information We Collect</h3>
    <p>We collect data you provide when placing an order, signing up, or contacting support.</p>
    <h3>How We Use Your Information</h3>
    <ul>
      <li>To process orders</li>
      <li>To send important updates</li>
      <li>To improve our services</li>
    </ul>
    <h3>Data Security</h3>
    <p>We implement secure practices to protect your data.</p>
  `);

  const [createShippingInfo, { isLoading }] = useCreateShippingInfoMutation();

  const handleSave = async () => {
    try {
      await createShippingInfo({ content }).unwrap();
      toast.success('Shipping Information saved successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save Shipping Information');
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
        <div className="text-lg ps-5 leading-none">Shipping Information</div>
        <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
        <div className="mt-8 px-4">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
            {/* Editor */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Edit Shipping Information</h2>
              <ReactQuill
                value={content}
                onChange={setContent}
                className="bg-white mb-4"
                theme="snow"
              />
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="btn btn-dark text-white px-6 py-2 rounded"
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

export default ShippingInfo;
