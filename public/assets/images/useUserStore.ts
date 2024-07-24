// stores/userStore.ts
import create from "zustand";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

interface User {
  id?: string;
  fName: string;
  email: string;
  lName: string;
  image: string;
}

interface UserStore {
  user: User | null;
  addUser: (
    fName: string,
    email: string,
    image: string,
    lname: string
  ) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  addUser: async (
    fName: string,
    email: string,
    image: string,
    lName: string
  ) => {
    try {
      const userRef = await addDoc(collection(db, "users"), {
        fName,
        lName,
        email,
        image,
      });
      set({ user: { id: userRef.id, fName, lName, email, image } });
    } catch (error) {
      console.log(error);
    }
  },
}));
