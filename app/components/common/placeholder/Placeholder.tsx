"use client"
import Link from "next/link";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, useEffect, useState } from "react";
import { useLinkStore } from "@/zustand/useLinkStore"
import DynamicIcon from "@/app/atomic/atoms/Icon";
import { auth, db } from "@/firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { UrlObject } from "url";


const Placeholder = () => {

    // const { links, fetchLinks } = useLinkStore()
    const [userData, setUserData] = useState<any>();


    const [links, setLinks] = useState<any>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'links'), (querySnapshot) => {
            const retrievedLinks = querySnapshot.docs.map((doc) => ({
                id: Number(doc.id),
                ...doc.data(),
            }));
            setLinks(retrievedLinks);
        });
        return unsubscribe;
    }, []);



    // useEffect(() => {
    //  console.log(links.platform);

    // })
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userId = user.uid;
                const getUserData = async () => {
                    const docRef = doc(db, "users", userId);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        console.log("Document data:", docSnap.data());
                    } else {
                        // docSnap.data() will be undefined in this case
                        console.log("No such document!");
                    }
                    // const docRef = doc(db, "users", userId);
                    // const docSnap = await getDoc(docRef);

                    // if (docSnap.exists()) {
                    //     setUserData(docSnap.data());
                    // } else {
                    //     console.log("No such document!");
                    //     setUserData('');
                    // }
                };
                getUserData();
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className='absolute top-[63px] left-[30px]'>
            <header className='mb-[46px] flex items-center justify-center flex-col'>
                {userData?.imageUrl ? <div>
                    <Image src={userData?.imageUrl} alt="user" />
                </div> : <div className='h-[96px] w-[96px] rounded-full bg-grey50 mb-[25px]'>

                </div>}

                {/* <div>
                        <p>{userData?.firstName} {userData?.lastName}</p>
                        <p>{userData?.email}</p>
                    </div> */}

                {userData?.fName && userData?.lName ? <div className='w-[160px] h-[16px] mb-[12px] bg-grey50 rounded-full'>{`${userData?.fName} ${userData?.lName}`}</div>
                    : <div className='w-[160px] h-[16px] mb-[12px] bg-grey50 rounded-full'></div>}
                {userData?.email ? <div className='w-[72px] h-[8px] bg-grey50 rounded-full'>{userData?.email}</div>
                    : <div className='w-[72px] h-[8px] bg-grey50 rounded-full'></div>}
            </header>
            <section className='space-y-[20px]'>
                {links.length === 0 ? <div className='w-[237px] h-[44px] rounded-[12px] bg-grey50'></div> :
                    <div>
                        {links.map((link: { platformColor: any; newLink: string | UrlObject; icon: string; platform: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; }, i: Key | null | undefined) => {
                            return (
                                <div key={i} style={{ backgroundColor: `${link.platformColor} ` }} className={`w-[237px] mb-[20px] h-[44px] rounded-[12px] text-white p-[9px]`}>
                                    <Link href={link.newLink} className="text-[13px] mt-[5px] flex items-center gap-[10px]">
                                        <DynamicIcon src={link.icon} alt={link.icon} className="text-white" /><span>{link.platform}</span>
                                    </Link>
                                </div>
                            )
                        })}

                    </div>
                }

                {/* {links[0] ? <div style={{ backgroundColor: `${links[0].platformColor} ` }} className={`w-[237px] h-[44px] rounded-[12px] text-white p-[9px]`}>
                    <Link href={links[0].newLink} className="text-[13px] mt-[5px] flex items-center gap-[10px]">
                        <DynamicIcon src={links[0].icon} alt={links[0].platform} className="text-white" /><span>{links[0].platform}</span>
                    </Link>
                </div>
                    :
                    <div className='w-[237px] h-[44px] rounded-[12px] bg-grey50'></div>}
                {links[1] ? <div style={{ backgroundColor: `${links[1].platformColor} ` }} className={`w-[237px] h-[44px] rounded-[12px]  text-white p-[9px]`}>
                    <Link href={links[1].newLink} className="text-[13px] mt-[5px] flex items-center gap-[10px]">
                        <DynamicIcon src={links[1].icon} alt={links[1].platform} className="text-white" /><span>{links[1].platform}</span>
                    </Link>
                </div> : <div className='w-[237px] h-[44px] rounded-[12px] bg-grey50'></div>}
                {links[2] ? <div style={{ backgroundColor: `${links[2].platformColor} ` }} className={`w-[237px] h-[44px] rounded-[12px] text-white p-[9px]`}>
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
                </div> : <div className='w-[237px] h-[44px] rounded-[12px] bg-grey50'></div>} */}


            </section>
        </div>
    )
}

export default Placeholder
