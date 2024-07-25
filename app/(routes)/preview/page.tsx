"use client"
import ButtonComponent from "@/app/atomic/atoms/Button";
import DynamicIcon from "@/app/atomic/atoms/Icon"
import { buttonVariants } from "@/app/variants/variants";
import { auth, db } from "@/firebase/firebaseConfig";
import { useLinkStore } from "@/zustand/useLinkStore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link"
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { UrlObject } from "url";

const Preview = () => {
    // const { links } = useLinkStore()
    const [userData, setUserData] = useState<any>();
    const [links, setLinks] = useState<any>([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

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
                console.log(userId);
                
                const getUserData = async () => {
                    const docRef = doc(db, "users", userId);
                    const docSnap = await getDoc(docRef);

                    console.log(docSnap);
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        console.log("No such document!");
                        setUserData('');
                    }
                };
                getUserData();
            }
        });
        return () => unsubscribe();
    }, []);
    return (
        <main>
            <header className="sm:block hidden bg-blue100 p-[10px] w-[100%] h-[357px] rounded-bl-[20px] rounded-br-[20px]">
                <div className="w-full bg-white p-[10px] rounded-[9px] flex items-center justify-between">
                    {isLoggedIn && <Link href="/overview">
                        <ButtonComponent variant={buttonVariants.OUTLINE_FIT}>Back to editor</ButtonComponent>
                    </Link>}
                    <ButtonComponent variant={buttonVariants.FILLED_FIT}>Share Link</ButtonComponent>
                </div>
            </header>
            <div className="w-full sm:hidden bg-white p-[10px] rounded-[9px] flex items-center justify-between">
                {isLoggedIn && <Link href="/overview">
                    <ButtonComponent variant={buttonVariants.OUTLINE_FIT}>Back to editor</ButtonComponent>
                </Link>}

                <ButtonComponent variant={buttonVariants.FILLED_FIT}>Share Link</ButtonComponent>
            </div>
            <section className=" sm:flex items-center justify-center sm:mt-[-15%] mt-0 sm:p-0 p-[15px]">
                <main className="sm:w-[394px] sm:shadow-bg-shadow shadow-none sm:bg-white bg-transparent h-[569px] md:p-[56px] sm:p-[30px] p-[15px] rounded-[24px]">
                    {/* <div>
                        <Image src={userData?.imageUrl} alt="user" width={30} height={30} />
                    </div> */}
                    <section className="flex items-center mb-[30px] justify-center flex-col space-y-[7px]">
                        <div className="bg-grey50 h-[120px] w-[120px] rounded-full">

                        </div>
                        <div className='w-[160px] h-[16px] mb-[12px] bg-grey50 rounded-full'></div>
                        <div className='w-[72px] h-[8px] bg-grey50 rounded-full'></div>
                    </section>
                    <div>
                        <p>{userData?.fName} {userData?.lName}</p>
                        <p>{userData?.email}</p>
                    </div>
                    <div className="block space-y-[20px]">
                        {links.map((link: { platformColor: any; icon: string; platform: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; newLink: string | UrlObject; }, i: Key | null | undefined) => {
                            return (
                                <div key={i} style={{ background: link.platformColor }} className="text-white flex items-center justify-between h-[56px] rounded-[12px] p-[16px]">
                                    <div className="gap-[8px] flex items-center">
                                        <DynamicIcon src={link.icon} alt={link.icon} />
                                        <Link href={link.newLink} className="">
                                            {link.platform}
                                        </Link>
                                    </div>
                                    <FaArrowRight className="text-white" />
                                </div>
                            )
                        })}
                    </div>
                </main>
            </section>
        </main>
    )
}

export default Preview
