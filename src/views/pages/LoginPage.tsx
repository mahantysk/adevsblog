import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { InputField, TabGroup } from "../../widgets/form";
import { Button } from "../../widgets/form/Button";
import { getUserById } from "../../core/firebase/FireStoreUtil";
import UserRoles from "../../core/routes/UserConfig";
import { User } from "../../core/routes/UserConfig";
import { setAuthenticated, setUser } from "../../core/state/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RoutesMap } from "../../core/routes/Routes";
import {
  registerUser,
  signInUser,
  getSignedInUser,
} from "../../core/firebase/FirebaseAuth";

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
  const signInHadler = (event: any) => {
    event.preventDefault();
    signInUser(email, password)
      .then((response) => {
        console.log(response);
        let user = getSignedInUser();
        dispatch(setAuthenticated(true));
        dispatch(setUser(user));
        navigate(RoutesMap.Home);
      })
      .catch((error) => {
        console.log(error);
      });
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
      const userDetails = registerUser(
        {
          id: "",
          username,
          firstName,
          lastName,
          middleName: "",
          email,
          role: UserRoles.Viewer,
        },
        password
      );

      createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(`created user: ${user}`);

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
          onChange={handleUsernameChange}
          value={username}
        />

        <InputField
          labelText="Password"
          placeholder=""
          onChange={handlePasswordChange}
          value={password}
          password
        />

        <InputField
          labelText="Confirm Password"
          placeholder=""
          onChange={handleConfirmPasswordChange}
          value={confirmPassword}
          password
        />

        <InputField
          labelText="Email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
        />

        <InputField
          labelText="First Name"
          placeholder="First Name"
          onChange={handleFirstNameChange}
          value={firstName}
        />

        <InputField
          labelText="Last Name"
          placeholder="Last Name"
          onChange={handleLastNameChange}
          value={lastName}
        />
        <Button label="Sign Up with Email" secondary onClick={signupHandler} />
      </>
    );
  };

  const signInForm = () => {
    return (
      <>
        <InputField
          labelText="Email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
        />

        <InputField
          labelText="Password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
          password
        />

        <Button label="Login with Email" primary onClick={signInHadler} />
      </>
    );
  };

  const tabs = [
    {
      id: "0",
      title: "Sign In",
      content: signInForm,
      active: true,
    },
    {
      id: "1",
      title: "Sign Up",
      content: signUpForm(),
      active: false,
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center p-5">
      <div className="w-3/4 md:w-2/4 lg:w-2/4 xl:w-1/4 flex flex-col items-center justify-center border-2 border-blue-500 shadow-lg p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-500">Come Join Us!</h1>
        <TabGroup tabs={tabs} />
      </div>
    </div>
  );
}
