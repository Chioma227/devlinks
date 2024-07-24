import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { create } from "zustand";
import { db } from "@/firebase/firebaseConfig";
import { persist } from "zustand/middleware";

interface Link {
  id: string;
  icon: string;
  platformColor: string;
  newLink: string;
  platform: string;
}

interface inputs {
  platform: string;
  url: string;
}

interface LinkState {
  links: Link[];
  message: string;
  linkInputs: inputs[];
  isLoading: boolean;
  fetchLinks: () => Promise<void>;
  removeLink: (id: string) => Promise<void>;
  addLink: (
    newLink: string,
    platform: string,
    platformColor: string,
    icon: string,
  ) => Promise<void>;
}

export const useLinkStore = create<LinkState>()(
  persist(
    (set) => ({
      message: "",
      links: [],
      isLoading: false,
      linkInputs: [{ platform: "", url: "" }],

      fetchLinks: async () => {
        const linksCollection = collection(db, "links");
        const linksSnapshot = await getDocs(linksCollection);
        const linksList = linksSnapshot.docs.map((doc) => ({
          id: doc.id,
          newLink: doc.data().newLink,
        })) as Link[];
        set({ links: linksList });
      },

      addLink: async (newLink, platform, platformColor, icon) => {
        set({ isLoading: true });
        try {
          const linkRef = await addDoc(collection(db, "links"), {
            newLink,
            platform,
            platformColor,
          });
          console.log(newLink);
          set((state) => ({
            links: [
              ...state.links,
              { id: linkRef.id, newLink, platform, platformColor, icon },
            ],
          }));
          set({ isLoading: false, message: "Successfully added new link" });
          console.log(`Document added with ID: ${linkRef.id}`);
        } catch (error) {
          set({ isLoading: false, message: "Unable to add link" });
          console.error("Error adding document: ", error);
        }
      },

      removeLink: async (id: string) => {
        await deleteDoc(doc(db, "links", id));
        set((state) => ({
          links: state.links.filter((link) => link.id !== id),
        }));
      },
    }),
    {
      name: "link-store",
    }
  )
);
