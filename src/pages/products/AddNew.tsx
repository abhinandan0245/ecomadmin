import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import IconX from '../../components/Icon/IconX';
import IconPlus from '../../components/Icon/IconPlus';
import Select from 'react-select';
import { KeyboardEvent, ChangeEvent } from 'react';
import { 
  addProductThunk, 
  getAllBrandsByCategoryThunk, 
  getByIdProductThunk, 
  updateProductThunk 
} from '../../store/thunks/productThunk';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { MultiValue } from 'react-select';
import { toast } from 'react-toastify';
import { getAllCategoryAPIThunk, getSizesByCategoryThunk } from '../../store/thunks/categoryThunks';

interface Option {
    value: string;
    label: string;
}

interface SizeVariant {
    size: string;
    originalPrice: string;
    discountPercentage: string;
    discountAmount: string;
    price: string;
}

const AddNew = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const { selectedProduct } = useAppSelector((state) => state.product);
    const { categories } = useAppSelector((state) => state.category);
    const { brands } = useAppSelector((state) => state.brand);
    const { sizes, sizesLoading, sizesError } = useAppSelector((state) => state.category);

    // Form state
    const [form, setForm] = useState({
        productId: '',
        title: '',
        hsnCode: '',
        description: '',
        originalPrice: '',
        discountPercentage: '0',
        discountAmount: '0',
        stock: '',
        categoryId: '',
        brand: '',
        sizeVariants: [] as SizeVariant[],
        productStatus: 'active',
    });

    // Track which discount field is active based on values
    const isPercentageActive = parseFloat(form.discountPercentage) > 0;
    const isAmountActive = parseFloat(form.discountAmount) > 0;

    // Tags state
    const [inputValue, setInputValue] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);

    // Images state
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [imageIdsToDelete, setImageIdsToDelete] = useState<string[]>([]);
    const [selectedSizeOptions, setSelectedSizeOptions] = useState<Option[]>([]);

    // Set page title
    useEffect(() => {
        dispatch(setPageTitle(id ? 'Edit Product' : 'Add New Product'));
    }, [dispatch, id]);

    // Fetch product if editing
    useEffect(() => {
        if (id) dispatch(getByIdProductThunk(id));
    }, [id, dispatch]);

    // Fetch categories on mount if not loaded
    useEffect(() => {
        if (!categories || categories.length === 0) {
            dispatch(getAllCategoryAPIThunk());
        }
    }, [dispatch, categories]);

    // Fetch sizes when category changes
    useEffect(() => {
        if (form.categoryId) {
            dispatch(getSizesByCategoryThunk({ categoryId: form.categoryId }));
        } else {
            setForm(prev => ({...prev, sizeVariants: []}));
        }   
    }, [form.categoryId, dispatch]);

    // Convert sizes to options for Select component
    const sizeOptions = sizes.map(size => ({
        value: size,
        label: size
    }));

    // Calculate final price based on discounts
    const calculateFinalPrice = (price: string, discountPct: string, discountAmt: string) => {
        const priceNum = parseFloat(price) || 0;
        const pctNum = parseFloat(discountPct) || 0;
        const amtNum = parseFloat(discountAmt) || 0;
        
        const pctDiscount = priceNum * (pctNum / 100);
        const totalDiscount = pctDiscount + amtNum;
        const finalPrice = Math.max(0, priceNum - totalDiscount);
        
        return finalPrice.toFixed(2);
    };

    // Handle size selection changes
    const handleSizeSelection = (selected: MultiValue<Option>) => {
        const selectedSizes = selected ? selected.map(s => s.value) : [];
        
        // Add new sizes that weren't previously selected
        const newSizeVariants = selectedSizes
            .filter(size => !form.sizeVariants.some(v => v.size === size))
            .map(size => ({
                size,
                originalPrice: form.originalPrice || '0',
                discountPercentage: form.discountPercentage || '0',
                discountAmount: form.discountAmount || '0',
                price: calculateFinalPrice(
                    form.originalPrice || '0', 
                    form.discountPercentage || '0', 
                    form.discountAmount || '0'
                )
            }));
        
        // Remove sizes that were deselected
        const updatedVariants = [
            ...form.sizeVariants.filter(v => selectedSizes.includes(v.size)),
            ...newSizeVariants
        ];
        
        setForm(prev => ({
            ...prev,
            sizeVariants: updatedVariants
        }));
    };

    // Update size variant pricing
    const updateSizeVariant = (index: number, field: keyof SizeVariant, value: string) => {
        const updatedVariants = [...form.sizeVariants];
        updatedVariants[index] = {
            ...updatedVariants[index],
            [field]: value
        };
        
        // Recalculate final price if original price or discounts changed
        if (field === 'originalPrice' || field === 'discountPercentage' || field === 'discountAmount') {
            updatedVariants[index].price = calculateFinalPrice(
                updatedVariants[index].originalPrice,
                updatedVariants[index].discountPercentage,
                updatedVariants[index].discountAmount
            );
        }
        
        setForm(prev => ({
            ...prev,
            sizeVariants: updatedVariants
        }));
    };

    // Fetch brands when category changes
    useEffect(() => {
        if (form.categoryId) {
            dispatch(getAllBrandsByCategoryThunk(form.categoryId));
        }
    }, [dispatch, form.categoryId]);

    // Prefill form in edit mode
    // useEffect(() => {
    //     if (id && selectedProduct) {
    //         let catId = '';
    //         if (selectedProduct.categoryId && typeof selectedProduct.categoryId === 'object') {
    //             catId = selectedProduct.categoryId.id?.toString() || '';
    //         } else if (selectedProduct.categoryId) {
    //             catId = selectedProduct.categoryId.toString();
    //         } else if (selectedProduct.category && typeof selectedProduct.category === 'object') {
    //             catId = selectedProduct.category.id?.toString() || '';
    //         }

    //         // Convert size variants
    //         const sizeVariants: SizeVariant[] = selectedProduct.priceVariants?.map((variant: any) => ({
    //             size: variant.size,
    //             originalPrice: variant.originalPrice?.toString() || '0',
    //             discountPercentage: variant.discountPercentage?.toString() || '0',
    //             discountAmount: variant.discountAmount?.toString() || '0',
    //             price: variant.price?.toString() || '0'
    //         })) || [];

    //         setForm({
    //             productId: selectedProduct.productId || '', 
    //             title: selectedProduct.title || '',
    //             hsnCode: selectedProduct.hsnCode || '',
    //             description: selectedProduct.description || '',
    //             originalPrice: selectedProduct.originalPrice ? String(selectedProduct.originalPrice) : '',
    //             discountPercentage: selectedProduct.discountPercentage ? String(selectedProduct.discountPercentage) : '0',
    //             discountAmount: selectedProduct.discountAmount ? String(selectedProduct.discountAmount) : '0',
    //             stock: selectedProduct.stock ? String(selectedProduct.stock) : '',
    //             categoryId: catId ? String(catId) : '',
    //             brand: selectedProduct.brand || '',
    //             sizeVariants,
    //             productStatus: typeof selectedProduct.productStatus === 'boolean'
    //                 ? selectedProduct.productStatus ? 'active' : 'inactive'
    //                 : selectedProduct.productStatus || 'active',
    //         });
    //         setTags(Array.isArray(selectedProduct.tags) ? selectedProduct.tags : []);

    //         // Set existing images if editing
    //         if (selectedProduct.imageVariants && selectedProduct.imageVariants.length > 0) {
    //             const allImageUrls = selectedProduct.imageVariants.flatMap((variant: any) => {
    //                 if (Array.isArray(variant.imageUrl)) {
    //                     return variant.imageUrl.filter((url: string) => url);
    //                 } else if (variant.imageUrl) {
    //                     return [variant.imageUrl];
    //                 }
    //                 return [];
    //             });
    //             setPreviews(allImageUrls);
    //         }
    //     }
    // }, [id, selectedProduct]);


    // In the useEffect that prefills form data
