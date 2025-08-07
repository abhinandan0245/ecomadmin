import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import IconX from '../../components/Icon/IconX';
import IconDownload from '../../components/Icon/IconDownload';
import IconEye from '../../components/Icon/IconEye';
import IconSend from '../../components/Icon/IconSend';
import IconSave from '../../components/Icon/IconSave';
import Select from 'react-select';

const ContactInfo = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice Add'));
    });
    const currencyList = ['USD - US Dollar', 'GBP - British Pound', 'IDR - Indonesian Rupiah', 'INR - Indian Rupee', 'BRL - Brazilian Real', 'EUR - Germany (Euro)', 'TRY - Turkish Lira'];

    const [items, setItems] = useState<any>([
        {
            id: 1,
            title: '',
            description: '',
            rate: 0,
            quantity: 0,
            amount: 0,
        },
    ]);

    const addItem = () => {
        let maxId = 0;
        maxId = items?.length ? items.reduce((max: number, character: any) => (character.id > max ? character.id : max), items[0].id) : 0;

        setItems([...items, { id: maxId + 1, title: '', description: '', rate: 0, quantity: 0, amount: 0 }]);
    };

    const removeItem = (item: any = null) => {
        setItems(items.filter((d: any) => d.id !== item.id));
    };

    const changeQuantityPrice = (type: string, value: string, id: number) => {
        const list = items;
        const item = list.find((d: any) => d.id === id);
        if (type === 'quantity') {
            item.quantity = Number(value);
        }
        if (type === 'price') {
            item.amount = Number(value);
        }
        setItems([...list]);
    };

    // searchable select 
    const options = [
        { value: 'Venezuela', label: 'Venezuela' },
        { value: 'Vietnam', label: 'Vietnam' },
        { value: 'India', label: 'India' }
    ];

    return (
        <div className="flex  flex-col gap-2.5">
             <div className="panel ltr:xl:mr-6 rtl:xl:ml-6 text-lg ps-5 leading-none">Contact Information</div>
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
           
               
                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="mt-8 px-4">
                    <div className="flex  flex-col">
                    <div className="mt-4 flex items-center">
                                <label htmlFor="SupportMailId" className="ltr:mr-2 rtl:ml-2 w-1/6 mb-0">
                                    Support mail Id
                                </label>
                                <input id="_SupportMailId" type="email" name="SupportMailId" className="form-input flex-1" placeholder="Enter Mail-Id" />
                            </div>
                    <div className="mt-4 flex items-center">
                                <label htmlFor="SupportContact" className="ltr:mr-2 rtl:ml-2 w-1/6 mb-0">
                                    Support for Contact
                                </label>
                                <input id="_SupportContact"  type='number' name="textmessage" className="form-input flex-1" placeholder="Enter Contact No" />
                            </div>
                  
                    </div>
                </div>
               
            </div>
            {/* button  */}

            <div className="panel ltr:xl:mr-6 rtl:xl:ml-6 text-lg ps-5 leading-none flex justify-center">
                <button type='button' className='btn btn-primary w-44'>Save</button>
            </div>
            
        </div>
    );
};

export default ContactInfo;
