import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import IconX from '../components/Icon/IconX';

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
}

const ConfirmDialog = ({
    open,
    title,
    message,
    confirmText = 'Delete',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    loading = false,
}: ConfirmDialogProps) => (
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
                            <button
                                type="button"
                                onClick={onCancel}
                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                            >
                                <IconX />
                            </button>
                            {title && (
                                <div className="text-lg font-medium bg-[#fbfbfb] text-center dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                    {title}
                                </div>
                            )}
                            <div className="p-5">
                                <div className="text-center mb-6">{message}</div>
                                <div className="flex justify-center items-center mt-8 gap-4">
                                    <button onClick={onConfirm} type="button" className="btn btn-success" disabled={loading}>
                                        {confirmText}
                                    </button>
                                    <button type="button" className="btn btn-outline-danger" onClick={onCancel} disabled={loading}>
                                        {cancelText}
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
);

export default ConfirmDialog;