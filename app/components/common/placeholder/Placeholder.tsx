"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import DynamicIcon from "@/app/atomic/atoms/Icon";
import {  doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Placeholder = () => {
    const [userData, setUserData] = useState<any>();
    const [links, setLinks] = useState<any>([]);

    //get links
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                const userId = user.uid;
                const fetchUserLinks = async () => {
                    const docRef = doc(db, 'users', userId);
                    const docSnapshot = await getDoc(docRef);
                    if (docSnapshot.exists()) {
                        const docData = docSnapshot.data();
                        const retrievedLinks = docData.links || [];
                        setLinks(retrievedLinks);
                    } else {
                        setLinks([]);
                    }
                };
                fetchUserLinks();
            } else {
                setLinks([]);
            }
        });
        return () => unsubscribe();
    }, [setLinks]);



    //get user data
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userId = user.uid;
                const getUserData = async () => {
                    const docRef = doc(db, "users", userId);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data()
                        setUserData(data)
                    }
                };
                getUserData();
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className='absolute top-[63px] left-[30px]'>
            <header className='mb-[30px] flex items-center justify-center flex-col'>
                {userData?.imageUrl ?
                    <div className="h-[120px] w-[120px] mb-[10px] rounded-full border-[4px] border-blue100">
                        <img src={userData?.imageUrl} alt="user" className="h-full rounded-full w-full object-cover" />
                    </div> : <div className="bg-grey50 h-[120px] w-[120px] rounded-full">

                    </div>}
                {userData?.fName ? <p className="text-[32px] text-dark_grey font-bold">{userData?.fName} {userData?.lName}</p> : <div className='w-[160px] h-[16px] mb-[12px] bg-grey50 rounded-full'></div>}
                {userData?.email ? <p className="text-border">{userData?.email}</p> : <div className='w-[72px] h-[8px] bg-grey50 rounded-full'></div>}
            </header>
            <section className='space-y-[20px]'>
                {
                    links[0] ? <div style={{ backgroundColor: `${links[0].platformColor} ` }} className={`w-[237px] mb-[20px] h-[44px] flex items-center justify-between rounded-[12px] text-white p-[9px]`}>
                        <div className="gap-[8px] flex items-center">
                            <DynamicIcon src={links[0].icon} alt={links.icon} />
                            <Link href={links[0].newLink} className="">
                                {links[0].platform}
                            </Link>
                        </div>
                        <FaArrowRight className="text-white" />
                    </div>
                        :
                        <div className='w-[237px] h-[44px] rounded-[12px] bg-grey50'></div>
                }
                {
                    links[1] ? <div style={{ backgroundColor: `${links[1].platformColor} ` }} className={`w-[237px] mb-[20px] h-[44px] flex items-center justify-between rounded-[12px] text-white p-[9px]`}>
                        <div className="gap-[8px] flex items-center">
                            <DynamicIcon src={links[1].icon} alt={links.icon} />
                            <Link href={links[1].newLink} className="">
                                {links[1].platform}
                            </Link>
                        </div>
                        <FaArrowRight className="text-white" />
                    </div>
                        :
                        <div className='w-[237px] h-[44px] rounded-[12px] bg-grey50'></div>
                }
                {
                    links[2] ? <div style={{ backgroundColor: `${links[2].platformColor} ` }} className={`w-[237px] mb-[20px] h-[44px] flex items-center justify-between rounded-[12px] text-white p-[9px]`}>
                        <div className="gap-[8px] flex items-center">
                            <DynamicIcon src={links[2].icon} alt={links.icon} />
                            <Link href={links[2].newLink} className="">
                                {links[2].platform}
                            </Link>
                        </div>
                        <FaArrowRight className="text-white" />
                    </div>
                        :
                        <div className='w-[237px] h-[44px] rounded-[12px] bg-grey50'></div>
                }
                {
                    links[3] ? <div style={{ backgroundColor: `${links[3].platformColor} ` }} className={`w-[237px] mb-[20px] h-[44px] flex items-center justify-between rounded-[12px] text-white p-[9px]`}>
                        <div className="gap-[8px] flex items-center">
                            <DynamicIcon src={links[3].icon} alt={links.icon} />
                            <Link href={links[3].newLink} className="">
                                {links[3].platform}
                            </Link>
                        </div>
                        <FaArrowRight className="text-white" />
                    </div>
                        :
                        <div className='w-[237px] h-[44px] rounded-[12px] bg-grey50'></div>
                }
                {
                    links[4] ? <div style={{ backgroundColor: `${links[4].platformColor} ` }} className={`w-[237px] mb-[20px] h-[44px] flex items-center justify-between rounded-[12px] text-white p-[9px]`}>
                        <div className="gap-[8px] flex items-center">
                            <DynamicIcon src={links[4].icon} alt={links.icon} />
                            <Link href={links[4].newLink} className="">
                                {links[4].platform}
                            </Link>
                        </div>
                        <FaArrowRight className="text-white" />
                    </div>
                        :
                        <div className='w-[237px] h-[44px] rounded-[12px] bg-grey50'></div>
                }
            </section>
        </div>
    )
}

export default Placeholder
