import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { InputField, TabGroup } from "../../widgets/form";
import { Button } from "../../widgets/form/Button";
import { addUser, getUserById } from "../../core/firebase/FireStoreUtil";
import UserRoles from "../../core/routes/UserConfig";
import { User } from "../../core/routes/UserConfig";
import { setAuthenticated, setUser } from "../../core/state/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RoutesMap } from "../../core/routes/Routes";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const firebaseAuth = getAuth();
  const loggedInUser = firebaseAuth.currentUser;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");

  const handleUsernameChange = (event: any) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value);
  };

  const handleFirstNameChange = (event: any) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: any) => {
    setLastName(event.target.value);
  };

  const signupHandler = (event: any) => {
    event.preventDefault();
    console.log(username);

    if (loggedInUser) {
      console.log("User already signed in: " + loggedInUser.email);
      console.log("Fetching user details from database: " + loggedInUser.uid);
      getUserById(loggedInUser.uid)
        .then((userData) => {
          console.log("User details: " + JSON.stringify(userData));

          if (userData) {
            const userDetails: User = {
              id: loggedInUser.uid,
              firstName: userData.first_name,
              middleName: userData.middle_name,
              lastName: userData.last_name,
              username: userData.username,
              email: userData.email,
              role: userData.role,
            };
            dispatch(setUser(userDetails));
          }
          dispatch(setAuthenticated(true));
          navigate(RoutesMap.Home);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("User not signed in. Proceeding to login: " + email);
      createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(`created user: ${user}`);
          const id = user.uid;
          const userDetails: User = {
            id,
            firstName,
            middleName: "",
            lastName,
            username,
            email,
            role: UserRoles.Viewer,
          };
          addUser(userDetails);
          dispatch(setUser(userDetails));
          dispatch(setAuthenticated(true));
          console.log("User added to database: " + user);
          navigate(RoutesMap.Home);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(
            `failed with code ${errorCode} and error: ${errorMessage}`
          );
        });
    }
  };
  const signUpForm = () => {
    return (
      <>
        <InputField
          labelText="Username"
          placeholder="Username"
          className="text-xl p-2 border-2 rounded-md border-gray-400 text-gray-700"
          labelClassName="text-xl p-1 font-bold text-gray-800"
          onChange={handleUsernameChange}
          value={username}
        />

        <InputField
          labelText="Password"
          placeholder=""
          className="text-xl p-2 border-2 rounded-md border-gray-400 text-gray-700"
          labelClassName="text-xl p-1 font-bold text-gray-800"
          onChange={handlePasswordChange}
          value={password}
          password
        />

        <InputField
          labelText="Confirm Password"
          placeholder=""
          className="text-xl p-2 border-2 rounded-md border-gray-400 text-gray-700"
          labelClassName="text-xl p-1 font-bold text-gray-800"
          onChange={handleConfirmPasswordChange}
          value={confirmPassword}
          password
        />

        <InputField
          labelText="Email"
          placeholder="Email"
          className="text-xl p-2 border-2 rounded-md border-gray-400 text-gray-700"
          labelClassName="text-xl p-1 font-bold text-gray-800"
          onChange={handleEmailChange}
          value={email}
        />

        <InputField
          labelText="First Name"
          placeholder="First Name"
          className="text-xl p-2 border-2 rounded-md border-gray-400 text-gray-700"
          labelClassName="text-xl p-1 font-bold text-gray-800"
          onChange={handleFirstNameChange}
          value={firstName}
        />

        <InputField
          labelText="Last Name"
          placeholder="Last Name"
          className="text-xl p-2 border-2 rounded-md border-gray-400 text-gray-700"
          labelClassName="text-xl p-1 font-bold text-gray-800"
          onChange={handleLastNameChange}
          value={lastName}
        />
      </>
    );
  };

  const signInForm = () => {
    return (
      <>
        <InputField
          labelText="Email"
          placeholder="Email"
          className="text-xl p-2 border-2 rounded-md border-gray-400 text-gray-700"
          labelClassName="text-xl p-1 font-bold text-gray-800"
          onChange={handleEmailChange}
          value={email}
        />

        <InputField
          labelText="Password"
          placeholder=""
          className="text-xl p-2 border-2 rounded-md border-gray-400 text-gray-700"
          labelClassName="text-xl p-1 font-bold text-gray-800"
          onChange={handlePasswordChange}
          value={password}
          password
        />
      </>
    );
  };

  const tabs = [
    {
      id: "0",
      title: "SignIn",
      content: signInForm,
      active: true,
    },
    {
      id: "1",
      title: "SignUp",
      content: signUpForm(),
      active: false,
    },
  ];
  return (
    <div className="md:w-full flex flex-col items-center justify-center p-5">
      <div className="w-2/4 flex flex-col items-center justify-center border-2 border-blue-500 shadow-lg p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-500">Come Join Us!</h1>
        <TabGroup tabs={tabs} />
        <div className="flex">
          <Button label="Sign Up with Email" primary onClick={signupHandler} />
          <Button label="Login with Google" secondary />
        </div>
      </div>
    </div>
  );
}
