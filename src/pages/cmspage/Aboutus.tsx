



import { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateAboutusMutation, useGetAboutusQuery } from '../../../features/aboutUs/aboutUs';
import { toast } from 'react-toastify';

interface ImagePreview {
  file?: File;
  preview: string;
}

const Aboutus = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('About Us'));
  }, [dispatch]);

  // 📝 Contents state
  const [contents, setContents] = useState<Record<string, string>>({});

  // 🖼️ Images state
  const [images, setImages] = useState<Record<string, ImagePreview | null>>({
    image: null,
    image2: null,
    image3: null,
  });

  // API hooks
  const { data, isFetching } = useGetAboutusQuery(undefined);
  const [createAboutus, { isLoading }] = useCreateAboutusMutation();

  // 🔄 Prefill when data is fetched
  useEffect(() => {
    if (data?.about) {
      const { content, content2, content3, content4, content5, content6, image, image2, image3 } = data.about;

      setContents({
        content: content || "",
        // content2: content2 || "",
        content3: content3 || "",
        content4: content4 || "",
        // content5: content5 || "",
        // content6: content6 || "",
      });

      setImages({
        image: image ? { preview: image } : null,
        image2: image2 ? { preview: image2 } : null,
        // image3: image3 ? { preview: image3 } : null,
      });
    }
  }, [data]);

  // 📤 Handle image change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImages((prev) => ({ ...prev, [key]: { file, preview } }));
    }
  };

  // ✍️ Handle content change
  const handleContentChange = (key: string, value: string) => {
    setContents((prev) => ({ ...prev, [key]: value }));
  };

  // 💾 Save handler
  const handleSave = async () => {
    try {
      const formData = new FormData();

      // append all contents
      Object.entries(contents).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // append all images
      Object.entries(images).forEach(([key, img]) => {
        if (img?.file) formData.append(key, img.file);
      });

      const result = await createAboutus(formData).unwrap();
      toast.success("About Us saved successfully!");
      console.log(result);
    } catch (error) {
      toast.error("Failed to save About Us");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
        <div className="text-lg ps-5 leading-none">About Us</div>
        <hr className="border-white-light dark:border-[#1b2e4b] my-6" />

        {isFetching ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="mt-8 px-4 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mx-auto">
            {/* ✍️ Editors */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Edit About Us</h2>

              {Object.keys(contents).map((key, idx) => (
                <div key={key}>
                  <label className="font-medium">{`Content ${idx + 1}`}</label>
                  <ReactQuill
                    value={contents[key]}
                    onChange={(val) => handleContentChange(key, val)}
                    className="bg-white mb-4"
                    theme="snow"
                  />
                </div>
              ))}

              <button
                onClick={handleSave}
                disabled={isLoading}
                className="btn btn-primary w-44 text-white px-6 py-2 rounded"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>

            {/* 👀 Live Preview & Uploads */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Live Preview</h2>
              <div className="border p-4 bg-white rounded shadow prose max-w-none">
                {Object.values(contents).map((c, i) => (
                  <div key={i} dangerouslySetInnerHTML={{ __html: c }} />
                ))}
              </div>

              {/* Image Uploads */}
              <div className="mt-6 space-y-4">
                {Object.keys(images).map((key, idx) => (
                  <div key={key}>
                    <label className="block font-medium">{`Image ${idx + 1}`}</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, key)}
                    />
                    {images[key]?.preview && (
                      <img
                        src={images[key]!.preview}
                        alt="preview"
                        className="mt-2 h-24 rounded"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Aboutus;
