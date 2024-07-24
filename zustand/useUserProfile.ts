import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as dbRef, set } from "firebase/database";
import { storage, database } from "@/firebase/firebaseConfig";
import { getAuth } from "firebase/auth";

const handleImageUpload = async (
  file: any,
//   fName: string,
//   lName: string,
//   email: string
) => {
  try {
    const storageRef = ref(storage, `images/${file}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on("state_changed", () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
              const userId = user.uid;
              const dbRefUser = dbRef(database, `users/${userId}`);
              set(dbRefUser, {
                // fName,
                // lName,
                // email,
                imageUrl: downloadURL,
              })
                .then(() => {
                  resolve(downloadURL);
                })
                .catch((error) => {
                  reject(error);
                });
            } else {
              console.error("No user signed in to store user data");
              reject(new Error("User not signed in"));
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  } catch (error) {
    console.error("Error uploading image and storing user data:", error);
    throw error;
  }
};


const getFile = async (file:string) => {
  try {
    const filePath = `images/${file}`;
    const storageRef = ref(storage, filePath);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error getting download URL:', error);
    throw error;
  }
};



export  {handleImageUpload, getFile};
