import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

import { db } from "./FirebaseConfig";
import { User } from "../routes/UserConfig";

const usersRef = collection(db, "users");

const getAllUsers = async () => {
  const userSnapshots = await getDocs(usersRef);
  const userList = userSnapshots.docs.map((doc) => doc.data());
  return userList;
};

const getUserById = async (user_id: string) => {
  const docRef = doc(usersRef, user_id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log(`Found user with data: ${docSnap.data()}`);
    return docSnap.data();
  } else {
    console.log("No such user found!");
  }
};

const addUser = async (user: User) => {
  try {
    await setDoc(doc(usersRef, user.id), {
      first_name: user.firstName,
      middle_name: user.middleName,
      last_name: user.lastName,
      email: user.email,
      username: user.username,
      role: user.role,
    });
    console.log(`Written doc.`);
  } catch (e) {
    console.error("Error writing document", e);
  }
};

export { getAllUsers, getUserById, addUser };
