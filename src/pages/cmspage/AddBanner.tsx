import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import IconArrowBackward from '../../components/Icon/IconArrowBackward';
import Select from 'react-select';
import React from 'react';
import { useCreateBannerMutation, useGetBannerByIdQuery, useUpdateBannerMutation } from '../../../features/banner/bannerApi';
import { toast } from 'react-toastify';
import { getAllCategoryAPI } from '../../api/categoryApi';
import { IconCancel, IconCross, IconCrosshair } from '@tabler/icons-react';
import { X } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

const AddBanner = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Invoice Add'));
  }, [dispatch]);

  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isUpdateMode = Boolean(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [order, setOrder] = useState<number | ''>('');
  const [active, setActive] = useState(true);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [mobileBannerFile, setMobileBannerFile] = useState<File | null>(null);
const [mobilePreview, setMobilePreview] = useState<string | null>(null);

  const [linkOptions, setLinkOptions] = useState<Option[]>([]);

  const { data: banner, isLoading: loadingBanner } = useGetBannerByIdQuery(Number(id), {
    skip: !isUpdateMode,
  });
  const [createBanner, { isLoading: creating }] = useCreateBannerMutation();
  const [updateBanner, { isLoading: updating }] = useUpdateBannerMutation();

  // ✅ Base URL (local vs live)
  // ✅ Force always live URL for banner link
const BASE_URL = "https://triliv.in";


  // ✅ Fetch categories + build options with full URL
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const token = localStorage.getItem('token') || '';
        const categoriesRes = await getAllCategoryAPI(token);

        const categoryOptions = (categoriesRes.data || categoriesRes).map((c: any) => ({
          value: `${BASE_URL}/shop/category/${c.id}`,
          label: `Category: ${c.name}`,
        }));

        const staticPages: Option[] = [
          { value: `${BASE_URL}/shop`, label: 'Shop Page' },
          { value: `${BASE_URL}/aboutus`, label: 'About Us' },
          { value: `${BASE_URL}/contact`, label: 'Contact Us' },
          { value: `${BASE_URL}/cart`, label: 'Cart Page' },
          { value: `${BASE_URL}/checkout`, label: 'Checkout Page' },
        ];

        setLinkOptions([...categoryOptions, ...staticPages]);
      } catch (err) {
        console.error('Failed to fetch link options', err);
        toast.error('Failed to load categories for Link URL');
      }
    };

    fetchLinks();
  }, [BASE_URL]);

  // Load banner data when editing
 useEffect(() => {
  if (banner && isUpdateMode) {
    setTitle(banner.title);
    setDescription(banner.description || '');
    setLinkUrl(banner.linkUrl || '');
    setOrder(banner.order ?? '');
    setActive(banner.isActive);
    setPreview(banner.homepageImage || null);
    setMobilePreview(banner.mobileImage || null); // mobile image
    setBannerFile(null);
    setMobileBannerFile(null);
  }
}, [banner, isUpdateMode]);


  // Save / Update API call
  const handleSave = async () => {
    if (!title || !linkUrl) {
      toast.warning('Please fill in all required fields.');
      return;
    }
   if (!bannerFile && !preview && !mobileBannerFile && !mobilePreview) {
  toast.warning('Please upload at least one banner image');
  return;
}

const formData = new FormData();
formData.append('title', title);
formData.append('description', description);
formData.append('linkUrl', linkUrl);
formData.append('order', order.toString());
formData.append('isActive', active ? 'true' : 'false');
if (bannerFile) formData.append('homepageImage', bannerFile);
if (mobileBannerFile) formData.append('mobileImage', mobileBannerFile);
 // ✅ If user removed mobile preview but didn't upload new one
  if (!mobilePreview && !mobileBannerFile) {
    formData.append('deleteMobileImage', 'true');
  }


    try {
      if (isUpdateMode) {
        await updateBanner({ id: Number(id), formData }).unwrap();
        toast.success('Banner updated successfully!');
      } else {
        await createBanner(formData).unwrap();
        toast.success('Banner added successfully!');
      }
      navigate('/cmspage/home-banners');
    } catch (error) {
      toast.error('Failed to save banner');
      console.error(error);
    }
  };

  if (loadingBanner && isUpdateMode) return <div>Loading banner data...</div>;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleMobileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setMobileBannerFile(file);
    const imageUrl = URL.createObjectURL(file);
    setMobilePreview(imageUrl);
  }
};


  return (
    <div className="flex flex-col gap-2.5">
      <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
        <div className="flex justify-between items-center ltr:xl:mr-6">
          <div className="text-lg ps-5 leading-none">{isUpdateMode ? 'Update Banner' : 'Add Banner'}</div>
          <button type="button" className="btn btn-dark gap-2" onClick={() => navigate(-1)}>
            <IconArrowBackward /> Back
          </button>
        </div>
        <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
        <div className="mt-8 px-4">
          <div className="flex justify-between lg:flex-row flex-col">
            <div className="lg:w-1/2 w-full ltr:lg:mr-6 rtl:lg:ml-6 mb-6">
              <div className="text-lg">Banner Details :-</div>

              {/* Title */}
              <div className="mt-4 flex items-center">
                <label htmlFor="Title" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="Title"
                  type="text"
                  name="title"
                  className="form-input flex-1"
                  placeholder="Enter Title"
                />
              </div>

              {/* Description */}
              <div className="mt-4 flex items-center">
                <label htmlFor="Description" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                  Description
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="Description"
                  type="text"
                  name="description"
                  className="form-input flex-1"
                  placeholder="Enter Description"
                />
              </div>

              {/* Dropdown Select */}
              <div className="mt-4 flex items-center">
                <label htmlFor="Link_URL" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                  Link URL
                </label>
                <div className="flex-1">
                  <Select
                    id="Link_URL"
                    options={linkOptions}
                    value={linkOptions.find((opt) => opt.value === linkUrl) || null}
                    onChange={(selected: Option | null) => setLinkUrl(selected?.value || '')}
                    placeholder="Select a URL"
                    isSearchable
                  />
                </div>
              </div>

              {/* Order */}
              <div className="mt-4 flex items-center">
                <label htmlFor="Order" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                  Order
                </label>
                <input
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  id="Order"
                  type="number"
                  name="Order"
                  className="form-input flex-1"
                  placeholder="Enter Order"
                />
              </div>
            </div>

            {/* Banner Upload + Active Switch */}
            <div className="lg:w-1/2 w-full">
              <div className="mt-10 flex items-center">
                <label htmlFor="Banner" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                  desktop banner
                </label>
                <div className="relative w-56 h-32 border-2 border-dashed border-gray-300 rounded-md overflow-hidden group cursor-pointer">
                  <input
                    type="file"
                    name="banner"
                    onChange={handleImageChange}
                    accept="image/*"
                    id="Banner"
                    className="form-input absolute inset-0 opacity-0 z-10 cursor-pointer"
                  />
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm group-hover:text-blue-500">
                      Click to upload
                    </div>
                  )}
                </div>
              </div>

                        {/* Mobile Banner Upload */}
{/* Mobile Banner Upload */}
<div className="mt-4 flex items-center">
  <label htmlFor="MobileBanner" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
    Mobile Banner
  </label>
  <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-md overflow-hidden group cursor-pointer">
    <input
      type="file"
      name="mobileBanner"
      onChange={handleMobileImageChange}
      accept="image/*"
      id="MobileBanner"
      className="form-input absolute inset-0 opacity-0 z-10 cursor-pointer"
    />

    {mobilePreview ? (
      <>
        <img src={mobilePreview} alt="Mobile Preview" className="w-full h-full object-cover" />
        
        {/* ❌ Corner remove button */}
        <button
          type="button"
          onClick={() => {
            setMobilePreview(null);
            setMobileBannerFile(null);
          }}
          style={{
            position: 'absolute',
            top: 2,
            right: 2,
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            width: '25px',
            height: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '12px',
            cursor: 'pointer',
            border: '1px solid #ccc',
            zIndex: 10 
          }}
        >
          <X/>
        </button>
      </>
    ) : (
      <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm group-hover:text-blue-500">
        Click to upload
      </div>
    )}
  </div>
</div>


              <div className="mt-4 flex items-center">
                <label htmlFor="ActiveInactive" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                  Active/Inactive
                </label>
                <label className="w-12 h-6 relative">
                  <input
                    checked={active}
                    onChange={() => setActive(!active)}
                    type="checkbox"
                    className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                  />
                  <span
                    className={`outline_checkbox bg-icon border-2 border-danger dark:border-white-dark block h-full before:absolute before:left-1 before:bg-danger dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4
                      before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-success peer-checked:before:bg-success before:transition-all before:duration-300`}
                  ></span>
                </label>
              </div>
            </div>

  

          </div>
        </div>
      </div>

      <div className="panel flex justify-center items-center">
        <button
          onClick={handleSave}
          disabled={creating || updating}
          className="btn btn-success w-52"
        >
          {creating || updating
            ? isUpdateMode
              ? 'Updating...'
              : 'Saving...'
            : isUpdateMode
            ? 'Update'
            : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default AddBanner;
