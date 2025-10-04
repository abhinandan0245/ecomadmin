import { useNavigate, useParams } from 'react-router-dom';
import { useGetCustomerByIdQuery } from '../../../features/customer/cutomerApi';
import IconArrowBackward from '../../components/Icon/IconArrowBackward';

const CustomerProfile = () => {
  const { id } = useParams(); // Get customer ID from URL
const { data, isLoading, error } = useGetCustomerByIdQuery(id!);
const navigate = useNavigate();

if (isLoading) return <div>Loading...</div>;
if (error || !data || !data.customer) return <div>Failed to load customer</div>;

const customer = data.customer;


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load customer</div>;

  return (
    <div className="flex flex-col space-y-4">
    <div className=' panel flex justify-between items-center '>
        <div className=" text-lg ps-5 ">Customer Profile</div>
           <button type="button" className="btn btn-dark gap-2" onClick={() => navigate(-1)}>
                                                          <IconArrowBackward />
                                                          Back To Customers
                                                      </button>
    </div>

      {/* Personal Info */}
<div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
  <p className="ps-5 text-lg font-semibold">Personal Information</p>
  <div className="grid lg:grid-cols-2 gap-7 px-5">
    <div className="mt-4 flex items-center">
      <label className="w-1/3 mb-0">Profile Picture</label>
      <div className="w-24 h-24 border-2 border-gray-300 flex items-center justify-center rounded-full overflow-hidden">
        {customer.profileImage ? (
          <img
            src={
              customer.profileImage.startsWith('/')
                ? `http://localhost:5000${customer.profileImage}`
                : customer.profileImage
            }
            alt="Customer Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-xs text-center">No Image</span>
        )}
      </div>
    </div>

    <div className="mt-4 flex items-center">
      <label className="w-1/3 mb-0">Full Name</label>
      <input readOnly value={customer.name || ''} className="form-input flex-1" />
    </div>

    <div className="mt-4 flex items-center">
      <label className="w-1/3 mb-0">Email</label>
      <input readOnly value={customer.email || ''} className="form-input flex-1" />
    </div>

    <div className="mt-4 flex items-center">
      <label className="w-1/3 mb-0">Mobile</label>
      <input readOnly value={customer.mobile || ''} className="form-input flex-1" />
    </div>
  </div>
</div>


      {/* Address */}
      <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
        <p className="ps-5 text-lg font-semibold">Address</p>
        <div className="grid lg:grid-cols-2 gap-7 px-5">
          <div className="mt-4 flex items-center">
            <label className="w-1/3 mb-0">Billing Address</label>
            <input readOnly value={customer.billingAddress || ''} className="form-input flex-1" />
          </div>
          <div className="mt-4 flex items-center">
            <label className="w-1/3 mb-0">Shipping Address</label>
            <input readOnly value={customer.shippingAddress || ''} className="form-input flex-1" />
          </div>
          <div className="mt-4 flex items-center">
            <label className="w-1/3 mb-0">City</label>
            <input readOnly value={customer.city || ''} className="form-input flex-1" />
          </div>
          <div className="mt-4 flex items-center">
            <label className="w-1/3 mb-0">State</label>
            <input readOnly value={customer.state || ''} className="form-input flex-1" />
          </div>
          <div className="mt-4 flex items-center">
            <label className="w-1/3 mb-0">Country</label>
            <input readOnly value={customer.country || ''} className="form-input flex-1" />
          </div>
          <div className="mt-4 flex items-center">
            <label className="w-1/3 mb-0">Pin Code</label>
            <input readOnly value={customer.pinCode || ''} className="form-input flex-1" />
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="panel px-5">
        <div className="flex items-center">
          <label className="w-1/3 mb-0">Status</label>
          <input readOnly value={customer.status || ''} className="form-input flex-1" />
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
