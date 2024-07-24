import create from "zustand";
import { User } from "firebase/auth";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../firebase/firebaseConfig";

interface AuthState {
  loading: boolean;
  isError: boolean;
  user: User | null;
  error: string;
  logoutUser: () => void;
  loginUser: (email: string, password: string) => Promise<void>;
  createUser: (email: string, password: string, confirmPassword:string) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isError: false,
  error: '',
  loading: false,
  createUser: async (email, password, confirmPassword) => {
    set({ loading: true, error: '' });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!password || !email) {
        set({ error: "Can't be empty", isError: true, loading: false });
        return;
      }

      //ensure password and confirm password match
      if (password !== confirmPassword || password.length < 8) {
        set({ error: "Check again", isError: true, loading: false });
        return;
      }
      set({ user: userCredential.user, loading: false });

    } catch (error: any) {
      set({ error: "Try again", isError: true, loading: false });
    }
  },

  loginUser: async (email, password) => {
    set({ loading: true, error: '' });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      if (!password || !email) {
        set({ error: "Can't be empty", isError: true, loading: false });
        return;
    }
      set({ user: userCredential.user, loading: false });
    } catch (error: any) {
      set({ error: 'Try again', isError: true, loading: false });
    }
  },
  logoutUser: () => {
    auth.signOut();
    set({ user: null });
  },
}));

export default useAuthStore;
