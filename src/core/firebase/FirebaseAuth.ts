import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "./FirebaseConfig";
import UserRoles, { User } from "../routes/UserConfig";
import { addUser } from "./FireStoreUtil";

const registerUser = async (userFormData: User, password: string) => {
  return createUserWithEmail(userFormData.email, password)
    .then((userCredentials) => {
      // get the details of the created user
      const user = userCredentials.user;
      const id = user.uid;

      // create payload of user profile data to store in db
      const userDetails: User = {
        id,
        firstName: userFormData.firstName,
        middleName: userFormData.middleName,
        lastName: userFormData.lastName,
        username: userFormData.username,
        email: userFormData.email,
        role: UserRoles.Viewer,
      };

      addUser(userDetails)
        .then((addUserResponse) => {
          console.log(addUserResponse);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          return userDetails;
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`failed with code ${errorCode} and error: ${errorMessage}`);
      return null;
    });
};

const createUserWithEmail = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

const signInUser = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const signOutUser = async () => {
  await signOut(auth);
};

const getSignedInUser = () => {
  return auth.currentUser;
};

export { signOutUser, signInUser, getSignedInUser, registerUser };
