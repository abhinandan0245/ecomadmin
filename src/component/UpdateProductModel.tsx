import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';

interface UpdateProductModalProps {
    open: boolean;
    productName: string;
    categoryName: string;
    brandName: string;
    currentStock: number;
    initialProductStatus: boolean;
    onUpdate: (newStock: number, productStatus: boolean) => void;
    onCancel: () => void;
    loading?: boolean;
    title?: string;
}

const UpdateProductModal = ({
    open,
    productName,
    categoryName,
    brandName,
    currentStock,
    initialProductStatus,
    onUpdate,
    onCancel,
    loading = false,
    title = 'Quick Update',
}: UpdateProductModalProps) => {
    // const [stock, setStock] = useState<number | "">(initialStock);
    // const [productStatus, setProductStatus] = useState(initialProductStatus);
    const [updateStock, setUpdateStock] = useState<number | ''>('');
    const [productStatus, setProductStatus] = useState(initialProductStatus);

    // useEffect(() => {
    //     setStock(initialStock);
    //     setProductStatus(initialProductStatus);
    // }, [initialStock, initialProductStatus, open]);

    useEffect(() => {
        setUpdateStock('');
        setProductStatus(initialProductStatus);
    }, [initialProductStatus, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (updateStock === '' || isNaN(Number(updateStock))) return;
        const newStock = currentStock + Number(updateStock);
        onUpdate(newStock, productStatus);
    };

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" open={open} onClose={onCancel} className="relative z-[51]">
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
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
                                <button type="button" onClick={onCancel} className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none">
                                    ×
                                </button>
                                <div className="text-lg font-medium bg-[#fbfbfb] text-center dark:bg-[#121c2c] py-3">{title}</div>
                                <form
                                    className="p-5"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">Product Name</label>
                                        <div className="form-input w-full bg-gray-100">{productName}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">Category</label>
                                        <div className="form-input w-full bg-gray-100">{categoryName}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">Brand</label>
                                        <div className="form-input w-full bg-gray-100">{brandName}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">Current Stock</label>
                                        <div className="form-input w-full bg-gray-100">{currentStock}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">Update Stock</label>
                                        <input
                                            type="number"
                                            className="form-input w-full"
                                            value={updateStock}
                                            min={0}
                                            onChange={(e) => setUpdateStock(e.target.value === '' ? '' : Number(e.target.value))}
                                            placeholder="Enter stock to add"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">Product Status</label>
                                        <select className="form-select w-full" value={productStatus ? 'active' : 'inactive'} onChange={(e) => setProductStatus(e.target.value === 'active')}>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-center items-center gap-4 mt-8">
                                        <button type="submit" className="btn btn-success" disabled={loading}>
                                            Update
                                        </button>
                                        <button type="button" className="btn btn-outline-danger" onClick={onCancel} disabled={loading}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default UpdateProductModal;
