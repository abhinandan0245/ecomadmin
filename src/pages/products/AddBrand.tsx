import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IRootState } from '../../store';
import { addBrandThunk, getAllBrandsThunk, updateBrandThunk } from '../../store/thunks/productThunk';
import { toast } from 'react-toastify';
import { getAllCategoryAPIThunk } from '../../store/thunks/categoryThunks';
import Select from "react-select";
import IconArrowBackward from '../../components/Icon/IconArrowBackward';

const AddBrand = () => {
    const dispatch = useAppDispatch();
    const { brands, loading, success, error } = useAppSelector((state: IRootState) => state.brand);
    const navigate = useNavigate();
    const { id } = useParams();

    // Local state for form fields
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('active');
    const [categoryId, setCategoryId] = useState('active');
    const { categories } = useAppSelector((state) => state.category);
    const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

    // Fetch brands if editing and not loaded
    useEffect(() => {
        dispatch(setPageTitle(id ? 'Edit Brand' : 'Add Brand'));
        if (id && brands.length === 0 && !loading) {
            dispatch(getAllBrandsThunk());
        }
        // Fetch categories if not already loaded
        if (!categories || categories.length === 0) {
            dispatch(getAllCategoryAPIThunk()); // <-- You need this thunk
        }
    }, [dispatch, id, brands.length, loading, categories]);

    // Prefill form when editing and brands are loaded
useEffect(() => {
            if (id && brands.length > 0) {
                const brand = brands.find((b: any) => String(b.id) === String(id));
                if (brand) {
                    setName(brand.name || '');
                    setDescription(brand.description || '');
                    setStatus(brand.status || 'active');
        
                    // Convert categoryId string "36,34,33" -> [{value:36,label:'coco oil'}, ...]
                    const savedCategories = brand.categoryId
                        ? brand.categoryId.split(',').map((id: string) => {
                            const cat = categories.find((c: any) => c.id === Number(id));
                            return cat ? { value: cat.id, label: cat.name } : null;
                        }).filter(Boolean)
                        : [];
        
                    setSelectedCategories(savedCategories);
                }
            }
        }, [id, brands, categories]);

    // Show loading while fetching brands for edit
    if (id && (brands.length === 0 || loading)) {
        return <div className="text-center py-10">Loading brand details...</div>;
    }

    // Show not found if brand doesn't exist after loading
    const brand = id ? brands.find((b: any) => String(b.id) === String(id)) : null;
    if (id && brands.length > 0 && !brand) {
        return <div className="text-center py-10 text-red-600">Brand not found.</div>;
    }

    // Handle form submit
 const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            
            const data = { name, description, status, 
                categoryId: selectedCategories.map(cat => cat.value).join(',') 
             };
            try {
                if (id) {
                    await dispatch(updateBrandThunk({ id, data })).unwrap();
                    toast.success('Brand updated successfully!');
                } else {
                    await dispatch(addBrandThunk(data)).unwrap();
                    toast.success('Brand created successfully!');
                }
                navigate('/products/brands');
            } catch (error: any) {
                toast.error('Failed to save Brand: ' + (error?.message || error || ''));
            }
        };

    return (
        <div className="flex flex-col gap-2.5">
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
              <div className='flex justify-between items-center ltr:xl:mr-6'>
                <div className="text-lg ps-5 leading-none">{id ? 'Edit Brand' : 'Add New Brand'}</div>
                  <button type="button" className="btn btn-dark gap-2" onClick={() => navigate(-1)}>
                                                    <IconArrowBackward />
                                                    Back To Brands
                                                </button>
              </div>
                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <form className="mt-8 px-4" onSubmit={handleSubmit}>
                    <div className="text-lg">Brand Details :-</div>
                    <div className="grid  grid-cols-2 items-start ">
                       <div className="flex items-center mt-4">
    <label htmlFor="category" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
        Categories
    </label>
    <div className="flex-1">
        <Select
        isMulti
        id="category"
        name="categoryId"
        options={(categories || []).map((cat) => ({
            value: cat.id,
            label: cat.name,
        }))}
        value={selectedCategories}
        onChange={(selected:any) => setSelectedCategories(selected || [])}
        placeholder="-- Select Categories --"
        />
    </div>
    </div>
                        <div className="mt-4 flex items-center ml-5">
                            <label htmlFor="BrandName" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                Brand Name
                            </label>
                            <input
                                id="BrandName"
                                type="text"
                                name="name"
                                className="form-input flex-1"
                                placeholder="Enter Product BrandName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center mt-4 ">
                            <label htmlFor="status" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0 ">
                                Status
                            </label>
                            <select id="status" name="status" className="form-select flex-1" value={status} onChange={(e) => setStatus(e.target.value)} required>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        {/* <div className="mt-4 flex items-center ml-5">
                                <label htmlFor="Description" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Description (Optional)
                                </label>
                                <textarea
                                    id="Description"
                                    rows={4}
                                    name="description"
                                    className="form-input flex-1"
                                    placeholder="Enter Description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div> */}
                    </div>
                    <div className="panel flex justify-center items-center mt-6">
                        <button type="submit" className="btn btn-success w-52" disabled={loading}>
                            {loading ? (id ? 'Updating...' : 'Saving...') : id ? 'Update' : 'Save'}
                        </button>
                    </div>
                    {success && <div className="text-green-600 text-center mt-2">{id ? 'Brand updated successfully!' : 'Brand added successfully!'}</div>}
                    {error && <div className="text-red-600 text-center mt-2">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default AddBrand;
