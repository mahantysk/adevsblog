import { signOut } from "firebase/auth";

import { auth } from "./FirebaseConfig";

const signOutUser = async () => {
  await signOut(auth);
};

export default signOutUser;
