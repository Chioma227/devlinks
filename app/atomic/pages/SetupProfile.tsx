"use client"
import Image from "next/image";
import {  useState } from "react";
import { v4 } from "uuid";
import DynamicIcon from "../atoms/Icon";
import InputField from "../atoms/Input";
import { inputVariant } from "@/app/variants/variants";
import { db, storage } from "@/firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


const SetupProfile = () => {
    const { DEFAULT } = inputVariant
    const [inputValues, setInputValues] = useState({
        fName: '',
        lName: '',
        email: ''
    })
    const [imageUrl, setImageUrl] = useState<string >('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
          setSelectedFile(selectedFile);
    
          const reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onload = () => {
            setImageUrl(reader.result as string);
          };
        }
      };

     const handleSubmit = async () => {
        if (!selectedFile) {
          console.error('Please select an image');
          return;
        }
    
        // Generate a unique ID for the user
        const userId = v4();
    
        // Upload image to Firebase Storage
        const storageRef = ref(storage, `images/${userId}/${selectedFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        await uploadTask;
        const downloadURL = await getDownloadURL(storageRef);
    
        // Store user data in Firestore
        await addDoc(collection(db, 'users'), {
          userId,
          ...inputValues, // Destructure inputValues for conciseness
          imageUrl: downloadURL,
        });
    
        setInputValues({ fName: '', lName: '', email: '' });
        setSelectedFile(null);
        setImageUrl('');
    

        console.log('Data submitted successfully!');
      };
    
    return (
        <>
            <header className='mb-[40px]'>
                <h3 className='text-[32px] text-dark_grey font-bold mb-[8px] m-0'>Profile Details</h3>
                <p className='text-grey text-[15px]'>Add your details to create a personal touch to your profile</p>
            </header>
            <section className="bg-white50 p-[20px] rounded-[12px] sm:flex block items-center">
                <p className="text-grey w-[340px]">Profile picture</p>
                <div className="file-input-container">
                    <input id="file-input" type="file" name="" hidden onChange={handleFileChange} className="file-input" />
                    <label htmlFor="file-input" className="cursor-pointer flex-col bg-lightPurple w-[195px] h-[195px] rounded-[12px] text-blue100 flex items-center justify-center ">
                       {selectedFile 
                       ? 
                       <div className="w-full h-full relative">
                        <Image  src={imageUrl} alt={imageUrl} height={50} width={50} className="w-full h-full object-cover rounded-[12px] brightness-50"/>
                        <p className="absolute top-[40%] left-[15%] text-white"> + Upload Image</p>
                       </div>
                       :
                       <div>
                         <DynamicIcon src="vector" alt="vector" className="w-[30px] h-[30px]" />
                            <p> + Upload Image</p>
                       </div>
                       }
                    </label>
                </div>
                <span className="text-grey text-wrap ml-[24px] text-[13px]">Image must be below 1024x1024px. Use PNG or JPG format</span>
            </section>
            <section className="bg-white50 mt-[24px] p-[20px] rounded-[12px] flex items-center">
                <div className="space-y-[12px] w-[100%]">
                    <div className="md:flex block justify-between items-start">
                        <label htmlFor="fName" className="text-grey">First Name*</label>
                        <InputField
                            name="fName"
                            type="text"
                            value={inputValues.fName}
                            variant={DEFAULT}
                            onChange={handleFormChange}
                            placeholder="e.g John"
                            className="md:w-[430px] w-[100%]"
                        />
                    </div>
                    <div className="md:flex block justify-between">
                        <label htmlFor="lName" className="text-grey">Last Name*</label>
                        <InputField
                            name="lName"
                            type="text"
                            value={inputValues.lName}
                            variant={DEFAULT}
                            onChange={handleFormChange}
                            placeholder="e.g Appleseed"
                            className="md:w-[430px] w-[100%]"
                        />
                    </div>
                    <div className="md:flex block justify-between">
                        <label htmlFor="email" className="text-grey">Email*</label>
                        <InputField
                            name="email"
                            type="email"
                            value={inputValues.email}
                            variant={DEFAULT}
                            onChange={handleFormChange}
                            placeholder="e.g example@example.com"
                            className="md:w-[430px] w-[100%]"
                        />
                    </div>
                    <button onClick={handleSubmit}>add</button>
                </div>
            </section>
        </>
    )
}

export default SetupProfile
