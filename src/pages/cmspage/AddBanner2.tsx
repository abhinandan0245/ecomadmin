import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import IconX from '../../components/Icon/IconX';
import IconDownload from '../../components/Icon/IconDownload';
import IconEye from '../../components/Icon/IconEye';
import IconSend from '../../components/Icon/IconSend';
import IconSave from '../../components/Icon/IconSave';
import IconArrowBackward from '../../components/Icon/IconArrowBackward';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import Select from 'react-select';
// import React, { ChangeEvent } from 'react';
import React, { KeyboardEvent, ChangeEvent } from 'react';
import IconPlus from '../../components/Icon/IconPlus';

import { useCreateBanner2Mutation, useGetBannerById2Query, useUpdateBanner2Mutation } from '../../../features/banner/banner2Api';
import { toast } from 'react-toastify';
type Variant = {
    color: string;
    images: File[];
    previews: string[];
};

interface ImagePreview {
    file: File;
    preview: string;
}

interface Option {
    value: string;
    label: string;
}
const AddBanner2 = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice Add'));
    });

    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();

    const isUpdateMode = Boolean(id);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    // const [order, setOrder] = useState<number | ''>('');
    const [active, setActive] = useState(true);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const { data: banner, isLoading: loadingBanner } = useGetBannerById2Query(Number(id), {
        skip: !isUpdateMode,
    });
    const [createBanner2, { isLoading: creating }] = useCreateBanner2Mutation();
    const [updateBanner2, { isLoading: updating }] = useUpdateBanner2Mutation();

    // Load existing banner data into form in update mode
    useEffect(() => {
        dispatch(setPageTitle(isUpdateMode ? 'Update Banner' : 'Add Banner'));
    }, [dispatch, isUpdateMode]);

    useEffect(() => {
        if (banner && isUpdateMode) {
            setTitle(banner.title);
            setDescription(banner.description || '');
            setLinkUrl(banner.linkUrl || '');
            //   setOrder(banner.order ?? '');
            setActive(banner.isActive);
            setPreview(banner.homepageImage || null);
            setBannerFile(null); // Reset file input
        }
    }, [banner, isUpdateMode]);

    //   add and update api call
    const handleSave = async () => {
        if (!title || !linkUrl) {
            toast.warning('Please fill in all required fields.');
            return;
        }

        if (!bannerFile && !preview) {
            toast.warning('Please upload a banner image');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('linkUrl', linkUrl);
        // formData.append('order', order.toString());
        formData.append('isActive', active ? 'true' : 'false');

        if (bannerFile) {
            formData.append('image', bannerFile);
        }

        try {
            if (isUpdateMode) {
                // update banner by id
                await updateBanner2({ id: Number(id), formData }).unwrap();
                toast.success('Banner updated successfully!');
            } else {
                // create new banner
                await createBanner2(formData).unwrap();
                toast.success('Banner added successfully!');
            }
            navigate('/cmspage/home-banners-2');
        } catch (error) {
            toast.error('Failed to save banner');
            console.error(error);
        }
    };

    if (loadingBanner && isUpdateMode) return <div>Loading banner data...</div>;

    // baner uploader
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBannerFile(file);
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    };

    return (
        <div className="flex  flex-col gap-2.5">
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
                <div className='flex justify-between items-center ltr:xl:mr-6'>
                    <div className="text-lg ps-5 leading-none">{isUpdateMode ? 'Update Banner' : 'Add Banner'}</div>
                 <button type="button" className="btn btn-dark gap-2" onClick={() => navigate(-1)}>
                                                                                          <IconArrowBackward />
                                                                                          Back
                                                                                      </button>
                </div>

                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="mt-8 px-4">
                    <div className="flex justify-between lg:flex-row flex-col">
                        <div className="lg:w-1/2 w-full ltr:lg:mr-6 rtl:lg:ml-6 mb-6">
                            <div className="text-lg">Banner Details :-</div>
                            <div className="mt-4 flex items-center">
                                <label htmlFor="Title" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Title
                                </label>
                                <input value={title} onChange={(e) => setTitle(e.target.value)} id="Title" type="text" name="title" className="form-input flex-1" placeholder="Enter Title" />
                                {/* <button className='btn btn-dark '>Generate</button> */}
                            </div>
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
                                {/* <button className='btn btn-dark '>Generate</button> */}
                            </div>
                            <div className="mt-4 flex items-center">
                                <label htmlFor="Link_URL" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Link_URL
                                </label>
                                <input
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    id="Link_URL"
                                    type="text"
                                    name="Link_URL"
                                    className="form-input flex-1"
                                    placeholder="Enter Link_URL"
                                />
                                {/* <button className='btn btn-dark '>Generate</button> */}
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            {/* <div className="text-lg">Payment Details:</div> */}

                            <div className="mt-10 flex items-center">
                                <label htmlFor="Role" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Banner Upload
                                </label>
                                <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-md overflow-hidden group cursor-pointer">
                                    <input type="file" name="baneer" onChange={handleImageChange} accept="image/*" id="Banner" className="form-input absolute inset-0 opacity-0 z-10 cursor-pointer" />
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm group-hover:text-blue-500">Click to upload</div>
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
                                        id="custom_switch_checkbox1"
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
                <button onClick={handleSave} disabled={creating || updating} className="btn btn-success w-52">
                    {creating || updating ? (isUpdateMode ? 'Updating...' : 'Saving...') : isUpdateMode ? 'Update' : 'Save'}
                </button>
            </div>
        </div>
    );
};

export default AddBanner2;