// Update the useEffect that prefills form data
useEffect(() => {
    if (id && selectedProduct) {
        let catId = '';
        if (selectedProduct.categoryId && typeof selectedProduct.categoryId === 'object') {
            catId = selectedProduct.categoryId.id?.toString() || '';
        } else if (selectedProduct.categoryId) {
            catId = selectedProduct.categoryId.toString();
        } else if (selectedProduct.category && typeof selectedProduct.category === 'object') {
            catId = selectedProduct.category.id?.toString() || '';
        }

        // Safely handle price variants and sizes
        let sizeVariants: SizeVariant[] = [];
        let selectedSizes: string[] = [];
        
        if (selectedProduct.priceVariants) {
            const variants = Array.isArray(selectedProduct.priceVariants) 
                ? selectedProduct.priceVariants 
                : [selectedProduct.priceVariants];
            
            sizeVariants = variants.map((variant: any) => {
                if (variant.size) selectedSizes.push(variant.size);
                return {
                    size: variant.size || '',
                    originalPrice: variant.originalPrice?.toString() || '0',
                    discountPercentage: variant.discountPercentage?.toString() || '0',
                    discountAmount: variant.discountAmount?.toString() || '0',
                    price: variant.price?.toString() || '0'
                };
            });
        }

        // Also check if sizes are provided separately
        if (selectedProduct.sizes && selectedProduct.sizes.length > 0) {
            selectedSizes = Array.isArray(selectedProduct.sizes) 
                ? selectedProduct.sizes 
                : [selectedProduct.sizes];
        }

        setForm({
            productId: selectedProduct.productId || '', 
            title: selectedProduct.title || '',
            hsnCode: selectedProduct.hsnCode || '',
            description: selectedProduct.description || '',
            originalPrice: selectedProduct.originalPrice ? String(selectedProduct.originalPrice) : '',
            discountPercentage: selectedProduct.discountPercentage ? String(selectedProduct.discountPercentage) : '0',
            discountAmount: selectedProduct.discountAmount ? String(selectedProduct.discountAmount) : '0',
            stock: selectedProduct.stock ? String(selectedProduct.stock) : '',
            categoryId: catId ? String(catId) : '',
            brand: selectedProduct.brand || '',
            sizeVariants,
            productStatus: typeof selectedProduct.productStatus === 'boolean'
                ? selectedProduct.productStatus ? 'active' : 'inactive'
                : selectedProduct.productStatus || 'active',
        });

        // Set tags
        if (selectedProduct.tags) {
            setTags(Array.isArray(selectedProduct.tags) 
                ? selectedProduct.tags 
                : typeof selectedProduct.tags === 'string' 
                    ? selectedProduct.tags.split(',') 
                    : []);
        } else {
            setTags([]);
        }

        // Set sizes in the select component
        if (selectedSizes.length > 0) {
            // This will trigger the size selection and show them in the multi-select
            const sizeOptions = selectedSizes.map(size => ({ value: size, label: size }));
            // You might need to store this in state if you're using it for the select component
            setSelectedSizeOptions(sizeOptions);
        }

        // Set existing images if editing
        if (selectedProduct.imageVariants) {
            const variants = Array.isArray(selectedProduct.imageVariants) 
                ? selectedProduct.imageVariants 
                : [selectedProduct.imageVariants];
            
            const allImageUrls = variants.flatMap((variant: any) => {
                if (Array.isArray(variant.imageUrl)) {
                    return variant.imageUrl.filter((url: string) => url);
                } else if (variant.imageUrl) {
                    return [variant.imageUrl];
                }
                return [];
            });
            setPreviews(allImageUrls);
        }
    }
}, [id, selectedProduct]);

    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        // When changing discount fields, clear the other field if this one gets a value
        if (name === 'discountPercentage' && parseFloat(value) > 0) {
            setForm(prev => ({ ...prev, discountAmount: '0' }));
        } else if (name === 'discountAmount' && parseFloat(value) > 0) {
            setForm(prev => ({ ...prev, discountPercentage: '0' }));
        }
        
        setForm(prev => ({ ...prev, [name]: value }));
        
        // Recalculate all size variant prices if base price or discounts change
        if (name === 'originalPrice' || name === 'discountPercentage' || name === 'discountAmount') {
            setForm(prev => {
                const updatedVariants = prev.sizeVariants.map(variant => ({
                    ...variant,
                    originalPrice: name === 'originalPrice' ? value : variant.originalPrice,
                    discountPercentage: name === 'discountPercentage' ? value : variant.discountPercentage,
                    discountAmount: name === 'discountAmount' ? value : variant.discountAmount,
                    price: calculateFinalPrice(
                        name === 'originalPrice' ? value : variant.originalPrice,
                        name === 'discountPercentage' ? value : variant.discountPercentage,
                        name === 'discountAmount' ? value : variant.discountAmount
                    )
                }));
                return {
                    ...prev,
                    [name]: value,
                    sizeVariants: updatedVariants
                };
            });
        }
    };

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (!tags.includes(newTag)) {
                setTags((prevTags) => [...prevTags, newTag]);
            }
            setInputValue('');
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const removeTag = (index: number) => {
        setTags((prevTags) => prevTags.filter((_, i) => i !== index));
    };

    // Image handlers
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        
        const newFiles = Array.from(e.target.files);
        const newImages = [...images, ...newFiles];
        setImages(newImages);

        // Create previews
        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        const newPreviews = [...previews];

        // If this image is from existing images (already in DB)
        if (selectedProduct && selectedProduct.imageVariants && index < selectedProduct.imageVariants.length) {
            const deletedImage = selectedProduct.imageVariants[index];
            if (deletedImage && deletedImage.id) {
                setImageIdsToDelete(prev => [...prev, deletedImage.id]);
            }
        } else {
            // If it's a newly added image (not in DB)
            newImages.splice(index - (selectedProduct?.imageVariants?.length || 0), 1);
            URL.revokeObjectURL(previews[index]);
        }

        newPreviews.splice(index, 1);
        setImages(newImages);
        setPreviews(newPreviews);
    };

    // Submit handler
  // Submit handler
