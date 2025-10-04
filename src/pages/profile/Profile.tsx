import { Link, NavLink, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
// import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconPlus from '../../components/Icon/IconPlus';
import IconEdit from '../../components/Icon/IconEdit';
import IconEye from '../../components/Icon/IconEye';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect, useRef } from 'react';
import IconX from '../../components/Icon/IconX';
import IconCamera from '../../components/Icon/IconCamera';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Tab } from '@headlessui/react';
import { logout, setProfile } from '../../store/slices/authSlice';
import { getProfile } from '../../api/authApi';
import { updateProfileDetailsThunk, uploadProfileImageThunk } from '../../store/thunks/authThunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toast } from 'react-toastify';
import Contact from '../cmspage/Contact';
// import { Fragment } from 'react';


const Profile = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Profile'));
    });
  
// logo uploader 
    const [image, setImage] = useState<string | null>(null);

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImage(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const imageData = reader.result as string;
  //       setForm((prevForm) => ({
  //         ...prevForm,
  //         profileImage: imageData,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  

  // api call get profile data 
  
      // get profile data 
      const token = useSelector((state: IRootState) => state.auth.token);
      // const profile = useSelector((state: IRootState) => state.auth.user); // Now from Redux
      const profile = useAppSelector((state) => state.auth.user);
      // const [profile, setProfileData] = useState<any>(null);
  
      const [form , setForm] = useState({
        name: '',
        email: '',
        mobile: '',
        profileImage: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        billingAddress: '',
        shippingAddress: '',
        city: '',
        state: '',
        pinCode: '',
        country: '',
        companyName: '',
        businessEmail: '',
        businessType: '',
        taxId: '',
      });

      const fetchProfile = async () => {
          if (!token) return;
    
          try {
            const user = await getProfile(token);
            dispatch(setProfile(user))
            console.log("User profile:", user);

          //   setProfileData(user); 
          } catch (err) {
            console.error('Failed to fetch profile', err);
          }
        };
    
      useEffect(() => {     
          fetchProfile();      
      }, [token , dispatch]);


      // handle logout 
      const navigate = useNavigate();
  
      const handleLogout = () => {
          dispatch(logout());
          localStorage.removeItem("TOKEN");
          localStorage.removeItem("USER");
          navigate("/auth/login");
      };


      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
          ...prevForm,
          [name]: value,
        }));
      };

      useEffect(() => {
        
        if (profile) {
          setForm((prevForm) => ({
            ...prevForm,
            name: profile.name || '',
            email: profile.email || '',
            mobile: profile.mobile || '',
            profileImage: profile.profileImage || '',
            billingAddress: profile.billingAddress || '',
            shippingAddress: profile.shippingAddress || '',
            city: profile.city || '',
            state: profile.state || '',
            pinCode: profile.pinCode || '',
            country: profile.country || '',
            companyName: profile.companyName || '',
            businessEmail: profile.businessEmail || '',
            businessType: profile.businessType || '',
            taxId: profile.taxId || '',
          }));
        }
      }, [profile]);


      // profile upload api 
      const [preview, setPreview] = useState<string | null>(null);

      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const token = localStorage.getItem('TOKEN') || '';
    
        if (file && token) {
          const formData = new FormData();
          formData.append('profileImage', file);
    
          setPreview(URL.createObjectURL(file)); // Show preview instantly
          //  Dispatch upload
          dispatch(uploadProfileImageThunk({ imageData: formData }));
        }
      };
    
      //  Cache-busting image URL (only if image exists)
      const imageURL = profile?.profileImage
      ? profile.profileImage.startsWith('/')
        ? `http://localhost:5000${profile.profileImage}?t=${new Date().getTime()}`
        : `${profile.profileImage}?t=${new Date().getTime()}`
      : '';
    

      // update profile details api call

      const handleProfileUpdate = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!token) return;

  // Only include profile-related fields (exclude password fields)
  const updatedData: any = {
    name: form.name,
    email: form.email,
    mobile: form.mobile,
    profileImage: form.profileImage,
    billingAddress: form.billingAddress,
    shippingAddress: form.shippingAddress,
    city: form.city,
    state: form.state,
    pinCode: form.pinCode,
    country: form.country,
    companyName: form.companyName,
    businessEmail: form.businessEmail,
    businessType: form.businessType,
    taxId: form.taxId,
  };

  // Clean up: remove empty strings to avoid MySQL constraint issues
  Object.keys(updatedData).forEach((key) => {
    if (updatedData[key] === "") {
      delete updatedData[key];
    }
  });

  try {
    await dispatch(updateProfileDetailsThunk({ profileData: updatedData })).unwrap();
    toast.success("Profile Updated Successfully");
  } catch (error: any) {
    console.error('Update Profile Error:', error);
    toast.error(error || "Failed to Update Profile");
  }
};



      
      
    return (
        <div className='flex flex-col space-y-2'>
           <div className='panel text-lg ps-5 mb-2 border-b pb-3'>Profile</div>

          <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
         
        
             <p className='ps-5 text-lg font-semibold'>Personal Information</p>
 <div>
  
 <div className='grid lg:grid-cols-2 gap-7 px-5'>
 <div className="mt-4 flex items-center">
                              <label htmlFor="Logo-of-Institute" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                              Profile Picture
                              </label>
                              <div className="w-24 h-24 border-2 border-gray-300 flex items-center justify-center cursor-pointer rounded-full overflow-hidden">
        <input
          id="logoUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <label htmlFor="logoUpload" className="w-full h-full  flex items-center justify-center">
          {imageURL ? (
            <img src={preview || imageURL} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500 text-xs">Upload Logo</span>
          )}
        </label>
      </div>
                          </div>
          <div className="mt-4 flex items-center">
                              <label htmlFor="Name-of-institute" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                              Full Name
                              </label>
                              <input onChange={handleInputChange} value={form.name} id="Name_Of_Institute" type="text" name="name" className="form-input flex-1" placeholder="Enter Full Name" />
                          </div>
                          
                          <div className="mt-4 flex items-center">
                              <label htmlFor="Email" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                            Email
                              </label>
                              <input onChange={handleInputChange} value={form.email} id="Email" type="email" name="email"  className="form-input flex-1" placeholder="Enter Email" />
                          </div>
          
       
          <div className="mt-4 flex items-center">
                              <label htmlFor="Mobile-number" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                              Mobile number
                              </label>
                              <input onChange={handleInputChange} value={form.mobile} id="Mobile_number" type="text" name="mobile" className="form-input flex-1" placeholder="Enter Mobile number" />
                          </div>
        
         
       
          </div>

          
 </div>

      </div>
      


 




      <div className='panel flex justify-between gap-3  items-center py-4'>
      <button onClick={handleProfileUpdate} type='button' className='btn btn-primary btn w-44 '>Save Changes</button>
     
       <div className='flex gap-4'>
       <button onClick={handleLogout} className='text-red-500 btn '>Logout</button>
       </div>
      
    </div>
      

      {/* contactus  */}

      <Contact/>

    
        </div>
    );
};

export default Profile;
