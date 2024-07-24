import {  useState, useEffect } from "react";
import { getFile } from "@/zustand/useUserProfile";
import DynamicIcon from "../atoms/Icon";
import InputField from "../atoms/Input";
import { inputVariant } from "@/app/variants/variants";
import { useUserStore } from "@/public/assets/images/useUserStore";
import {handleImageUpload} from "@/zustand/useUserProfile";
import firebase from "firebase/compat/app";
import Image from "next/image";


const SetupProfile = () => {
    const [inputValues, setInputValues] = useState({
        fName: '',
        lName: '',
        email: ''
    })
    const { DEFAULT } = inputVariant
    const [fileName, setFileName] = useState<any>();
    const [imageUrl, setImageUrl] = useState('');
    const addUser = useUserStore((state) => state.addUser);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
          setFileName(selectedFile.name); // Set state directly
        }
    };



    const handleSubmit = async () => {
        // e.preventDefault();
        try {
            const downloadURL = await handleImageUpload(fileName);
            // Handle success, e.g., show a success message, redirect
            console.log('Image uploaded successfully:', downloadURL);
        } catch (error) {
            // Handle error, e.g., show an error message
            console.error('Error uploading image:', error);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };


    useEffect(() => {
      const filePath = `images/${fileName}`;
      getFile(filePath)
        .then((url:string) => setImageUrl(url))
        .catch(error => console.error('Error fetching image:', error));
    }, [fileName]);

    return (
        <>
            <header className='mb-[40px]'>
                <h3 className='text-[32px] text-dark_grey font-bold mb-[8px] m-0'>Profile Details</h3>
                <p className='text-grey text-[15px]'>Add your details to create a personal touch to your profile</p>
            </header>
            <section className="bg-white50 p-[20px] rounded-[12px] flex items-center">
                <p className="text-grey w-[340px]">Profile picture</p>
                <div className="file-input-container">
                    <input id="file-input" type="file" name="" hidden onChange={handleFileChange} className="file-input" />
                    <label htmlFor="file-input" className="cursor-pointer flex-col bg-lightPurple w-[195px] h-[195px] rounded-[12px] text-blue100 flex items-center justify-center ">
                        <DynamicIcon src="vector" alt="vector" className="w-[30px] h-[30px]" />
                        <p> + Upload Image</p>
                    </label>
                </div>
                <div>
                    {fileName && <img src={fileName} alt={fileName} height={40} width={40}/>}
                </div>
                <span className="text-grey text-wrap ml-[24px] text-[13px]">{fileName ? fileName : "Image must be below 1024x1024px. Use PNG or JPG format"}</span>
            </section>
            <section className="bg-white50 mt-[24px] p-[20px] rounded-[12px] flex items-center">
                <div className="space-y-[12px]">
                    <div className="flex justify-between items-start">
                        <label htmlFor="fName" className="text-grey">First Name*</label>
                        <InputField
                            name="fName"
                            type="text"
                            value={inputValues.fName}
                            variant={DEFAULT}
                            onChange={handleFormChange}
                            placeholder="e.g John"
                            className="w-[430px]"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="lName" className="text-grey">Last Name*</label>
                        <InputField
                            name="lName"
                            type="text"
                            value={inputValues.lName}
                            variant={DEFAULT}
                            onChange={handleFormChange}
                            placeholder="e.g Appleseed"
                            className="w-[430px]"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="email" className="text-grey">Email*</label>
                        <InputField
                            name="email"
                            type="email"
                            value={inputValues.email}
                            variant={DEFAULT}
                            onChange={handleFormChange}
                            placeholder="e.g example@example.com"
                            className="w-[430px]"
                        />
                    </div>
                    <button onClick={handleSubmit}>add</button>
                </div>
            </section>
        </>
    )
}

export default SetupProfile
