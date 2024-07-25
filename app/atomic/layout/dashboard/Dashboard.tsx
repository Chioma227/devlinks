"use client"
import React from "react";
import Header from "../../molecules/Header";
import Leftpanel from "@/app/components/common/Leftpanel";
import RightPanel from "@/app/components/common/RightPanel";
import { getFile } from "@/zustand/useUserProfile";
import { useState } from "react";
import { useEffect } from "react";
import { inputVariant } from "@/app/variants/variants";
import { useUserStore } from "@/public/assets/images/useUserStore";
import { handleImageUpload } from "@/zustand/useUserProfile";

const Dashboard = () => {


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
    // useEffect(() => {
    // localStorage.clear()
    // });



    return (
        <main className="md:p-[24px] p-0 ">
            <Header />
            <section className=" md:px-0 px-[20px] flex gap-[24px] mt-[24px]">
                <Leftpanel />
                <RightPanel />
            </section>
        </main>
    )
}

export default Dashboard