const handleSubmit = async () => {
    if (!form.productId || !form.title || !form.categoryId || !form.brand) {
        toast.error('Please fill all required fields.');
        return;
    }

    const formData = new FormData();

    // Add basic fields
    formData.append('productId', form.productId);
    formData.append('title', form.title);
    formData.append('originalPrice', form.originalPrice);
    formData.append('discountPercentage', form.discountPercentage);
    formData.append('discountAmount', form.discountAmount);
    formData.append('categoryId', form.categoryId);
    formData.append('brand', form.brand);
    formData.append('description', form.description || '');
    formData.append('hsnCode', form.hsnCode || '');
    formData.append('stock', form.stock || '0');
    formData.append('productStatus', form.productStatus === 'active' ? 'true' : 'false');

    // Add tags
    tags.forEach(tag => formData.append('tags[]', tag));

    // Add sizes and price variants
    form.sizeVariants.forEach(variant => {
        formData.append('sizes[]', variant.size);
        formData.append('priceVariants[]', JSON.stringify({
            size: variant.size,
            originalPrice: variant.originalPrice,
            discountPercentage: variant.discountPercentage,
            discountAmount: variant.discountAmount,
            price: variant.price
        }));
    });

    // Add images
    images.forEach(image => formData.append('images', image));

    // Add images to delete
    imageIdsToDelete.forEach(id => formData.append('imagesToDelete[]', id));

    try {
        if (id) {
            await dispatch(updateProductThunk({ id, formData })).unwrap();
            toast.success('Product updated successfully!');
        } else {
            await dispatch(addProductThunk(formData)).unwrap();
            toast.success('Product added successfully!');
        }
        navigate('/products/allproducts');
    } catch (error: any) {
        console.error('Product save error:', error);
        toast.error(`Failed to save product: ${error.message || 'Unknown error'}`);
    }
};
    // Calculate base product final price
    const baseFinalPrice = calculateFinalPrice(
        form.originalPrice, 
        form.discountPercentage, 
        form.discountAmount
    );

    return (
        <div className="flex flex-col gap-2.5">
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
                <div className="text-lg ps-5 leading-none">{id ? 'Edit Product' : 'Add New Product'}</div>
                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="mt-8 px-4">
                    <div className="flex justify-between lg:flex-row flex-col">
                        <div className="lg:w-1/2 w-full ltr:lg:mr-6 rtl:lg:ml-6 mb-6">
                            <div className="text-lg">Product Details :-</div>
                            <div className="mt-4 flex items-center">
                                <label htmlFor="ProductId" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Product ID *
                                </label>
                                <input 
                                    value={form.productId} 
                                    onChange={handleInputChange} 
                                    id="ProductId" 
                                    type="text" 
                                    name="productId" 
                                    className="form-input flex-1" 
                                    placeholder="Enter Product ID" 
                                    required
                                />
                            </div>
                            <div className="mt-4 flex items-center">
                                <label htmlFor="Title" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Title *
                                </label>
                                <input 
                                    value={form.title} 
                                    onChange={handleInputChange} 
                                    id="Title" 
                                    type="text" 
                                    name="title" 
                                    className="form-input flex-1" 
                                    placeholder="Enter Product Title" 
                                    required
                                />
                            </div>
                            <div className="mt-4 flex items-center">
                                <label htmlFor="HSNCode" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    HSN Code
                                </label>
                                <input 
                                    value={form.hsnCode} 
                                    onChange={handleInputChange} 
                                    id="HSNCode" 
                                    type="text" 
                                    name="hsnCode" 
                                    className="form-input flex-1" 
                                    placeholder="Enter HSN Code" 
                                />
                            </div>
                            <div className="mt-4 flex items-center">
                                <label htmlFor="Description" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Description
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={handleInputChange}
                                    id="Description"
                                    rows={6}
                                    name="description"
                                    className="form-textarea flex-1"
                                    placeholder="Enter Description"
                                />
                            </div>
                            
                            <div className="flex items-center mt-10">
                                <label htmlFor="Stock" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Stock
                                </label>
                                <input 
                                    value={form.stock} 
                                    onChange={handleInputChange} 
                                    id="Stock" 
                                    type="number" 
                                    name="stock" 
                                    className="form-input flex-1" 
                                    placeholder="Enter Stock" 
                                    min="0"
                                />
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full">
                           

                            <div className="flex items-center mt-4">
                                <label htmlFor="category" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Category *
                                </label>
                                <select 
                                    value={form.categoryId} 
                                    onChange={handleDropdownChange} 
                                    id="category" 
                                    name="categoryId" 
                                    className="form-select flex-1"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {(categories || []).map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center mt-4">
                                <label htmlFor="Size" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Sizes
                                </label>
                                <Select
                                    value={form.sizeVariants.map(v => ({ value: v.size, label: v.size }))}
                                    // value={selectedSizeOptions}
                                    onChange={handleSizeSelection}
                                    className="flex-1"
                                    placeholder={sizesLoading ? "Loading sizes..." : "Select sizes"}
                                    options={sizeOptions}
                                    isMulti
                                    isSearchable
                                    isDisabled={!form.categoryId || sizesLoading}
                                    noOptionsMessage={() => "No sizes available for this category"}
                                />
                                {sizesError && (
                                    <div className="text-red-500 text-sm mt-1">{sizesError}</div>
                                )}
                            </div>

                            {/* Size Variant Pricing */}
                            {form.sizeVariants.length > 0 && (
                                <div className="mt-4 border rounded p-4">
                                    <h3 className="font-medium text-lg mb-3 ">Size Variant Pricing</h3>
                                    {form.sizeVariants.map((variant, index) => (
                                        <div key={index} className="mb-4 last:mb-0">
                                            <div className="font-semibold mb-1 text-lg">Size: {variant.size}</div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm mb-1">Original Price</label>
                                                    <input
                                                        type="number"
                                                        value={variant.originalPrice}
                                                        onChange={(e) => updateSizeVariant(index, 'originalPrice', e.target.value)}
                                                        className="form-input w-full"
                                                        min="0"
                                                        step="0.01"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm mb-1">Discount (%)</label>
                                                    <input
                                                        type="number"
                                                        value={variant.discountPercentage}
                                                        onChange={(e) => updateSizeVariant(index, 'discountPercentage', e.target.value)}
                                                        className="form-input w-full"
                                                        min="0"
                                                        max="100"
                                                        disabled={parseFloat(variant.discountAmount) > 0}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm mb-1">Discount (₹)</label>
                                                    <input
                                                        type="number"
                                                        value={variant.discountAmount}
                                                        onChange={(e) => updateSizeVariant(index, 'discountAmount', e.target.value)}
                                                        className="form-input w-full"
                                                        min="0"
                                                        disabled={parseFloat(variant.discountPercentage) > 0}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm mb-1">Final Price</label>
                                                    <div className="form-input w-full bg-gray-100">
                                                        ₹{variant.price}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center mt-4">
                                <label htmlFor="brand" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Brand *
                                </label>
                                <select 
                                    value={form.brand} 
                                    onChange={handleDropdownChange} 
                                    id="brand" 
                                    name="brand" 
                                    className="form-select flex-1"
                                    required
                                >
                                    <option value="">Select Brand</option>
                                    {(brands || []).map(brand => (
                                        <option key={brand.id} value={brand.name}>{brand.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center mt-4">
                                <label htmlFor="productStatus" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Status *
                                </label>
                                <select
                                    value={form.productStatus}
                                    onChange={handleDropdownChange}
                                    id="productStatus"
                                    name="productStatus"
                                    className="form-select flex-1"
                                    required
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            {/* <div className="mt-4 flex items-center">
                                <label htmlFor="Tags" className="block font-medium ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    Tags
                                </label>
                                <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded px-2 flex-1">
                                    {tags.map((tag, index) => (
                                        <div key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                                            #{tag}
                                            <button 
                                                type="button" 
                                                onClick={() => removeTag(index)} 
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    <input
                                        id="Tags"
                                        type="text"
                                        name="Tags"
                                        value={inputValue}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        className="form-input border-none flex-1 focus:outline-none"
                                        placeholder="Enter Tags"
                                    />
                                </div>
                            </div> */}

                            <div className="mt-4 flex items-center">
    <label htmlFor="Tags" className="block font-medium ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
        Tags
    </label>
    <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded px-2 flex-1">
        {tags.map((tag, index) => (
            <div key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                #{tag}
                <button 
                    type="button" 
                    onClick={() => removeTag(index)} 
                    className="text-red-500 hover:text-red-700"
                >
                    &times;
                </button>
            </div>
        ))}
        <input
            id="Tags"
            type="text"
            name="Tags"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="form-input border-none flex-1 focus:outline-none"
            placeholder="Enter Tags"
        />
    </div>
</div>
                        </div>
                    </div>
                    {/* Image Upload Section */}
                    <div className="p-6 bg-white rounded shadow-lg mt-6">
                        <h2 className="text-xl font-semibold mb-4">Product Images</h2>
                        <div className="mb-4">
                            <input 
                                type="file" 
                                accept="image/*" 
                                multiple 
                                onChange={handleImageChange} 
                                className="mb-3"
                            />
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            {previews.map((src, index) => (
                                <div key={index} className="relative">
                                    <img 
                                        src={src} 
                                        alt={`preview-${index}`} 
                                        className="w-24 h-24 object-cover rounded border" 
                                    />
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel flex justify-center items-center">
                <button 
                    onClick={handleSubmit} 
                    className="btn btn-success w-52"
                    disabled={!form.productId || !form.title || !form.categoryId || !form.brand}
                >
                    {id ? 'Update Product' : 'Add Product'}
                </button>
            </div>
        </div>
    );
};

export default AddNew;