import { Link } from 'react-router-dom';
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
import IconUser from '../../components/Icon/IconUser';
import { IconCalendarCheck, IconCalendarCog, IconMail } from '@tabler/icons-react';
import IconCalendar from '../../components/Icon/IconCalendar';
import { CalendarDays, CircleUserRound, Mail, Paperclip, Pin } from 'lucide-react';
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
const ViewMessage = () => {
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

    // custom select box 
    const [options, setOptions] = useState<Option[]>([
        { value: "Uganda", label: "Uganda" },
        { value: "Ukraine", label: "Ukraine" },
        { value: "UAE", label: "United Arab Emirates" }
    ]);
    const [newOption, setNewOption] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const addOption = () => {
        if (newOption.trim() !== "" && !options.some(option => option.value === newOption)) {
            setOptions([...options, { value: newOption, label: newOption }]);
            setNewOption("");
        }
    };

    const removeOption = (value: string) => {
        setOptions(options.filter(option => option.value !== value));
        if (selectedOption?.value === value) {
            setSelectedOption(null);
        }
    };

    // products image 
    // const [images, setImages] = useState<ImagePreview[]>([]);

    // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    //   if (!e.target.files) return;
  
    //   const files = Array.from(e.target.files);
    //   const previews: ImagePreview[] = files.map(file => ({
    //     file,
    //     preview: URL.createObjectURL(file),
    //   }));
  
    //   const newImages = [...images, ...previews].slice(0, 5);
    //   setImages(newImages);
    // };
  
    // const removeImage = (index: number) => {
    //   const newImages = images.filter((_, i) => i !== index);
    //   setImages(newImages);
    // };

//    sizemultiselect 

    const options5 = [
        { value: 'Small', label: 'Small' },
        { value: 'lg', label: 'lg' },
        { value: 'Xl', label: 'Xl' },
    ];
    const options6 = [
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];


    // tags 

    const [inputValue, setInputValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault(); // prevent form submission

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


//   color image upload 

const [variants, setVariants] = useState<Variant[]>([]);

const addVariant = () => {
  setVariants((prev) => [...prev, { color: "", images: [], previews: [] }]);
};

const removeVariant = (index: number) => {
  const updated = [...variants];
  updated.splice(index, 1);
  setVariants(updated);
};

const handleColorChange = (index: number, value: string) => {
  const updated = [...variants];
  updated[index].color = value;
  setVariants(updated);
};

const handleImageChange = (
  index: number,
  files: FileList | null
) => {
  if (!files) return;

  const updated = [...variants];
  const newFiles = Array.from(files);

  const existingFiles = updated[index].images || [];
  const combinedFiles = existingFiles.concat(newFiles).slice(0, 5);

  const previews = combinedFiles.map((file) =>
    URL.createObjectURL(file)
  );

  updated[index].images = combinedFiles;
  updated[index].previews = previews;

  setVariants(updated);
};

const removeImage = (variantIndex: number, imageIndex: number) => {
  const updated = [...variants];
  updated[variantIndex].images.splice(imageIndex, 1);
  updated[variantIndex].previews.splice(imageIndex, 1);
  setVariants(updated);
};

    return (
        <div className="flex  flex-col gap-2.5">
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
            <div className="text-lg ps-5 leading-none font-bold">Message Details</div>
                
                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
            <div className="text-lg ps-5 leading-none">Customer Information :</div>
                <div className="mt-8 px-4">
                    <div className="flex justify-between lg:flex-row flex-col ">
                        <ul className='w-full space-y-1'>
                            <li className='bg-zinc-200/30 w-full p-4 rounded font-semibold'><div className='flex items-center gap-8'><div className='flex gap-2 items-center'><CircleUserRound className='size-5'/>Name :</div>John Doe</div></li>
                            <li className='bg-zinc-200/30 w-full p-4 rounded font-semibold'><div className='flex items-center gap-8'><div className='flex gap-2 items-center'><Mail className='size-5'/>Email :</div>JohnDoe@gmail.com</div></li>
                            <li className='bg-zinc-200/30 w-full p-4 rounded font-semibold'><div className='flex items-center gap-8'><div className='flex gap-2 items-center'><CalendarDays className='size-5'/>Sent At :</div>April 19, 2025, 10:32 AM</div></li>
                            <li className='bg-zinc-200/30 w-full p-4 rounded font-semibold'><div className='flex items-center gap-8'><div className='flex gap-2 items-center'><Pin className='size-5'/>Subject :</div>Issue with my order</div></li>
                            <li className='bg-zinc-200/30 w-full p-4 rounded font-semibold'><div className='flex items-center gap-8'><div className='flex gap-2 items-center'><Paperclip className='size-5'/>Attachment :</div><a
      href="/"
      download
      className="text-blue-600 underline hover:text-blue-800"
      target="_blank"
      rel="noopener noreferrer"
    >
      Download invoce.pdf
    </a></div></li>
                        </ul>
                    </div>
                    
                   
                </div>
               
            </div>
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
            <div className="text-lg ps-5 leading-none">Message Content</div>
                
                
               
            </div>
           
         
        </div>
    );
};

export default ViewMessage;
