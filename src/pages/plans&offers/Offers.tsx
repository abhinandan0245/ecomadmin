import { Link, NavLink } from 'react-router-dom';
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
// import { Fragment } from 'react';


const Offers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice List'));
    });
  
// logo uploader 
    const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

    return (
        <div className='flex flex-col space-y-4'>
           <div className='panel text-lg ps-5 mb-3 border-b pb-3'>Profile Of institute</div>
          <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
         
        
 <div>
  
 <div className='grid lg:grid-cols-2 gap-10 px-5'>
          <div className="mt-4 flex items-center">
                              <label htmlFor="Name-of-institute" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                              Name of Institute
                              </label>
                              <input id="Name_Of_Institute" type="text" name="nameofinstitute" className="form-input flex-1" placeholder="Enter name of Institute" />
                          </div>
                          <div className="mt-4 flex items-center">
                              <label htmlFor="Logo-of-Institute" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                              Logo of Institute
                              </label>
                              <div className="w-24 h-24 border-2 border-gray-300 flex items-center justify-center cursor-pointer rounded-md overflow-hidden">
        <input
          id="logoUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <label htmlFor="logoUpload" className="w-full h-full flex items-center justify-center">
          {image ? (
            <img src={image} alt="Logo Preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500 text-xs">Upload Logo</span>
          )}
        </label>
      </div>
                          </div>
          <div className="mt-4 flex items-center">
                              <label htmlFor="Name-of-Representer" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                              Name of Representer 
                              </label>
                              <input id="Name_Of_Representer" type="text" name="nameofRepresentere" className="form-input flex-1" placeholder="Enter name of Representer" />
                          </div>
          
          <div className="mt-4 flex items-center">
                              <label htmlFor="Affiliation-number-of-institute" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                              Affiliation number of institute
                              </label>
                              <input id="Affiliation_number_ofinstitute" type="text" name="Affiliationnumberofinstitute" className="form-input flex-1" placeholder="Enter Affiliation number of institute" />
                          </div>
          <div className="mt-4 flex items-center">
                              <label htmlFor="Mobile-number" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                              Mobile number
                              </label>
                              <input id="Mobile_number" type="number" name="Mobile-number" className="form-input flex-1" placeholder="Enter Mobile number" />
                          </div>
          <div className="mt-4 flex items-center">
                              <label htmlFor="Alternative-Mobile-number" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                            Alternative Mobile number
                              </label>
                              <input id="Alternative_Mobile_number" type="number" name="Alternative-Mobile-number" className="form-input flex-1" placeholder="Enter Alternative Mobile number" />
                          </div>
          <div className="mt-4 flex items-center">
                              <label htmlFor="Email" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                            Email
                              </label>
                              <input id="Email" type="email" name="email" className="form-input flex-1" placeholder="Enter Email" />
                          </div>
          <div className="mt-4 flex items-center">
                              <label htmlFor="Session" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                            Session
                              </label>
                         <div className='flex gap-2 justify-center items-center flex-1'>
                         <select  className="border form-select p-2 flex-1">
              <option value="January">January</option>
              <option value="february">february</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="december">december</option>
            </select>
            <p>To</p>
            <select  className="border form-select p-2 flex-1">
              <option value="January">January</option>
              <option value="february">february</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="december">december</option>
            </select>
                         </div>
                          </div>
          <div className="mt-4 flex items-center">
                              <label htmlFor="landline-number" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                            Landline Number
                              </label>
                              <input id="Landline_Number" type="number" name="Landlinenumber" className="form-input flex-1" placeholder="Enter Landline umber" />
                          </div>
          <div className="mt-4 flex items-center">
                              <label htmlFor="Unique-id" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                            Unique Id
                              </label>
                              <input id="Unique_Id" type="text" name="Uniqueid" className="form-input flex-1" placeholder="Enter UniqueID" />
                          </div>
          </div>

          
 </div>

      </div>
      <div className='panel flex justify-center items-center py-4'>
      <button type='button' className='btn btn-primary btn-lg w-44 '>Save</button>
    </div>
        </div>
    );
};

export default Offers;
