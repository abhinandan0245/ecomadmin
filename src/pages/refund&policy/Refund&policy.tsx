import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCreateRefundPolicyMutation } from '../../../features/refondPolicy/refondPolicyApi'; // Adjust the path
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState<string>(`
    <h2>Refund Policy</h2>
    <p>We want you to be happy with your purchase. If you're not satisfied, here's how refunds work:</p>

    <h3>Eligibility</h3>
    <ul>
      <li>Returns must be made within 30 days of delivery.</li>
      <li>Items must be unused and in original packaging.</li>
      <li>Proof of purchase is required.</li>
    </ul>

    <h3>Non-refundable Items</h3>
    <p>Gift cards, downloadable software, and clearance items cannot be refunded.</p>

    <h3>Refund Process</h3>
    <p>Once your return is received and inspected, we will notify you via email. Refunds are issued to your original payment method within 5–10 business days.</p>

    <h3>Need Help?</h3>
    <p>Contact us at <a href="mailto:support@example.com">support@example.com</a> for questions related to refunds.</p>
  `);

  const [createRefundPolicy, { isLoading }] = useCreateRefundPolicyMutation();

  useEffect(() => {
    dispatch(setPageTitle('Refund Policy'));
  }, [dispatch]);

  const handleSave = async () => {
    try {
      await createRefundPolicy({ content }).unwrap();
      toast.success('Refund Policy saved successfully!');
    } catch (error) {
      toast.error('Failed to save Refund Policy. Please try again.');
      console.error('Save error:', error);
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
        <div className="text-lg ps-5 leading-none">Refund Policy</div>
        <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
        <div className="mt-8 px-4">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
            {/* Editor Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Edit Refund Policy</h2>
              <ReactQuill
                value={content}
                onChange={setContent}
                className="bg-white mb-4"
                theme="snow"
              />
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="btn btn-success text-white px-6 py-2 rounded"
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>

            {/* Live Preview Section */}
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

export default PrivacyPolicy;
