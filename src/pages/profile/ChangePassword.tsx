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
import { updatePasswordThunk } from '../../store/thunks/authThunks';
import { useAppDispatch } from '../../store/hooks';
import { toast } from 'react-toastify';
// import { Fragment } from 'react';


const ChangePassword = () => {
  const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Profile'));
    });
  
 const navigate = useNavigate();
  

  // api call get profile data 
  
      // get profile data 
      const token = useSelector((state: IRootState) => state.auth.token) as string
      const { error, successMessage, status } = useSelector((state: IRootState) => state.auth);
      // const profile = useSelector((state: IRootState) => state.auth.user); // Now from Redux
      // const [profile, setProfileData] = useState<any>(null);
  
      const [form , setForm] = useState({      
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
       
      });


    

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
          ...prevForm,
          [name]: value,
        }));
      };
      
      // password change api call 

      const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        // if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
        //   alert('All password fields are required.');
        //   return;
        // }
      
        // if (form.newPassword !== form.confirmPassword) {
        //   alert('New password and confirm password do not match.');
        //   return;
        // }
      
        // if (!token) {
        //   alert('User not authenticated');
        //   return;
        // }
      
        if (!token) return;

        try {
          
         await dispatch(
            updatePasswordThunk({
              currentPassword: form.currentPassword,
              newPassword: form.newPassword,
              confirmPassword: form.confirmPassword,
              token: token as string,
            })
          ).unwrap();
           
          toast.success("Password Updated Successfully");
  
          setForm((prev) => ({
            ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
          }));
          
          navigate("/");
          
        } catch (error : any) {
          toast.error(error || error.message || "Password Update Failed" )
        }
      
        
      
        
        
      };
      


      
     


    return (
        <div className='flex flex-col space-y-4'>
           <div className='panel text-lg ps-5 mb-3 border-b pb-3'>Change Password</div>

          
      {/* password */}
          <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
         
        
            
 <div>
  
  
 <div className='grid lg:grid-cols-2 gap-7 px-5'>

          <div className="mt-4 flex items-center">
                              <label htmlFor="Name-of-institute" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                              Current Password
                              </label>
                              <input id="Current_Password"   type="password"
  name="currentPassword"
  value={form.currentPassword}
  onChange={handleInputChange}  className="form-input flex-1" placeholder="Enter Current Password" />
                          </div>
          <div className="mt-4 flex items-center">
                              <label htmlFor="Name-of-institute" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                              New Password
                              </label>
                              <input  value={form.newPassword}
  onChange={handleInputChange} id="New_Password"   type="password" name="newPassword" className="form-input flex-1" placeholder="Enter New Password" />
                          </div>
          <div className="mt-4 flex items-center">
                              <label htmlFor="Name-of-institute" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                              Confirm Password
                              </label>
                              <input  value={form.confirmPassword}
  onChange={handleInputChange} id="Confirm_Password" type="password" name="confirmPassword" className="form-input flex-1" placeholder="Enter Confirm Password" />
                          </div>
                          
                          
        
         
       
          </div>

          
 </div>

      </div>




      <div className='panel flex justify-between gap-3  items-center py-4'>
      <button onClick={handleChangePassword} type='button' className='btn btn-primary btn-lg w-44 '>Save Changes</button>
     
       
      
    </div>
    
  <div>
    {status === 'loading' && <p>Changing password...</p>}
    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
  </div>

        </div>
    );
};

export default ChangePassword;
