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
import { Dialog, Transition  } from '@headlessui/react';
import { Fragment, useState, useEffect, useRef } from 'react';
import IconX from '../../components/Icon/IconX';
import IconCamera from '../../components/Icon/IconCamera';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Tab } from '@headlessui/react';
import AnimateHeight from 'react-animate-height';
import IconArrowWaveLeftUp from '../../components/Icon/IconArrowWaveLeftUp';
import IconDesktop from '../../components/Icon/IconDesktop';
import IconUser from '../../components/Icon/IconUser';
import IconBox from '../../components/Icon/IconBox';
import IconDollarSignCircle from '../../components/Icon/IconDollarSignCircle';
import IconRouter from '../../components/Icon/IconRouter';
import IconPlusCircle from '../../components/Icon/IconPlusCircle';
import IconMinusCircle from '../../components/Icon/IconMinusCircle';
// import { IconPlusCircle, IconMinusCircle } from "lucide-react";
import { IconTrash, IconArrowUp, IconArrowDown } from "@tabler/icons-react";

const Information = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice List'));
    });
  

    // timearnge 
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    // princilple image 
    const [image, setImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

   


    // facilities 
    const [facilities, setFacilities] = useState<string[]>([""]);

    const handleAddField = () => {
      setFacilities([...facilities, ""]);
    };
  
    const handleRemoveField = (index: number) => {
      setFacilities(facilities.filter((_, i) => i !== index));
    };
  
    const handleChange = (index: number, value: string) => {
      const updatedFacilities = [...facilities];
      updatedFacilities[index] = value;
      setFacilities(updatedFacilities);
    };
    // features
    const [features, setFeatures] = useState<string[]>([""]);

    const handleAddfeatures = () => {
      setFeatures([...features, ""]);
    };
  
    const handleRemovefeatures = (index: number) => {
      setFeatures(features.filter((_, i) => i !== index));
    };
  
    const handleChangeFeatures = (index: number, value: string) => {
      const updatedFeatures = [...features];
      updatedFeatures[index] = value;
      setFeatures(updatedFeatures);
    };


    // image of institute 
    const [images, setImages] = useState<(string | null)[]>(Array(6).fill(null));

  const handleInstImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = [...images];
        updatedImages[index] = reader.result as string;
        setImages(updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };
    //  upload image
  
    const [uploadImage, setUploadImage] = useState<string | null>(null);

    const handleUploadImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };


    // addmore top student form 

    
    //  const [addTopStds, setAddTopStds] = useState<string[]>([""]);
    const [addTopStds, setAddTopStds] = useState<{ name: string; class: string; percentage: string; image: string }[]>([
      { name: "", class: "", percentage: "", image: "" }
    ]);
    

    //  const handleAddStdForm = () => {
    //     setAddTopStds([...addTopStds, ""]);
    //  };
    const handleAddStdForm = () => {
      setAddTopStds([...addTopStds, { name: "", class: "", percentage: "", image: "" }]);
    };
    
    const handleTopStdChange = (index: number, field: string, event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value; // ✅ Now TypeScript knows the correct type!
      
      setAddTopStds((prev) => {
        const updatedStds = [...prev];
        updatedStds[index] = { ...updatedStds[index], [field]: value };
        return updatedStds;
      });
    };
    
    
   
     const handleRemoveStdForm = (index: number) => {
        setAddTopStds(addTopStds.filter((_, i) => i !== index));
     };

     const handleTopStdUploadImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          const updatedStds = [...addTopStds];
          updatedStds[index].image = reader.result as string;
          setAddTopStds(updatedStds);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    };
    

     //  upload achievemnet  image
  
    const [achievementImage, setAchivementImage] = useState<string | null>(null);

    const handleAchievementImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setAchivementImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    // addmore acheivement form 

    
     const [addAchievements, setAddAchievements] = useState<string[]>([""]);

     const handleAddAchievements = () => {
        setAddAchievements([...addAchievements, ""]);
     };
   
     const handleRemoveAchievements = (index: number) => {
        setAddAchievements(addAchievements.filter((_, i) => i !== index));
     };

    //  gallary 

    const [galleryImages, setGalleryImages] = useState<string[]>([""]);

    const handleGalleryImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const updatedImages = [...galleryImages];
          updatedImages[index] = reader.result as string;
          setGalleryImages(updatedImages);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleAddGallery = () => {
        setGalleryImages([...galleryImages, ""]);
    };
  
    const handleRemoveGallery = (index: number) => {
      if (galleryImages.length > 1) {
        setGalleryImages(galleryImages.filter((_, i) => i !== index));
      }
    };

    // Eligibility Criteria add section
  

    
    // const [addEligiblities, setAddEligiblities] = useState<string[]>([""]);

    // const handleAddEligiblities = () => {
    //     setAddEligiblities([...addEligiblities, ""]);
    // };
  
    // const handleRemoveEligiblities = (index: number) => {
    //     setAddEligiblities(addEligiblities.filter((_, i) => i !== index));
    // };
    
 
    // eligibility criteria bulletins
  //   const [selectedClass, setSelectedClass] = useState("8");
  // const [items, setItems] = useState<string[]>([]);
  // const [inputValue, setInputValue] = useState("");

  // const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedClass(event.target.value);
  // };

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value);
  // };

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter" && inputValue.trim() !== "") {
  //     setItems([...items, inputValue]);
  //     setInputValue("");
  //   }
  // };
  
 

  // ******************************** 
  // const handleAddEligiblities = () => {
  //   setAddEligiblities([...addEligiblities, { selectedClass: "8", items: [] }]);
  // };

  // const handleRemoveEligiblities = (index: number) => {
  //   setAddEligiblities(addEligiblities.filter((_, i) => i !== index));
  // };

  // const handleClassChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const updatedEligibilities = [...addEligiblities];
  //   updatedEligibilities[index].selectedClass = event.target.value;
  //   setAddEligiblities(updatedEligibilities);
  // };

  // const handleInputChange = (index: number, value: string) => {
  //   const updatedEligibilities = [...addEligiblities];
  //   updatedEligibilities[index].items = [...updatedEligibilities[index].items, value];
  //   setAddEligiblities(updatedEligibilities);
  // };


  //  // preview part  dropdown 
  //  const [active, setActive] = useState<Number>();
  //  const togglePara = (value: Number) => {
  //      setActive((oldValue) => {
  //          return oldValue === value ? 0 : value;
  //      });
  //  };
  //  const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
  //  const [activeTab, setActiveTab] = useState<String>('general');
  //  const [active1, setActive1] = useState<any>(1);
  //  const [active2, setActive2] = useState<any>(1);


  //  chat 
  // const [addEligiblities, setAddEligiblities] = useState([
  //   { selectedClass: "8", items: [] }
  // ]);
  // 8*******
  // const [addEligiblities, setAddEligiblities] = useState<{ selectedClass: string; items: string[] }[]>([
  //   { selectedClass: "8", items: [] }
  // ]);

  // const [active, setActive] = useState<number | null>(null);

  // const handleAddEligiblities = () => {
  //   setAddEligiblities([...addEligiblities, { selectedClass: "8", items: [] }]);
  // };

  // const handleRemoveEligiblities = (index: number) => {
  //   setAddEligiblities(addEligiblities.filter((_, i) => i !== index));
  // };

  // const handleClassChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const updatedEligibilities = [...addEligiblities];
  //   updatedEligibilities[index].selectedClass = event.target.value;
  //   setAddEligiblities(updatedEligibilities);
  // };
   
  
  // const handleInputChange = (index: number, value: string) => {
  //   setAddEligiblities((prev) => {
  //     const updatedEligibilities = [...prev];
  //     updatedEligibilities[index] = {
  //       ...updatedEligibilities[index],
  //       items: [...(updatedEligibilities[index].items || []), value], // Ensure items is an array
  //     };
  //     return updatedEligibilities;
  //   });
  // };
  
  const [eligibilities, setEligibilities] = useState<{ [key: string]: string[] }>({});
  const [selectedClass, setSelectedClass] = useState("6");
  const [active, setActive] = useState<number | null>(null);

  const handleAddBulletPoint = (value: string) => {
    if (!value.trim()) return;
    setEligibilities((prev) => ({
      ...prev,
      [selectedClass]: [...(prev[selectedClass] || []), value],
    }));
  };

  const handleRemoveBulletPoint = (classKey: string, index: number) => {
    setEligibilities((prev) => {
      const updatedItems = [...prev[classKey]];
      updatedItems.splice(index, 1);
      return { ...prev, [classKey]: updatedItems };
    });
  };

  const handleMoveBulletPoint = (classKey: string, index: number, direction: "up" | "down") => {
    setEligibilities((prev) => {
      const updatedItems = [...prev[classKey]];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= updatedItems.length) return prev;
      [updatedItems[index], updatedItems[newIndex]] = [updatedItems[newIndex], updatedItems[index]];
      return { ...prev, [classKey]: updatedItems };
    });
  };



  // fee structure 

  const [feeStructure, setFeeStructure] = useState<{ [key: string]: string[] }>({});
  const [selectedClassFs, setSelectedClassFs] = useState("Select class");
  const [activeFs, setActiveFs] = useState<number | null>(null);
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");

  const handleAddBulletPointFs = () => {
    if (!details.trim() || !price.trim() || selectedClassFs === "Select class") return;
    const newEntry = `${details} - $${price}`;
    
    setFeeStructure((prev) => ({
      ...prev,
      [selectedClassFs]: [...(prev[selectedClassFs] || []), newEntry],
    }));

    setDetails("");
    setPrice("");
  };

  const handleRemoveBulletPointFs = (classKey: string, index: number) => {
    setFeeStructure((prev) => {
      const updatedItems = [...prev[classKey]];
      updatedItems.splice(index, 1);
      return { ...prev, [classKey]: updatedItems };
    });
  };

  const handleMoveBulletPointFs = (classKey: string, index: number, direction: "up" | "down") => {
    setFeeStructure((prev) => {
      const updatedItems = [...prev[classKey]];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= updatedItems.length) return prev;
      [updatedItems[index], updatedItems[newIndex]] = [updatedItems[newIndex], updatedItems[index]];
      return { ...prev, [classKey]: updatedItems };
    });
  };


    return (
        <div className=" px-0 border-white-light dark:border-[#1b2e4b]">
           <Tab.Group>

   <div className='panel w-full '>
   <Tab.List className="  flex flex-wrap justify-center">
        <Tab as={Fragment}>
            {({ selected }) => (
                <button
                    className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''} relative -mb-[1px] w-52 flex items-center justify-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                >
                    {/* <svg>...</svg> */}
                    Info
                </button>
            )}
        </Tab>
        <Tab as={Fragment}>
            {({ selected }) => (
                <button
                    className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''} relative -mb-[1px] w-52 flex items-center justify-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                >
                    {/* <svg>...</svg> */}
                    Banner Images.
                </button>
            )}
        </Tab>
        <Tab as={Fragment}>
            {({ selected }) => (
                <button
                    className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''} relative -mb-[1px] w-52 flex items-center justify-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                >
                    {/* <svg>...</svg> */}
                    Top students
                </button>
            )}
        </Tab>
        <Tab as={Fragment}>
            {({ selected }) => (
                <button
                    className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''} relative -mb-[1px] w-52 flex items-center justify-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                >
                    {/* <svg>...</svg> */}
                    Achievements
                </button>
            )}
        </Tab>
        <Tab as={Fragment}>
            {({ selected }) => (
                <button
                    className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''} relative -mb-[1px] w-52 flex items-center justify-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                >
                    {/* <svg>...</svg> */}
                    Gallery
                </button>
            )}
        </Tab>
        <Tab as={Fragment}>
            {({ selected }) => (
                <button
                    className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''} relative -mb-[1px] w-52 flex items-center justify-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                >
                    {/* <svg>...</svg> */}
                    Eligibility criteria
                </button>
            )}
        </Tab>
        <Tab as={Fragment}>
            {({ selected }) => (
                <button
                    className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''} relative -mb-[1px] w-52 flex items-center justify-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                >
                    {/* <svg>...</svg> */}
                    Fee structure
                </button>
            )}
        </Tab>
    </Tab.List>
   </div>
   <div className=' py-3'>
   <Tab.Panels>
    {/* info  */}
    <Tab.Panel>
        <div className="active pt-5">
            <h4 className="panel mb-4 text-2xl font-semibold">Information!</h4>
            <div className='panel grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className="mt-4 flex items-center">
                                <label htmlFor="reciever-Name-Of-Institute" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Name Of Institute
                                </label>
                                <input id="reciever-name" type="text" name="reciever-name-of-institute" className="form-input flex-1" placeholder="Enter Name of Institute" />
                            </div>
            <div className="mt-4 flex items-center">
                                <label htmlFor="reciever-Location" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Location Of Institute
                                </label>
                                <input id="reciever-location" type="text" name="reciever-location" className="form-input flex-1" placeholder="Enter loaction of institute" />
                            </div>
            <div className="mt-4 flex items-center">
                                <label htmlFor="reciever-timing" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Timimg
                                </label>
                              <div className='flex flex-1 gap-5 w-full items-center '>
                              <select
        id="start-time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="form-select w-[45%]"
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
          ["AM", "PM"].map((period) => (
            <option key={`${hour}-${period}`} value={`${hour} ${period}`}>{`${hour} ${period}`}</option>
          ))
        ))}
      </select>
      <span>to</span>
      <select
        id="end-time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="form-select w-[45%]"
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
          ["AM", "PM"].map((period) => (
            <option key={`${hour}-${period}`} value={`${hour} ${period}`}>{`${hour} ${period}`}</option>
          ))
        ))}
      </select>
                              </div>
                            </div>
                            
                            
                            <div className="mt-4 flex items-center space-x-4">
      <label htmlFor="image-upload" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Image of Principle</label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="form-input flex-1"
      />
      {image && <img src={image} alt="Uploaded" className="w-16 h-16 object-cover rounded" />}
    </div>
            <div className="mt-4 flex items-center">
                                <label htmlFor="reciever-Message-from-principal" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                Message from principal
                                </label>
                                <input id="reciever-Message-fromprincipal" type="text" name="reciever-Message-from-principal" className="form-input flex-1" placeholder="Enter Message from principal" />
                            </div>
            <div className="mt-4 flex items-center">
                                <label htmlFor="reciever-About-us-of-institute" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                About us of institute
                                </label>
                                <input id="reciever-About-us-of-institute" type="text" name="reciever-About-us-of-institute" className="form-input flex-1" placeholder="Enter About us of institute" />
                            </div>
                            <div className="mt-4  flex items-start">
      <label className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Facilities of Institute</label>
        <div className='flex-1'>
      {facilities.map((facility, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            name={`facility-${index}`}
            value={facility}
            onChange={(e) => handleChange(index, e.target.value)}
            className="form-input flex-1"
            placeholder="Enter Facility"
          />
          {index > 0 && (
            <button
            type="button"
            onClick={() => handleRemoveField(index)}
            className="btn btn-danger btn-sm text-white rounded"
          >
            Remove
          </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddField}
        className="mt-2  btn btn-primary btn-sm text-white rounded"
      >
        Add More
      </button>
        </div>
    </div>
            <div className="mt-4 flex items-start">
                                <label htmlFor="reciever-Features-of-institute" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                Features of institute
                                </label>
                               <div className=' flex-1 '>
                               {features.map((feature , index) => (
                                <div key={index} className='flex items-center space-x-2 mb-2'>
                                <input name={`feature-${index}`}
            value={feature}
            onChange={(e) => handleChangeFeatures(index, e.target.value)} id="reciever-Features-of-institute" type="text"  className="form-input flex-1" placeholder="Enter  Features of institute" />{index > 0 && (<button  onClick={() => handleRemovefeatures(index)} className="btn btn-danger btn-sm text-white rounded" type='button'>Remove</button>)}
                                </div>
                               ))}
                               <button onClick={handleAddfeatures} className="mt-2 btn btn-primary btn-sm text-white rounded" type='button'>AddMore</button>
                               </div>
                            </div>

            </div>
           <div className='panel flex justify-center items-center mt-10'>
           <button type='button' className='w-44 h-10 bg-primary rounded hover:shadow-lg shadow-primary text-white'>Save/Next</button>
           </div>
        </div>
    </Tab.Panel>
    {/* image of institute  */}
    <Tab.Panel>
        <div>
        <div className="mt-4">
      <div className="panel mb-7 block text-lg font-semibold">Image of institute For Banner</div>
      <div className="panel grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="w-20 h-20 border flex items-center justify-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id={`upload-${index}`}
              onChange={(e) => handleInstImageChange(index, e)}
            />
            <label htmlFor={`upload-${index}`} className="w-full h-full flex items-center justify-center">
              {image ? (
                <img src={image} alt={`Uploaded ${index}`} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-xs">Upload</span>
              )}
            </label>
          </div>
        ))}
      </div>
      <div className='panel flex justify-center items-center mt-5'>
           <button type='button' className='w-44 h-10 bg-primary rounded hover:shadow-lg shadow-primary text-white'>Save/Next</button>
           </div>
    </div>
        </div>
    </Tab.Panel>
    {/* top student  */}
    <Tab.Panel>
    <div className="active pt-5">
    <h4 className="panel mb-4 text-2xl font-semibold">Top Students!</h4>
            {addTopStds.map((addTopStd , index) => (
                <div key={index}  className='mb-4 panel'>
                     <div className='flex justify-end'>
            {index > 0 && (<button onClick={() => handleRemoveStdForm(index)} className='text-danger border rounded-full size-5 text-sm text-center border-danger'>X</button>)}
           </div>

<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 pb-10'>
                <div className="mt-4 flex items-center">
                                    <label htmlFor="reciever-Name-Of-Institute" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                        Name Of Student
                                    </label>
                                    <input id="reciever-name" type="text"
  value={addTopStds[index].name}
  onChange={(e) => handleTopStdChange(index, "name", e)}  name="reciever-name-of-institute" className="form-input flex-1" placeholder="Enter Name of Student" />
                                </div>
                <div className="mt-4 flex items-center">
                                    <label htmlFor="reciever-Location" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                        Class of Student
                                    </label>
                                    <input id="reciever-location" type="text" value={addTopStds[index].class}
  onChange={(e) => handleTopStdChange(index, "class", e)}  name="reciever-location" className="form-input flex-1" placeholder="Enter Class of Student" />
                                </div>
               
                                <div className="mt-4 flex items-center">
                                    <label htmlFor="reciever-Message-from-principal" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Scored Percentage
                                    </label>
                                    <input id="reciever-Message-fromprincipal" type="text"  value={addTopStds[index].percentage}
  onChange={(e) => handleTopStdChange(index, "percentage", e)} name="percentage" className="form-input flex-1" placeholder="Enter Scored percentage" />
                                </div>
                                
                                <div className="mt-4 flex items-center space-x-4">
          <label htmlFor="image-upload" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Upload Image</label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={(e) => handleTopStdUploadImageChange(index, e)}
            className="form-input flex-1"
          />
          {addTopStds[index].image  && <img src={addTopStds[index].image} alt="Uploaded" className="w-16 h-16 object-cover rounded" />}
        </div>
                
               
                            
    
                </div>
                </div>
            ))}
            
           <div className='panel flex justify-center gap-8 items-center mt-5'>
           <button onClick={handleAddStdForm} type='button' className='w-44 h-10 bg-primary rounded hover:shadow-lg shadow-primary text-white'>AddMore</button>

           <button type='button' className='w-44 h-10 bg-primary rounded hover:shadow-lg shadow-primary text-white'>Save/Next</button>
           </div>
        </div>
    </Tab.Panel>
    {/* Achievements  */}

    <Tab.Panel>
         <div className="active pt-5">
         <h4 className="panel mb-4 text-2xl font-semibold">Acheivements!</h4>
            {addAchievements.map((addAchievement , index) => (
                <div key={index}  className='panel mb-4'>
                     <div className='flex justify-end'>
            {index > 0 && (<button onClick={() => handleRemoveAchievements(index)} className='text-danger border rounded-full size-5 text-sm text-center border-danger'>X</button>)}
           </div>

<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 pb-10'>
                <div className="mt-4 flex items-center">
                                    <label htmlFor="reciever-Name-Of-Institute" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                        Name Of Acheivement
                                    </label>
                                    <input id="reciever-name" type="text" name="reciever-name-of-institute" className="form-input flex-1" placeholder="Enter Name of Acheivement" />
                                </div>
                <div className="mt-4 flex items-center">
                                    <label htmlFor="reciever-Location" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                        year of Acheivement
                                    </label>
                                    <input id="reciever-location" type="text" name="reciever-location" className="form-input flex-1" placeholder="Enter Year of Acheivement" />
                                </div>
               
                                <div className="mt-4 flex items-center">
                                    <label htmlFor="reciever-Message-from-principal" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    summary of achievement
                                    </label>
                                    <input id="reciever-Message-fromprincipal" type="text" name="reciever-Message-from-principal" className="form-input flex-1" placeholder="Enter Summary of Acheivement" />
                                </div>
                                
                                <div className="mt-4 flex items-center space-x-4">
          <label htmlFor="image-upload" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Upload Image of acheivement</label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleAchievementImageChange}
            className="form-input flex-1"
          />
          {achievementImage && <img src={achievementImage} alt="Uploaded" className="w-16 h-16 object-cover rounded" />}
        </div>
                
               
                            
    
                </div>
                </div>
            ))}
          
           <div className='panel flex justify-center gap-8 items-center mt-5'>
           <button onClick={handleAddAchievements} type='button' className='w-44 h-10 bg-primary rounded hover:shadow-lg shadow-primary text-white'>AddMore</button>
           <button type='button' className='w-44 h-10 bg-primary rounded hover:shadow-lg shadow-primary text-white'>Save/Next</button>
           </div>
        </div>
    </Tab.Panel>
    {/* gallery  */}
    <Tab.Panel>
    <div className="mt-5">
      <div className="panel mb-4 block text-lg font-semibold">Upload Images</div>
      <div className="panel grid grid-cols-3 gap-4 ">
        {galleryImages.map((image, index) => (
          <div key={index} className="w-24 h-24 border flex items-center justify-center relative">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id={`upload-${index}`}
              onChange={(e) => handleGalleryImageChange(index, e)}
            />
            <label htmlFor={`upload-${index}`} className="w-full h-full flex items-center justify-center cursor-pointer">
              {image ? (
                <img src={image} alt={`Uploaded ${index}`} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-xs">Upload</span>
              )}
            </label>
            {galleryImages.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveGallery(index)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>
     <div className='panel mt-4'>
     <button
        type="button"
        onClick={handleAddGallery}
        className=" btn btn-primary  text-white rounded"
      >
        Add More
      </button>
     </div>
    </div>
    </Tab.Panel>
    {/* Eligibility criteria  */}
    <Tab.Panel>
    <div className="mt-5">
      <h4 className="panel text-2xl font-semibold">Eligibility Criteria</h4>
      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        {/* Form Part */}
        <div>
        <div className="panel border p-4 rounded mb-4">
          <label className="block mb-2">Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="form-select p-2 mb-4 w-44"
          >
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>
          <input
            type="text"
            placeholder="Enter text and press Enter"
            className="form-input border p-2 w-full mb-2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
                handleAddBulletPoint(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
          <ul className="list-disc pl-5 text-gray-700">
            {(eligibilities[selectedClass] || []).map((item, i) => (
              <li key={i} className="list-item ">
                <div className='flex justify-between items-center group'>
                <span>{item}</span>
                <div className='hidden group-hover:flex  '>
                <div className="flex items-center gap-2 ml-2  ">
                  <button onClick={() => handleMoveBulletPoint(selectedClass, i, "up")}>
                    <IconArrowUp size={16} />
                  </button>
                  <button onClick={() => handleMoveBulletPoint(selectedClass, i, "down")}>
                    <IconArrowDown size={16} />
                  </button>
                  <button
                    onClick={() => handleRemoveBulletPoint(selectedClass, i)}
                    className="text-danger"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
                </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className='panel'>
        <button type='button' className='btn btn-primary w-44'>Save</button>
        </div>
        </div>
        
        {/* Preview Part */}
        <div className="panel border p-4 rounded">
          <h4 className="text-xl font-semibold mb-4">Preview</h4>
          {Object.entries(eligibilities).map(([classKey, items], index) => (
            <div key={classKey}>
              <div
                className={`flex cursor-pointer justify-between p-2 bg-gray-200 rounded mb-2 ${
                  active === index ? "bg-primary-light text-primary" : ""
                }`}
                onClick={() => setActive(active === index ? null : index)}
              >
                <span>Class {classKey}</span>
                <div>{active === index ? <IconMinusCircle/> : <IconPlusCircle/>}</div>
              </div>
              <AnimateHeight duration={300} height={active === index ? "auto" : 0}>
                <ul className="list-disc pl-5 text-gray-700">
                  {items.length > 0 ? (
                    items.map((item, i) => <li key={i}>{item}</li>)
                  ) : (
                    <li>No criteria added yet.</li>
                  )}
                </ul>
              </AnimateHeight>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Tab.Panel>
    {/* fee structure  */}
    <Tab.Panel>
    <div className="active pt-5">
      <div className="panel mb-4">
        <p className="text-2xl font-semibold">Fee Structure</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Form Section */}
        <div>
          <div className="panel p-4">
            <div className="flex items-center w-1/2 mb-4">
              <label htmlFor="Class" className="w-1/3">Class:</label>
              <select
                className="form-select"
                value={selectedClassFs}
                onChange={(e) => setSelectedClassFs(e.target.value)}
              >
                <option value="Select class">Select class</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
              </select>
            </div>

            <div className="flex gap-5 items-center w-full">
              <div className="flex items-center w-1/2">
                <label htmlFor="Details" className="w-1/4">Details:</label>
                <input
                  className="flex-1 form-input"
                  type="text"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddBulletPointFs()}
                  placeholder="Enter Details"
                />
              </div>
              <div className="flex items-center w-1/2">
                <label htmlFor="Price" className="w-1/4">Price:</label>
                <input
                  className="flex-1 form-input"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddBulletPointFs()}
                  placeholder="Enter Price and Press Enter"
                />
              </div>
            </div>

            {/* Bullet Points List */}
            <ul className="list-disc pl-5 mt-4">
              {(feeStructure[selectedClassFs] || []).map((item, i) => (
                <li key={i} className="list-item ">
                  <div className=" flex justify-between items-center group">
                  <span>{item}</span>
                  <div className="hidden group-hover:flex gap-2 ml-2">
                    {/* Shift Buttons */}
                    <button
                      onClick={() => handleMoveBulletPointFs(selectedClassFs, i, "up")}
                      disabled={i === 0}
                      className={`${i === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <IconArrowUp size={16} />
                    </button>
                    <button
                      onClick={() => handleMoveBulletPointFs(selectedClassFs, i, "down")}
                      disabled={i === feeStructure[selectedClassFs].length - 1}
                      className={`${
                        i === feeStructure[selectedClassFs].length - 1 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <IconArrowDown size={16} />
                    </button>

                    {/* Delete Button */}
                    <button onClick={() => handleRemoveBulletPointFs(selectedClassFs, i)} className="text-danger">
                      <IconTrash size={16} />
                    </button>
                  </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex justify-start items-center panel mt-4'>
            <button type="button" className='btn btn-primary w-44'>Save</button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="panel p-4">
          <p className="text-2xl font-semibold mb-4">Preview</p>
          {Object.entries(feeStructure).map(([classKey, items], index) => (
            <div key={classKey}>
              <div
                className={`flex cursor-pointer justify-between p-2 bg-gray-200 rounded mb-2 ${
                  activeFs === index ? "bg-primary-light text-primary" : ""
                }`}
                onClick={() => setActiveFs(activeFs === index ? null : index)}
              >
                <span>{classKey}</span>
                <div>{activeFs === index ? <IconMinusCircle/> : <IconPlusCircle/>}</div>
              </div>
              <AnimateHeight duration={300} height={activeFs === index ? "auto" : 0}>
                <ul className="list-disc pl-5 text-gray-700">
                  {items.length > 0 ? (
                    items.map((item, i) => <li key={i}>{item}</li>)
                  ) : (
                    <li>No fee details added yet.</li>
                  )}
                </ul>
              </AnimateHeight>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Tab.Panel>
</Tab.Panels>
   </div>
    </Tab.Group>
   


        </div>
    );
};

export default Information;
