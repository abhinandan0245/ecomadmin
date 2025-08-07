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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import React, { ChangeEvent } from 'react';
import React, { KeyboardEvent, ChangeEvent } from 'react';
import IconPlus from '../../components/Icon/IconPlus';
import { useCreateAboutusMutation } from '../../../features/aboutUs/aboutUs';
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
const Aboutus = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice Add'));
    });
    

    


 




// baner uploader 
// const [preview, setPreview] = useState<string | null>(null);
// const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setPreview(imageUrl);
//     }
//   };

//   about us 
const [content, setContent] = useState<string>("<p>Welcome to our About Us page!</p>");

 const [createAboutus, { isLoading }] = useCreateAboutusMutation();

  const handleSave = async () => {
    try {
    const result =  await createAboutus({ content }).unwrap();
    console.log(result)
      toast.success( 'Aboutus saved successfully!');
    } catch (error) {
      toast.error('Failed to save Aboutus');
      console.error(error);
    }
  };
    return (
        <div className="flex  flex-col gap-2.5">
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
            <div className="text-lg ps-5 leading-none">About Us</div>
                
                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="mt-8 px-4">
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
      {/* Left: Editor */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Edit About Us</h2>
        <ReactQuill
          value={content}
          onChange={setContent}
          className="bg-white mb-4"
          theme="snow"
        />
        <button
          onClick={handleSave}
           disabled={isLoading}
          className="btn btn-primary w-44 text-white px-6 py-2 rounded"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Right: Live Preview */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Live Preview</h2>
        <div className="border p-4 bg-white rounded shadow prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>    
                   
                </div>
               
            </div>
           
           
        </div>
    );
};

export default Aboutus;

