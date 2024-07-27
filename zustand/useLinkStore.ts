import {
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { create } from "zustand";
import { auth, db } from "@/firebase/firebaseConfig";
import { persist } from "zustand/middleware";
import { v4 } from "uuid";
import { getAuth } from "firebase/auth";

interface Link {
  id?: string;
  icon: string;
  newLink: string;
  platform: string;
  platformColor: string;
}


interface inputs {
  links?: Link,
  id: string,
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
  loadLinks: () => Promise<void>;
  handleRemove: (linkId: string) => void;
  addLink: (index: number, link: Link) => Promise<void>;
  handleInputChange: (index: number, field: string, value: string) => void;
}


export const useLinkStore = create<LinkState>()(
  persist(
    (set, get) => ({
      message: "",
      links: [],
      isLoading: false,
      isRemoving: false,
      linkInputs: [{ platform: '', newLink: '', isDisabled: false, id: '', }],

      //add new link input
      addLinkInput: () => set((state) => ({ linkInputs: [...state.linkInputs, { platform: '', newLink: '', isDisabled: false, id: '', }] })),


      //input change
      handleInputChange: (index: number, field: string, value: string) => set((state) => {
        const newLinkInputs: any = [...state.linkInputs];
        newLinkInputs[index][field] = value;
        return { linkInputs: newLinkInputs };
      }),


      //fetch links



      loadLinks: async () => {
        set({ isLoading: true });
        try {
          const user = getAuth().currentUser;
          const userId = user?.uid ?? '';
          const docRef = doc(db, 'users', userId);

          const docSnapshot = await getDoc(docRef);
          if (docSnapshot.exists()) {
            const docData = docSnapshot.data();
            set({ links: docData.links || [], isLoading: false });
          } else {
            set({ links: [], isLoading: false });
          }
        } catch (error) {
          console.error('Error loading links:', error);
          set({ isLoading: false });
        }
      },


      addLink: async (index, link: Link) => {
        set({ isLoading: true });
        try {
          const user = getAuth().currentUser;
          const userId = user?.uid ?? '';
          const docRef = doc(db, 'users', userId);


          const linkId = v4();
          const newLink = { ...link, id: linkId };

          const state = get();
          const newLinkInputs = [...state.linkInputs];
          newLinkInputs[index] = { ...newLink, isDisabled: true };
          set({ linkInputs: newLinkInputs });


          // Get the current document data
          const docSnapshot = await getDoc(docRef);
          let updatedLinks: Link[] = [];

          if (docSnapshot.exists()) {
            const docData = docSnapshot.data();
            updatedLinks = docData.links ? [...docData.links, link] : [link];
            console.log(updatedLinks);

          } else {
            updatedLinks = [link];
          }

          // update the Firestore document
          await setDoc(docRef, { links: updatedLinks }, { merge: true });

          // update the local state
          set(
            {
              links: updatedLinks,
              isLoading: false,
            }
          );
        } catch (error) {
          console.error('Error adding link:', error);
          set({ isLoading: false });
        }
      },

      //remove input and corresponding link item
      handleRemove: async (linkId: string) => {
        try {
          const user = getAuth().currentUser;
          const userId = user?.uid ?? '';
          const docRef = doc(db, 'users', userId);

          // Get the current document data
          const docSnapshot = await getDoc(docRef);
          if (docSnapshot.exists()) {
            const docData = docSnapshot.data();
            const updatedLinks = docData.links.filter((link: Link) => link.id !== linkId);

            // Update the Firestore document
            await updateDoc(docRef, { links: updatedLinks });

            // Update the local state
            set({ links: updatedLinks});
          }
        } catch (error) {
          console.error('Error removing link:', error);
        }
      }
      //   set({ isRemoving: true })
      //   const linkToRemove = linkInputs[index];

      //   await deleteDoc(doc(db, 'links', linkToRemove.id))

      //   set((state) => ({
      //     linkInputs: state.linkInputs.filter((_, i) => i !== index)
      //   }));
      //   set({ isRemoving: false })
      // },

    }),
    {
      name: "link-store",
    }
  )
);
