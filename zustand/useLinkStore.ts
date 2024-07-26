import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { create } from "zustand";
import { auth, db } from "@/firebase/firebaseConfig";
import { persist } from "zustand/middleware";
import useAuthStore from "./useAuthStore";
import { getAuth } from "firebase/auth";

interface Link {
  id?: string;
  icon: string;
  newLink: string;
  platform: string;
  platformColor: string;
}

interface inputs {
  id:string,
  newLink: string;
  platform: string;
  isDisabled?: boolean;
}

interface LinkState {
  links: Link[];
  message: string;
  linkInputs: inputs[];
  addLinkInput: () => void;
  isLoading: boolean;
  isRemoving: boolean;
  fetchLinks: () => Promise<void>;
  handleSubmit: (index: number, data:Link) => Promise<void>;
  handleRemove: (linkInputs:inputs[], index: number) => void;
  handleInputChange: (index: number, field: string, value: string) => void;
}


export const useLinkStore = create<LinkState>()(
  persist(
    (set, get) => ({
      message: "",
      links: [],
      isLoading: false,
      isRemoving: false,
      linkInputs: [{ platform: '', newLink: '', isDisabled: false, id: '',}],

      //add new link input
      addLinkInput: () => set((state) => ({ linkInputs: [...state.linkInputs, { platform: '', newLink: '', isDisabled: false, id: '', }] })),


      //input change
      handleInputChange: (index: number, field: string, value: string) => set((state) => {
        const newLinkInputs:any = [...state.linkInputs];
          newLinkInputs[index][field] = value;
        return { linkInputs: newLinkInputs };
      }),


      //fetch links
      fetchLinks: async () => {
      
        const linksCollection = collection(db, "links");
        const linksSnapshot = await getDocs(linksCollection);
        const linksList = linksSnapshot.docs.map((doc) => ({
          id: doc.id,
          newLink: doc.data().newLink,
        })) as Link[];
        set({ links: linksList });
      },


      //add link
      handleSubmit: async (index, data) => {
          try {
            set({isLoading: true})
            const user = getAuth().currentUser;
            const userId = user?.uid ?? '';
            const docRef = doc(db, 'links', userId);
            await setDoc(docRef, data);
            const state = get();

            const newLinkInputs = [...state.linkInputs];
            newLinkInputs[index] = { ...data, id: docRef.id };
            newLinkInputs[index].isDisabled = true;
            set({ linkInputs: newLinkInputs, isLoading:false });

            const querySnapshot = await getDocs(collection(db, 'links'));
            const retrievedLinks = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              icon:data.icon,
              newLink: data.newLink,
              platform: data.platform,
              platformColor: data.platformColor
            }));
            set({ links: retrievedLinks });
          } catch (error) {
            console.error('Error adding link:', error);
          }
      },


      //remove input and corresponding link item
      handleRemove: async (linkInputs: inputs[], index: number) => {
        set({isRemoving:true})
        const linkToRemove = linkInputs[index];
       
        await deleteDoc( doc(db, 'links', linkToRemove.id))
    
        set((state) => ({
          linkInputs: state.linkInputs.filter((_, i) => i !== index)
        }));
        set({isRemoving:false})
      },
      
    }),
    {
      name: "link-store",
    }
  )
);
