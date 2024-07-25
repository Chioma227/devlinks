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

                        console.log("No such document!");
                    }
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

            </section>
        </div>
    )
}

export default Placeholder
