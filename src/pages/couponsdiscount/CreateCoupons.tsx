import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import Select from 'react-select';
import { createCouponThunk, getByIdCouponsThunk, updateCouponsThunk } from '../../store/thunks/couponThunk';
import { toast } from 'react-toastify';
import { getAllProductThunk } from '../../store/thunks/productThunk';
import { clearCouponMessages } from '../../store/slices/couponSlice';
import IconArrowBackward from '../../components/Icon/IconArrowBackward';

interface Option {
    value: string;
    label: string;
}

const CreateCoupons = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const { successMessage, error } = useAppSelector((state) => state.coupon);
    const { products } = useAppSelector((state) => state.product);

    const [couponCode, setCouponCode] = useState('');
    const [description, setDescription] = useState('');
    const [discountType, setDiscountType] = useState<'%' | '₹'>('%');
    const [discountValue, setDiscountValue] = useState<string>('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [usageLimit, setUsageLimit] = useState<number | undefined>();
    const [minOrderValue, setMinOrderValue] = useState<number | undefined>();
    const [combineWithOtherCoupons, setCombineWithOtherCoupons] = useState(false);
    const [customerSegment, setCustomerSegment] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [showOnFronted, setShowOnFronted] = useState(false);
    const [productOptions, setProductOptions] = useState<Option[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Option[]>([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (successMessage && hasSubmitted) {
            toast.success(successMessage);
        }
        if (error && hasSubmitted) {
            toast.error(error);
        }
    }, [successMessage, error, hasSubmitted]);

    useEffect(() => {
        dispatch(clearCouponMessages()); // ✅ Clear old success/error messages
        dispatch(setPageTitle('Invoice Add'));
        dispatch(getAllProductThunk());

        if (id) {
            dispatch(getByIdCouponsThunk(id))
                .unwrap()
                .then((data) => {
                    setCouponCode(data.couponCode);
                    setDescription(data.description);
                    setDiscountType(data.discountType === 'percentage' ? '%' : '₹');
                    setDiscountValue(data.discountValue.toString());
                    setMinOrderValue(data.minOrderValue);
                    setUsageLimit(data.usageLimit);
                    setStartDate(data.startDate?.split('T')[0]);
                    setEndDate(data.endDate?.split('T')[0]);
                    setCombineWithOtherCoupons(data.combineWithOtherCoupons);
                    setCustomerSegment(data.customerSegment);
                    setIsActive(data.isActive);
                    setShowOnFronted(data.showOnFronted);
                    //     // ✅ Proper mapping from products
                    if (data.products?.length) {
                        const mapped = data.products.map((product: any) => ({
                            value: product.id.toString(),
                            label: product.title,
                        }));
                        setSelectedProducts(mapped);
                    }
                })

                .catch(() => toast.error('Failed to load coupon for editing'));
        }
    }, [dispatch, id]);

    useEffect(() => {
    if (products?.length) {
        const mapped = products.map((p: any) => ({
            value: p.id.toString(),
            label: p.title || `Product ${p.id}`,
        }));
        setProductOptions(mapped);
    }
}, [products]);


    const handleSave = () => {
        setHasSubmitted(true); // ✅ Only show toast after this
        const productIds = selectedProducts.map((p) => Number(p.value));
        const payload = {
            couponCode,
            description,
            usageLimit,
            minOrderValue,
            combineWithOtherCoupons,
            customerSegment,
            discountType: discountType === '%' ? 'percentage' : 'flat',
            discountValue: parseFloat(discountValue),
            startDate,
            endDate,
            isActive,
            showOnFronted,
            productIds,
        };

        if (id) {
            dispatch(updateCouponsThunk({ id, couponData: payload }));
        } else {
            dispatch(createCouponThunk(payload));
        }
    };

    useEffect(() => {
        if (!hasSubmitted) return; // ❌ Don't show toast if not submitted
        if (successMessage) {
            toast.success(successMessage);
            setTimeout(() => navigate('/couponsdiscount/all-coupons'), 1000);
        }
        if (error) toast.error(error);
    }, [successMessage, error, hasSubmitted]);

    return (
        <div className="flex flex-col gap-2.5">
            <div className="panel px-0 flex-1 py-6">
                <div className='flex justify-between items-center ltr:xl:mr-6'>
                    <div className="text-lg ps-5 leading-none">{id ? "Edit Coupon" : "Add New Coupon"}</div>
                 <button type="button" className="btn btn-dark gap-2" onClick={() => navigate(-1)}>
                                                                          <IconArrowBackward />
                                                                          Back To Coupon
                                                                      </button>
                </div>
                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />

                <div className="px-4">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-1/2 space-y-4">
                            <div>
                                <label className="block font-semibold">Coupon Code *</label>
                                <input type="text" className="form-input w-full" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Enter Coupon Code" />
                            </div>
                            <div>
                                <label className="block font-semibold">Description *</label>
                                <textarea className="form-textarea w-full" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" />
                            </div>
                            <div className="flex gap-2 items-center">
                                <label className="font-semibold">Discount Type *</label>
                                <button onClick={() => setDiscountType('%')} className={`btn ${discountType === '%' ? 'btn-primary' : 'btn-outline-primary'}`}>
                                    %
                                </button>
                                <button onClick={() => setDiscountType('₹')} className={`btn ${discountType === '₹' ? 'btn-success' : 'btn-outline-success'}`}>
                                    ₹
                                </button>
                                <input
                                    type="number"
                                    className="form-input flex-1 ml-4"
                                    placeholder={`Enter Discount in ${discountType}`}
                                    value={discountValue}
                                    onChange={(e) => setDiscountValue(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-4">
                                <input type="date" className="form-input" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                <input type="date" className="form-input" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                        </div>
                        <div className="lg:w-1/2 space-y-4">
                            <div>
                                <label className="block font-semibold">Usage Limit</label>
                                <input type="number" className="form-input w-full" value={usageLimit || ''} onChange={(e) => setUsageLimit(Number(e.target.value))} placeholder="Enter Usage Limit" />
                            </div>
                            <div>
                                <label className="block font-semibold">Min Order Value *</label>
                                <input
                                    type="number"
                                    className="form-input w-full"
                                    value={minOrderValue || ''}
                                    onChange={(e) => setMinOrderValue(Number(e.target.value))}
                                    placeholder="Enter Min Order Value"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Combine with Other Coupons *</label>
                                <select className="form-select w-full" value={combineWithOtherCoupons ? 'Yes' : 'No'} onChange={(e) => setCombineWithOtherCoupons(e.target.value === 'Yes')}>
                                    <option value="">Choose</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-semibold">Applicable Products *</label>
                                <Select options={productOptions} isMulti value={selectedProducts} onChange={(selected: any) => setSelectedProducts(selected as Option[])} />
                            </div>
                            <div>
                                <label className="block font-semibold">Customer Segment *</label>
                                <select className="form-select w-full" value={customerSegment} onChange={(e) => setCustomerSegment(e.target.value)}>
                                    <option value="">Choose</option>
                                    <option value="new">New User</option>
                                    <option value="returning">Returning User</option>
                                    <option value="all">All Users</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-semibold">Status *</label>
                                <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="form-checkbox" /> Active
                            </div>
                             <div>
                                <input type="checkbox" checked={showOnFronted} onChange={(e) => setShowOnFronted(e.target.checked)} className="form-checkbox" /> Show on Frontend
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel flex justify-center">
                <button onClick={handleSave} className="btn btn-success w-52">
                    Save
                </button>
            </div>
        </div>
    );
};

export default CreateCoupons;
