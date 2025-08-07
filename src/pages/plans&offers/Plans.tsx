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
import { PlusCircle } from 'lucide-react';
// import { Fragment } from 'react';


const Plans = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice List'));

        
    });
  
// logo uploader 
const [yearlyPrice, setYearlyPrice] = useState<boolean>(false);
const [SelectedPlanPopUp, setSelectedPlanPopUp] = useState<any>(false);
//  transfer otp popup 
const SelectedPlanPopupOpen = (note: any = null) => {
    // setIsShowNoteMenu(false);
    // const json = JSON.parse(JSON.stringify(defaultParams));
    // setParams(json);
    // if (note) {
    //     let json1 = JSON.parse(JSON.stringify(note));
    //     setParams(json1);
    // }
    // settransferStdPopUp(false);
    setSelectedPlanPopUp(true);
};

const [selectedValue, setSelectedValue] = useState<string>("");
const [customValue, setCustomValue] = useState<string>("");

// amount details show 
const [amountDetails , setAmountDetails] = useState<boolean>(false)

    return (
        <div className='flex flex-col space-y-4'>
           <div className='panel text-2xl ps-5 mb-3 border-b pb-3 font-bold'>Plans</div>
         <div className='space-y-5'>
          {/* scholls  */}
          <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
         
        
 <div>
  
 <div className="mb-5">
    <div className="max-w-[320px] md:max-w-[1140px] mx-auto dark:text-white-dark">
        {/* <div className="mt-5 md:mt-10 text-center flex justify-center space-x-4 rtl:space-x-reverse font-semibold text-base">
            <span className={`${!yearlyPrice ? 'text-primary' : 'text-white-dark'}`}>Monthly</span>

            <label className="w-12 h-6 relative">
                <input
                    id="custom_switch_checkbox1"
                    type="checkbox"
                    className="custom_switch absolute ltr:left-0 rtl:right-0 top-0 w-full h-full opacity-0 z-10 cursor-pointer peer"
                    onChange={() => setYearlyPrice(!yearlyPrice)}
                />
                <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute ltr:before:left-1 rtl:before:right-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center ltr:peer-checked:before:left-7 rtl:peer-checked:before:right-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
            </label>
            <span className={`
elative  text-white-dark`}>
                Yearly
                <span className="badge bg-success rounded-full absolute ltr:left-full rtl:right-full whitespace-nowrap ltr:ml-2 rtl:mr-2 my-auto hidden">20% Off</span>
            </span>
        </div> */}
        <div className='text-2xl font-bold text-center'>Schools</div>
        <div className="md:flex space-y-4 md:space-y-0 mt-5  md:mt-16 text-white-dark">
            <div className="p-4 lg:p-9 border ltr:md:border-r-0 rtl:md:border-l-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-r-none rtl:md:rounded-l-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Monthly</h3>
                <p>cPanel/WHM included. Intel Xeon E3 with guaranteed 2GB RAM.</p>
                <div className="my-7 p-2.5 text-center text-lg">
                    <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">$25</strong> / monthly
                </div>
                <div className="mb-6">
                    <strong className="text-black dark:text-white-light text-[15px] mb-3 inline-block">Cloud Hosting Features</strong>
                    <ul className="space-y-3">
                        <li>Single Domain</li>
                        <li>50 GB SSD</li>
                        <li>1 TB Premium Bandwidth</li>
                    </ul>
                </div>
                <button onClick={SelectedPlanPopupOpen} type="button" className="btn btn-dark w-full">
                    Select
                </button>
            </div>
            <div className="relative p-4 pt-14 lg:p-9 border border-white-light dark:border-[#1b2e4b] transition-all duration-300 rounded-t-md">
                <div className="absolute top-0 md:-top-[30px] inset-x-0 bg-primary text-white h-10 flex items-center justify-center text-base rounded-t-md">Most Popular</div>
                <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Quaterly</h3>
                <p>cPanel/WHM included. Intel Xeon E5 with guaranteed 4GB RAM.</p>
                <div className="my-7 p-2.5 text-center text-lg">
                    <strong className="text-primary text-xl lg:text-4xl">$70</strong> / 3 Months
                </div>
                <div className="mb-6">
                    <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">VPS Hosting Features</strong>
                    <ul className="space-y-3">
                        <li>5 Domains</li>
                        <li>100 GB SSD</li>
                        <li>2 TB Premium Bandwidth</li>
                    </ul>
                </div>
                <button type="button" className="btn btn-primary w-full">
                    Select
                </button>
            </div>
            <div className="p-4 lg:p-9 border ltr:md:border-l-0 rtl:md:border-r-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-l-none rtl:md:rounded-r-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Half Yearly</h3>
                <p>cPanel/WHM included. Intel Xeon E5 with guaranteed 8GB RAM.</p>
                <div className="my-7 p-2.5 text-center text-lg">
                    <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">$115</strong> / 6 Months
                </div>
                <div className="mb-6">
                    <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">Business Hosting Features</strong>
                    <ul className="space-y-3">
                        <li>Unlimited Domains</li>
                        <li>1 TB SSD</li>
                        <li>5 TB Premium Bandwidth</li>
                    </ul>
                </div>
                <button type="button" className="btn btn-dark w-full">
                    Select
                </button>
            </div>
            <div className="p-4 lg:p-9 border ltr:md:border-l-0 rtl:md:border-r-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-l-none rtl:md:rounded-r-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Yearly</h3>
                <p>cPanel/WHM included. Intel Xeon E5 with guaranteed 8GB RAM.</p>
                <div className="my-7 p-2.5 text-center text-lg">
                    <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">$115</strong> / 1 Year
                </div>
                <div className="mb-6">
                    <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">Business Hosting Features</strong>
                    <ul className="space-y-3">
                        <li>Unlimited Domains</li>
                        <li>1 TB SSD</li>
                        <li>5 TB Premium Bandwidth</li>
                    </ul>
                </div>
                <button type="button" className="btn btn-dark w-full">
                    Select
                </button>
            </div>
        </div>
    </div>
</div>

          
 </div>

      </div>
     {/* Collage / univercity  */}
     <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
         
        
         <div>
          
         <div className="mb-5">
            <div className="max-w-[320px] md:max-w-[1140px] mx-auto dark:text-white-dark">
                {/* <div className="mt-5 md:mt-10 text-center flex justify-center space-x-4 rtl:space-x-reverse font-semibold text-base">
                    <span className={`${!yearlyPrice ? 'text-primary' : 'text-white-dark'}`}>Monthly</span>
        
                    <label className="w-12 h-6 relative">
                        <input
                            id="custom_switch_checkbox1"
                            type="checkbox"
                            className="custom_switch absolute ltr:left-0 rtl:right-0 top-0 w-full h-full opacity-0 z-10 cursor-pointer peer"
                            onChange={() => setYearlyPrice(!yearlyPrice)}
                        />
                        <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute ltr:before:left-1 rtl:before:right-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center ltr:peer-checked:before:left-7 rtl:peer-checked:before:right-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <span className={`
        elative  text-white-dark`}>
                        Yearly
                        <span className="badge bg-success rounded-full absolute ltr:left-full rtl:right-full whitespace-nowrap ltr:ml-2 rtl:mr-2 my-auto hidden">20% Off</span>
                    </span>
                </div> */}
                <div className='text-2xl font-bold text-center'>Collage/ Univercity</div>
                <div className="md:flex space-y-4 md:space-y-0 mt-5  md:mt-16 text-white-dark">
                    <div className="p-4 lg:p-9 border ltr:md:border-r-0 rtl:md:border-l-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-r-none rtl:md:rounded-l-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                        <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Monthly</h3>
                        <p>cPanel/WHM included. Intel Xeon E3 with guaranteed 2GB RAM.</p>
                        <div className="my-7 p-2.5 text-center text-lg">
                            <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">$25</strong> / monthly
                        </div>
                        <div className="mb-6">
                            <strong className="text-black dark:text-white-light text-[15px] mb-3 inline-block">Cloud Hosting Features</strong>
                            <ul className="space-y-3">
                                <li>Single Domain</li>
                                <li>50 GB SSD</li>
                                <li>1 TB Premium Bandwidth</li>
                            </ul>
                        </div>
                        <button type="button" className="btn btn-dark w-full">
                            Select
                        </button>
                    </div>
                    <div className="relative p-4 pt-14 lg:p-9 border border-white-light dark:border-[#1b2e4b] transition-all duration-300 rounded-t-md">
                        <div className="absolute top-0 md:-top-[30px] inset-x-0 bg-primary text-white h-10 flex items-center justify-center text-base rounded-t-md">Most Popular</div>
                        <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Quaterly</h3>
                        <p>cPanel/WHM included. Intel Xeon E5 with guaranteed 4GB RAM.</p>
                        <div className="my-7 p-2.5 text-center text-lg">
                            <strong className="text-primary text-xl lg:text-4xl">$70</strong> / 3 Months
                        </div>
                        <div className="mb-6">
                            <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">VPS Hosting Features</strong>
                            <ul className="space-y-3">
                                <li>5 Domains</li>
                                <li>100 GB SSD</li>
                                <li>2 TB Premium Bandwidth</li>
                            </ul>
                        </div>
                        <button type="button" className="btn btn-primary w-full">
                            Select
                        </button>
                    </div>
                    <div className="p-4 lg:p-9 border ltr:md:border-l-0 rtl:md:border-r-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-l-none rtl:md:rounded-r-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                        <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Half Yearly</h3>
                        <p>cPanel/WHM included. Intel Xeon E5 with guaranteed 8GB RAM.</p>
                        <div className="my-7 p-2.5 text-center text-lg">
                            <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">$115</strong> / 6 Months
                        </div>
                        <div className="mb-6">
                            <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">Business Hosting Features</strong>
                            <ul className="space-y-3">
                                <li>Unlimited Domains</li>
                                <li>1 TB SSD</li>
                                <li>5 TB Premium Bandwidth</li>
                            </ul>
                        </div>
                        <button type="button" className="btn btn-dark w-full">
                            Select
                        </button>
                    </div>
                    <div className="p-4 lg:p-9 border ltr:md:border-l-0 rtl:md:border-r-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-l-none rtl:md:rounded-r-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                        <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Yearly</h3>
                        <p>cPanel/WHM included. Intel Xeon E5 with guaranteed 8GB RAM.</p>
                        <div className="my-7 p-2.5 text-center text-lg">
                            <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">$115</strong> / 1 Year
                        </div>
                        <div className="mb-6">
                            <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">Business Hosting Features</strong>
                            <ul className="space-y-3">
                                <li>Unlimited Domains</li>
                                <li>1 TB SSD</li>
                                <li>5 TB Premium Bandwidth</li>
                            </ul>
                        </div>
                        <button type="button" className="btn btn-dark w-full">
                            Select
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
                  
         </div>
        
              </div>
         {/* coching / Institute  */}
         <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
         
        
         <div>
          
         <div className="mb-5">
            <div className="max-w-[320px] md:max-w-[1140px] mx-auto dark:text-white-dark">
                {/* <div className="mt-5 md:mt-10 text-center flex justify-center space-x-4 rtl:space-x-reverse font-semibold text-base">
                    <span className={`${!yearlyPrice ? 'text-primary' : 'text-white-dark'}`}>Monthly</span>
        
                    <label className="w-12 h-6 relative">
                        <input
                            id="custom_switch_checkbox1"
                            type="checkbox"
                            className="custom_switch absolute ltr:left-0 rtl:right-0 top-0 w-full h-full opacity-0 z-10 cursor-pointer peer"
                            onChange={() => setYearlyPrice(!yearlyPrice)}
                        />
                        <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute ltr:before:left-1 rtl:before:right-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center ltr:peer-checked:before:left-7 rtl:peer-checked:before:right-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <span className={`
        elative  text-white-dark`}>
                        Yearly
                        <span className="badge bg-success rounded-full absolute ltr:left-full rtl:right-full whitespace-nowrap ltr:ml-2 rtl:mr-2 my-auto hidden">20% Off</span>
                    </span>
                </div> */}
                <div className='text-2xl font-bold text-center'>Coching / Institute</div>
                <div className="md:flex space-y-4 md:space-y-0 mt-5  md:mt-16 text-white-dark">
                    <div className="p-4 lg:p-9 border ltr:md:border-r-0 rtl:md:border-l-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-r-none rtl:md:rounded-l-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                        <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Monthly</h3>
                        <p>cPanel/WHM included. Intel Xeon E3 with guaranteed 2GB RAM.</p>
                        <div className="my-7 p-2.5 text-center text-lg">
                            <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">$25</strong> / monthly
                        </div>
                        <div className="mb-6">
                            <strong className="text-black dark:text-white-light text-[15px] mb-3 inline-block">Cloud Hosting Features</strong>
                            <ul className="space-y-3">
                                <li>Single Domain</li>
                                <li>50 GB SSD</li>
                                <li>1 TB Premium Bandwidth</li>
                            </ul>
                        </div>
                        <button type="button" className="btn btn-dark w-full">
                            Select
                        </button>
                    </div>
                    <div className="relative p-4 pt-14 lg:p-9 border border-white-light dark:border-[#1b2e4b] transition-all duration-300 rounded-t-md">
                        <div className="absolute top-0 md:-top-[30px] inset-x-0 bg-primary text-white h-10 flex items-center justify-center text-base rounded-t-md">Most Popular</div>
                        <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Quaterly</h3>
                        <p>cPanel/WHM included. Intel Xeon E5 with guaranteed 4GB RAM.</p>
                        <div className="my-7 p-2.5 text-center text-lg">
                            <strong className="text-primary text-xl lg:text-4xl">$70</strong> / 3 Months
                        </div>
                        <div className="mb-6">
                            <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">VPS Hosting Features</strong>
                            <ul className="space-y-3">
                                <li>5 Domains</li>
                                <li>100 GB SSD</li>
                                <li>2 TB Premium Bandwidth</li>
                            </ul>
                        </div>
                        <button type="button" className="btn btn-primary w-full">
                            Select
                        </button>
                    </div>
                    <div className="p-4 lg:p-9 border ltr:md:border-l-0 rtl:md:border-r-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-l-none rtl:md:rounded-r-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                        <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Half Yearly</h3>
                        <p>cPanel/WHM included. Intel Xeon E5 with guaranteed 8GB RAM.</p>
                        <div className="my-7 p-2.5 text-center text-lg">
                            <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">$115</strong> / 6 Months
                        </div>
                        <div className="mb-6">
                            <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">Business Hosting Features</strong>
                            <ul className="space-y-3">
                                <li>Unlimited Domains</li>
                                <li>1 TB SSD</li>
                                <li>5 TB Premium Bandwidth</li>
                            </ul>
                        </div>
                        <button type="button" className="btn btn-dark w-full">
                            Select
                        </button>
                    </div>
                    <div className="p-4 lg:p-9 border ltr:md:border-l-0 rtl:md:border-r-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-l-none rtl:md:rounded-r-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                        <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Yearly</h3>
                        <p>cPanel/WHM included. Intel Xeon E5 with guaranteed 8GB RAM.</p>
                        <div className="my-7 p-2.5 text-center text-lg">
                            <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">$115</strong> / 1 Year
                        </div>
                        <div className="mb-6">
                            <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">Business Hosting Features</strong>
                            <ul className="space-y-3">
                                <li>Unlimited Domains</li>
                                <li>1 TB SSD</li>
                                <li>5 TB Premium Bandwidth</li>
                            </ul>
                        </div>
                        <button type="button" className="btn btn-dark w-full">
                            Select
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
                  
         </div>
        
              </div>


         </div>
         
                                 {/*transfer approve otp  popup  */}
                                 <Transition appear show={SelectedPlanPopUp} as={Fragment}>
                                                                    <Dialog as="div" open={SelectedPlanPopUp} onClose={() => setSelectedPlanPopUp(false)} className="relative z-[51]">
                                                                        <Transition.Child
                                                                            as={Fragment}
                                                                            enter="ease-out duration-300"
                                                                            enterFrom="opacity-0"
                                                                            enterTo="opacity-100"
                                                                            leave="ease-in duration-200"
                                                                            leaveFrom="opacity-100"
                                                                            leaveTo="opacity-0"
                                                                        >
                                                                            <div className="fixed inset-0 bg-[black]/60" />
                                                                        </Transition.Child>
                                            
                                                                        <div className="fixed inset-0 overflow-y-auto">
                                                                            <div className="flex min-h-full items-center justify-center px-4 py-8">
                                                                                <Transition.Child
                                                                                    as={Fragment}
                                                                                    enter="ease-out duration-300"
                                                                                    enterFrom="opacity-0 scale-95"
                                                                                    enterTo="opacity-100 scale-100"
                                                                                    leave="ease-in duration-200"
                                                                                    leaveFrom="opacity-100 scale-100"
                                                                                    leaveTo="opacity-0 scale-95"
                                                                                >
                                                                                    <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() => setSelectedPlanPopUp(false)}
                                                                                            className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                                                                        >
                                                                                            <IconX />
                                                                                        </button>
                                                                                        <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                                                                            {/* {params.id ? 'Edit Note' : 'Add Note'} */}
                                                                                            Plan Name
                                                                                        </div>
                                                                                        
                                                                                       
                                                                                        <div className="p-5">
                                                                                            <form>
                                                                                               
                                                                                            
                                                                                            <div className="mb-3 flex">
      <label htmlFor="Class" className="w-1/4">
        No Of Users 
      </label>
      <div className="flex-1">
        <select
          id="Class"
          name="Class"
          className="form-select w-full"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <option value="">Choose No Of Users</option>
          <option value="0-100">0-100</option>
          <option value="100-250">100-250</option>
          <option value="250-500">250-500</option>
          <option value="500-1000">500-1000</option>
          <option value="1000-2500">1000-2500</option>
          <option value="2500-5000">2500-5000</option>
          <option value="other">Other</option>
        </select>

        {selectedValue === "other" && (
          <input
            type="number"
            className="mt-2 p-2 border rounded w-full form-input"
            placeholder="Enter custom number"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
          />
        )}
      </div>
    </div>
                                                            <div className='flex mb-4'>
                                                                <label htmlFor="coupun" className='w-1/4'>Apply Coupon</label><input type="number" name="coupon" id="_coupon" placeholder='Enter Your Coupon' className='flex-1 form-input' /><span className='btn btn-sm btn-dark'>Apply</span>
                                                            </div>
                                                            <div className='flex  '>
                                                                <label htmlFor="Amount" className='w-1/4'>Amount</label> <div className='flex gap-2 items-center'><p>30000</p> <span className='' onClick={()=> setAmountDetails(!amountDetails)}><PlusCircle className='size-4 cursor-pointer'/></span></div>
                                                            </div>
                                                                                                {
                                                                                                    amountDetails && (
                                                                                                        <div className='ml-32 w-1/4'>
                                                                                                        <div className='flex gap-2 justify-between'>
                                                                                                        <p>gst:</p><p>3500</p>
                                                                                                        </div>
                                                                                                        <div className='flex gap-2 justify-between'>
                                                                                                        <p>gst:</p><p>3500</p>
                                                                                                        </div>
                                                                                                        <div className='flex gap-2 justify-between'>
                                                                                                        <p>Total:</p><p>3500</p>
                                                                                                        </div>
                                                                                                     </div>
                                                                                                    )
                                                                                                }
                                                          
                                                                                                
                                                                                                
                                                                                               
                                                                                                <div className="flex justify-center items-center mt-8">
                                                                                                <button onClick={() => setSelectedPlanPopUp(false)} type="button" className="btn btn-success ltr:ml-4 rtl:mr-4" >
                                                                                                        {/* {params.id ? 'Update Note' : 'Add Note'} */}
                                                                                                        Pay Now 
                                                                                                    </button>
                                                                                                  
                                                                                                    <button type="button" className="btn btn-outline-danger gap-2 ltr:ml-4 rtl:mr-4" onClick={() => setSelectedPlanPopUp(false)}>
                                                                                                        Cancel
                                                                                                    </button>
                                                                                                   
                                                                                                </div>
                                                                                            </form>
                                                                                        </div>
                                                                                    </Dialog.Panel>
                                                                                </Transition.Child>
                                                                            </div>
                                                                        </div>
                                                                    </Dialog>
                                                                </Transition>
        </div>
    );
};

export default Plans;
