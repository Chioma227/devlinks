import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { storage, db } from "@/firebase/firebaseConfig"; 
import { getAuth } from "firebase/auth";

interface UserDetails {
  fName: string;
  lName: string;
  email: string;
  imageUrl: string;
}

const handleImageUpload = async (
  file: File,
  fName: string,
  lName: string,
  email: string
) => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
              const userId = user.uid;
              const userDocRef = doc(db, "users", userId);
              await setDoc(
                userDocRef,
                {
                  fName,
                  lName,
                  email,
                  imageUrl: downloadURL,
                },
                { merge: true }
              );
              resolve(downloadURL);
            } else {
              console.error("No user signed in to store user data");
              reject(new Error("User not signed in"));
            }
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error("Error uploading image and storing user data:", error);
    throw error;
  }
};

const getFile = async (file: string) => {
  try {
    const filePath = `images/${file}`;
    const storageRef = ref(storage, filePath);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error getting download URL:", error);
    throw error;
  }
};



const getUserDetails = async (): Promise<UserDetails | null> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        return userDoc.data() as UserDetails;;
      } else {
        console.error("No such document!");
        return null;
      }
    } else {
      console.error("No user signed in");
      return null;
    }
  } catch (error) {
    console.error("Error getting user details:", error);
    throw error;
  }
};


export { handleImageUpload, getFile, getUserDetails };
