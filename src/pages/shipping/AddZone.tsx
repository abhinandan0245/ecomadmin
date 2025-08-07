import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconPlus from '../../components/Icon/IconPlus';
import IconEdit from '../../components/Icon/IconEdit';
import IconEye from '../../components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const AddZone = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Add Zone'));
    });
 



    
    return (
        <div className='flex flex-col gap-4'>
            <div className='panel'>
              <p className='text-2xl font-bold w-1/3 '>Add New </p>
                
            </div>
            <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
                  
                  {/* add zone form here */}

                    <form className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex mb-4 items-center">
                            <label className="block text-sm font-medium  w-1/3">Zone Name</label>
                            <input type="text" className="input form-input input-bordered w-full" placeholder="Enter zone name" />
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block text-sm font-medium mb-2 w-1/3">Country</label>
                            <select name="country" id="_Country" className='form-select input input-bordered w-full'>
                                <option value="">Select Country</option>
                                <option value="india">india</option>
                                <option value="USA">USA</option>
                            </select>
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block text-sm font-medium mb-2 w-1/3">State</label>
                            <select name="state" id="_State" className='form-select input input-bordered w-full'>
                                <option value="">Select State</option>
                                <option value="Rajshthan">Rajshthan</option>
                                <option value="Gujrat">Gujrat</option>
                                
                            </select>
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block text-sm font-medium mb-2 w-1/3">Method Name</label>
                            <select name="methodName" id="_MethodName" className='form-select input input-bordered w-full'>
                                <option value="">Select Method Name</option>
                                <option value="Express">Express</option>
                                <option value="Standard">Standard</option>
                                <option value="Economy">Economy</option>
                                <option value="Free">Free</option>
                            </select>
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block text-sm font-medium mb-2 w-1/3">Type</label>
                            <select name="type" id="_Type" className='form-select input input-bordered w-full'>
                                <option value="">Select Type</option>
                                <option value="Pickup">Pickup</option>      
                                <option value="Delivery">Delivery</option>
                                <option value="Shipping">Shipping</option>
                                
                            </select>
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block text-sm font-medium mb-2 w-1/3">Estimated Date</label>
                            <select name="estimatedDate" id="_EstimatedDate" className='form-select input input-bordered w-full'>
                                <option value="">Select Estimated Date</option>
                                <option value="3-5 days">3-5 days</option>
                                <option value="5-7 days">5-7 days</option>
                                <option value="7-10 days">7-10 days</option>
                                <option value="10-15 days">10-15 days</option>
                               

                            </select>
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block text-sm font-medium mb-2 w-1/3">Price</label>
                            <input name='price' type="text" className="input form-input input-bordered w-full" placeholder="Enter price" />
                        </div>
                        </div>
                        <div className="flex justify-center my-5">
                            <button type="submit" className="btn btn-primary w-44">Save</button>
                        </div>
                    </form>
        </div>
        </div>
    );
};

export default AddZone;
