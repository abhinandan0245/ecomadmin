import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import React from 'react';
import { IRootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addCategoryThunk, updateCategoryThunk } from '../../store/thunks/categoryThunks';
import { toast } from 'react-toastify';

import { getByIdCategoryAPI } from '../../api/categoryApi';
import IconArrowBackward from '../../components/Icon/IconArrowBackward';

const AddNew = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // New state for image
const [image, setImage] = useState<File | null>(null);
const [preview, setPreview] = useState<string | null>(null);

// Handle image change
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }
};

    const { id } = useParams();

    const { loading } = useAppSelector((state: IRootState) => state.category);
    const token = useAppSelector((state) => state.auth.token);

    const [name, setName] = useState('');
    
    const [status, setStatus] = useState(true);
    const [sizeInput, setSizeInput] = useState('');
    const [sizes, setSizes] = useState<string[]>([]);

    useEffect(() => {
        dispatch(setPageTitle('Add Category'));
    }, [dispatch]);

    useEffect(() => {
        const fetchCategoryById = async () => {
            if (id && token) {
                try {
                    const data = await getByIdCategoryAPI(id, token);
                    setName(data.name || '');
                    
                    setStatus(data.status ?? true);

                    // Safely parse sizes
                    let parsedSizes: string[] = [];
                    if (Array.isArray(data.size)) {
                        parsedSizes = data.size;
                    } else if (typeof data.size === 'string') {
                        try {
                            const parsed = JSON.parse(data.size);
                            parsedSizes = Array.isArray(parsed) ? parsed : [];
                        } catch {
                            parsedSizes = [];
                        }
                    }
                    setSizes(parsedSizes);
                } catch (err) {
                    toast.error('Category not found');
                    navigate('/category/categories');
                }
            }
        };

        fetchCategoryById();
    }, [id, token]);

    const handleAddSize = () => {
        const trimmed = sizeInput.trim();
        if (trimmed && !sizes.includes(trimmed)) {
            setSizes([...sizes, trimmed]);
            setSizeInput('');
        }
    };

    const handleRemoveSize = (index: number) => {
        setSizes((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
  if (!name.trim()) {
    toast.error('Category name is required!');
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("status", String(status));
  sizes.forEach((s) => formData.append("size[]", s));
  if (image) formData.append("image", image);

  try {
    if (id) {
      await dispatch(updateCategoryThunk({ id, updatedData: formData })).unwrap();
      toast.success("Category updated successfully!");
    } else {
      await dispatch(addCategoryThunk(formData)).unwrap();
      toast.success("Category added successfully!");
    }
    navigate("/category/categories");
  } catch (err) {
    console.error("Error saving category:", err);
    toast.error((err as string) || "Failed to save category.");
  }
};


    return (
        <div className="flex flex-col gap-2.5">
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
               <div className='flex justify-between items-center ltr:xl:mr-6'>
                 <div className="text-lg ps-5 leading-none">{id ? 'Edit Category' : 'Add New Categories'}</div>
                 <button type="button" className="btn btn-dark gap-2" onClick={() => navigate(-1)}>
                                    <IconArrowBackward />
                                    Back to Categories
                                </button>
               </div>
                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />

                <div className="mt-8 px-4">
                    <div className="flex justify-between lg:flex-row flex-col">
                        <div className="lg:w-1/2 w-full ltr:lg:mr-6 rtl:lg:ml-6 mb-6">
                            <div className="text-lg">Category Details :-</div>

                            <div className="mt-4 flex items-center">
                                <label htmlFor="CategoryName" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Category Name
                                </label>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    id="CategoryName"
                                    type="text"
                                    className="form-input flex-1"
                                    placeholder="Enter Category Name"
                                />
                            </div>

                           
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <div className="flex items-center mt-12">
                                <label htmlFor="ActiveToggle" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Active/Deactive
                                </label>
                                <label className="w-12 h-6 relative">
                                    <input
                                        onChange={(e) => setStatus(e.target.checked)}
                                        checked={status}
                                        type="checkbox"
                                        className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                        id="ActiveToggle"
                                    />
                                    <span className="outline_checkbox bg-icon border-2 border-danger dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-danger dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-success peer-checked:before:bg-success before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* ✅ Size Field */}
                    <div className="mt-4 flex items-start">
                        <label className="ltr:mr-2 rtl:ml-2 w-1/6 mb-0">Sizes (e.g. 500g, 1kg)</label>
                        <div className="flex-1">
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={sizeInput}
                                    onChange={(e) => setSizeInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddSize();
                                        }
                                    }}
                                    className="form-input flex-1"
                                    placeholder="Enter size and press Enter"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddSize}
                                    className="btn btn-primary px-4"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {Array.isArray(sizes) &&
                                    sizes.map((size, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center"
                                        >
                                            {size}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSize(idx)}
                                                className="ml-2 text-red-500"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-start">
    <label htmlFor="CategoryImage" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
        Category Image
    </label>
    <div className="flex-1">
        <input
            id="CategoryImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-input w-full"
        />

        {/* Show preview if image selected */}
        {preview && (
            <div className="mt-3">
                <img
                    src={preview}
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded border"
                />
            </div>
        )}
    </div>
</div>

                </div>
            </div>

            <div className="panel flex justify-center items-center">
                <button onClick={handleSave} className="btn btn-success w-52" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    );
};

export default AddNew;
