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
import IconPlus from '../../components/Icon/IconPlus';
import { ChevronDown } from 'lucide-react';

const TicketGenrate = () => {
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

    const [uploadImage , setUploadImage] = useState<string | null>(null);

    const handleUploadImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(file){
            setUploadImage(URL.createObjectURL(file));
        }
    };

    // subject select text serach 
    const [subjects, setSubjects] = useState<string[]>([
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "History",
      ]);
      const [search, setSearch] = useState("");
      const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
      const handleSelect = (subject: string) => {
        setSelectedSubject(subject);
        setIsDropdownOpen(false);
      };
    
      const handleAddNew = () => {
        if (search.trim() && !subjects.includes(search)) {
          setSubjects([...subjects, search]);
          setSelectedSubject(search);
        }
        setSearch("");
        setIsDropdownOpen(false);
      };

    return (
        <div className="flex  flex-col gap-2.5">
             <div className="panel ltr:xl:mr-6 rtl:xl:ml-6 text-lg ps-5 leading-none">Ticket Genrate</div>
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
           
               
                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="mt-8 px-4">
                    <div className="flex  flex-col">
                    <div className="relative mt-4 flex items-center">
      <label htmlFor="subject" className="block  ltr:mr-2 rtl:ml-2 w-1/6 mb-0 text-gray-700">
        Name of Subject
      </label>

      {/* Select Box */}
      <div
        className="relative flex items-center border p-2 rounded-lg cursor-pointer flex-1"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <input
          type="text"
          id="subject"
          name="subject"
          className="flex-1 outline-none bg-transparent"
          placeholder="Select or enter subject"
          value={search || selectedSubject || ""}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
        />
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </div>

      {/* Dropdown List */}
      {isDropdownOpen && (
        <div className="absolute z-10 top-8 left-[265px] mt-1 w-full max-w-[1290px] bg-white border rounded-lg shadow-lg max-h-48 overflow-auto">
          {subjects
            .filter((subj) => subj.toLowerCase().includes(search.toLowerCase()))
            .map((subj) => (
              <div
                key={subj}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(subj)}
              >
                {subj}
              </div>
            ))}

          {/* Add New Subject Option */}
          {search && !subjects.includes(search) && (
            <div
              className="p-2 text-blue-600 hover:bg-blue-100 cursor-pointer"
              onClick={handleAddNew}
            >
              Add "{search}"
            </div>
          )}
        </div>
      )}
    </div>
                    <div className="mt-4 flex items-center">
                                <label htmlFor="text-message" className="ltr:mr-2 rtl:ml-2 w-1/6 mb-0">
                                    Text Message
                                </label>
                                <textarea id="_TextMessage"  name="textmessage" rows={12} className="form-input flex-1" placeholder="Enter Text Message" />
                            </div>
                    <div className="mt-4 flex items-center">
                                <label htmlFor="select-image" className="ltr:mr-2 rtl:ml-2 w-1/6 mb-0">
                                    Select Image (Optional)
                                </label>
                                <div className="mt-4 flex items-center space-x-4">
      {/* Upload Button */}
      <label
        htmlFor="select-image"
        className="w-12 h-12 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer"
      >
        <IconPlus className="w-6 h-6 text-gray-500" />
      </label>
      <input
        id="select-image"
        type="file"
        name="selectimage"
        className="hidden"
        onChange={handleUploadImageChange}
        accept="image/*"
      />

      {/* Show Uploaded Image */}
      {uploadImage && <img src={uploadImage} alt="Uploaded" className="w-16 h-16 rounded-lg object-cover" />}
    </div>
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

export default TicketGenrate;
