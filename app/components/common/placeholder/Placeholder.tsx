"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLinkStore } from "@/zustand/useLinkStore"
import DynamicIcon from "@/app/atomic/atoms/Icon";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";


const Placeholder = () => {

    const { fetchLinks, links } = useLinkStore()
    const [userData, setUserData] = useState<any>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userId = user.uid;
                const getUserData = async () => {
                    const docRef = doc(db, "users", userId);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        console.log("No such document!");
                        setUserData('');
                    }
                };
                getUserData();
            } else {
                // Handle user not logged in
            }
        });

        return () => unsubscribe();
    }, []);


    // useEffect(() => {
    //     fetchLinks();
    // }, [fetchLinks]);
    return (
        <div className='absolute top-[63px] left-[29px]'>
            <header className='mb-[46px] flex items-center justify-center flex-col'>
                <div className='h-[96px] w-[96px] rounded-full bg-grey50 mb-[25px]'>

                </div>
                {userData?.fName && userData?.lName ? <div className='w-[160px] h-[16px] mb-[12px] bg-grey50 rounded-full'>{`${userData?.fName} ${userData?.lName}`}</div>
                    : <div className='w-[160px] h-[16px] mb-[12px] bg-grey50 rounded-full'></div>}
                {userData?.email ? <div className='w-[72px] h-[8px] bg-grey50 rounded-full'>{userData?.email}</div>
                    : <div className='w-[72px] h-[8px] bg-grey50 rounded-full'></div>}
            </header>
            <section className='space-y-[20px]'>
                {links[0] ? <div style={{ backgroundColor: `${links[0].platformColor} ` }} className={`w-[237px] h-[44px] rounded-[12px] text-white p-[9px]`}>
                    <Link href={links[0].newLink} className="text-[13px] mt-[5px] flex items-center gap-[10px]">
                        <DynamicIcon src={links[0].icon} alt={links[0].platform} className="text-white" /><span>{links[0].platform}</span>
                    </Link>
                </div>
                    :
                    <div className='w-[237px] h-[44px] rounded-[12px] bg-grey50'></div>}
                {links[1] ? <div style={{ backgroundColor: `${links[1].platformColor} ` }} className={`w-[237px] h-[44px] rounded-[12px] bg-black text-white p-[9px]`}>
                    <Link href={links[1].newLink} className="text-[13px] mt-[5px] flex items-center gap-[10px]">
                        <DynamicIcon src={links[1].icon} alt={links[1].platform} className="text-white" /><span>{links[1].platform}</span>
                    </Link>
                </div> : <div className='w-[237px] h-[44px] rounded-[12px] bg-grey50'></div>}
                {links[2] ? <div style={{ backgroundColor: `${links[2].platformColor} ` }} className={`w-[237px] h-[44px] rounded-[12px] bg-black text-white p-[9px]`}>
                    <Link href={links[2].newLink} className="text-[13px] mt-[5px] flex items-center gap-[10px]">
                        <DynamicIcon src={links[2].icon} alt={links[2].platform} className="text-white" /><span>{links[2].platform}</span>
                    </Link>
                </div> : <div className='w-[237px] h-[44px] rounded-[12px] bg-grey50'></div>}
                {links[3] ? <div style={{ backgroundColor: `${links[3].platformColor} ` }} className={`w-[237px] h-[44px] rounded-[12px]  text-white p-[9px]`}>
                    <Link href={links[3].newLink} className="text-[13px] mt-[5px] flex  items-center gap-[10px]">
                        <DynamicIcon src={links[3].icon} alt={links[3].platform} className="text-white" /><span>{links[3].platform}</span>
                    </Link>
                </div> : <div className='w-[237px] h-[44px] rounded-[12px] bg-grey50'></div>}
                {links[4] ? <div style={{ backgroundColor: `${links[4].platformColor} ` }} className={`w-[237px] h-[44px] rounded-[12px] text-white p-[9px]`}>
                    <Link href={links[4].newLink} className="text-[13px] mt-[5px] flex items-center gap-[10px]">
                        <DynamicIcon src={links[4].icon} alt={links[4].platform} className="text-white" /><span>{links[4].platform}</span>
                    </Link>
                </div> : <div className='w-[237px] h-[44px] rounded-[12px] bg-grey50'></div>}
            </section>
        </div>
    )
}

export default Placeholder
