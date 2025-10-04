import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import { 
  useCreateContactMutation, 
  useGetContactQuery 
} from '../../../features/contactUs/contactApi';
import { toast } from 'react-toastify';

const Contact = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Contact Page'));
  }, [dispatch]);

  // Form state
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [snapchat, setSnapchat] = useState('');

  // RTK Query
  const { data: contactData, isLoading: isFetching } = useGetContactQuery({});
  const [createOrUpdateContact, { isLoading: isSaving }] = useCreateContactMutation();

  // Prefill form when data comes
  useEffect(() => {
    if (contactData?.data) {
      const c = contactData.data;
      setMobile(c.mobile || '');
      setAddress(c.address || '');
      setEmail(c.email || '');
      setFacebook(c.facebook || '');
      setInstagram(c.instagram || '');
      setTwitter(c.twitter || '');
      setSnapchat(c.snapchat || '');
    }
  }, [contactData]);

  const handleSave = async () => {
    try {
      await createOrUpdateContact({
        mobile,
        address,
        email,
        facebook,
        instagram,
        twitter,
        snapchat,
      }).unwrap();

      toast.success('Contact page saved successfully!');
    } catch (error) {
      toast.error('Failed to save contact page');
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className="panel flex flex-col gap-2.5">
      <div className=" px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
        <div className="text-lg ps-5 leading-none">Contact Us</div>
        <hr className="border-white-light dark:border-[#1b2e4b] my-6" />

        <div className="mt-4 px-4">
          <div className="p-6  w-full mx-auto">
            

            {isFetching ? (
              <p>Loading contact info...</p>
            ) : (
              <div className=" grid grid-cols-2 gap-4 items-center  mb-4">
                <div className='flex gap-2 items-center'>
                  <label className="block text-sm font-medium mb-1 w-1/4">Mobile Number</label>
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="form-input w-full"
                  />
                </div>

                <div className='flex gap-2 items-center'>
                  <label className="block text-sm font-medium mb-1 w-1/4">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-input w-full"
                  />
                </div>

                <div className='flex gap-2 items-center'>
                  <label className="block text-sm font-medium mb-1 w-1/4">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input w-full"
                  />
                </div>

                <div className='flex gap-2 items-center'>
                  <label className="block text-sm font-medium mb-1 w-1/4" >Facebook URL</label>
                  <input
                    type="text"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    className="form-input w-full"
                  />
                </div>

                <div className='flex gap-2 items-center'>
                  <label className="block text-sm font-medium mb-1 w-1/4">Instagram URL</label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="form-input w-full"
                  />
                </div>

                <div className='flex gap-2 items-center'>
                  <label className="block text-sm font-medium mb-1 w-1/4">Twitter URL</label>
                  <input
                    type="text"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="form-input w-full"
                  />
                </div>

                <div className='flex gap-2 items-center'>
                  <label className="block text-sm font-medium mb-1 w-1/4">Snapchat URL</label>
                  <input
                    type="text"
                    value={snapchat}
                    onChange={(e) => setSnapchat(e.target.value)}
                    className="form-input w-full"
                  />
                </div>
              </div>
            )}

            
          </div>
         
        </div>
        
      </div>
      
      
    </div>
    <div className='panel'> <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn btn-success text-white px-6 py-2 rounded w-44"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button></div>
    </div>
  );
};

export default Contact;
