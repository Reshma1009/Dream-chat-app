import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { InfinitySpin, FallingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { usersInformation } from "../../slices/userSlices";
const Login = () => {
  const auth = getAuth();
  const db = getDatabase();
  const provider = new GoogleAuthProvider();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [showPassIcon, setShowPassIcon] = useState(false);
  let [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };
  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
  };
  let handleSubmit = () => {
    if (!email) {
      setEmailErr("Email Is Requried");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailErr("You have entered an invalid email address!");
      }
    }
    if (!password) {
      setPasswordErr("Password Is Requried");
    }
    /* else {
      if (!/^(?=.*[a-z])/.test(password)) {
        setPasswordErr("Need least 1 lowercase character");
      } else if (!/^(?=.*[A-Z])/.test(password)) {
        setPasswordErr("Need least 1 uppercase character");
      } else if (!/^(?=.*[0-9])/.test(password)) {
        setPasswordErr("Need least 1 number");
      } else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
        setPasswordErr("Need least 1 special character");
      } else if (!/^(?=.{8,16})/.test(password)) {
        setPasswordErr("Need 8 to 16 characters");
      }
    } */
    if (email && password) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          toast.success("Login Successfull. Please Wait For Redriction.");
          setEmail("");
          setPassword("");
          dispatch(usersInformation(user));
          localStorage.setItem("userRegistationIfo", JSON.stringify(user));
          setTimeout(() => {
            navigate("/");
          }, 2500);
          setLoading(false);
        })
        .catch((error) => {
          const errorMessage = error.message;
          if (errorMessage.includes("auth/user-not-found")) {
            setEmailErr("Email is invalid");
          }
          if (errorMessage.includes("auth/wrong-password")) {
            setPasswordErr("Wrong Password");
          }
          setLoading(false);
          // ..
        });
    }
  };

  let handleGoogleLogin = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
       /*  console.log(credential, "credential"); */
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        dispatch(usersInformation(user));
        localStorage.setItem("userRegistationIfo", JSON.stringify(user));
        set(ref(db, "users/" + user.uid), {
          username: user.displayName,
          email: user.email,
          profile_picture: user.photoURL,
          userId: user.uid,
        });
        navigate("/");

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, "errorMessage");
        // The email of the user's account used.
        const email2 = error.customData.email;
        console.log(email2, "email error");
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential, "credential error");
        // ...

        // Step 1.
        // User tries to sign in to Google.
        // signInWithPopup(provider).catch(function (error) {
        // An error happened.
        if (errorCode === "auth/account-exists-with-different-credential") {
          // Step 2.
          // User's email already exists.
          // The pending Google credential.
          var pendingCred = error.credential;
          console.log(pendingCred, "pendingCred");
          // The provider account's email address.
          var email = error.email;
          // Get sign-in methods for this email.
          fetchSignInMethodsForEmail(email).then(function (methods) {
            // Step 3.
            // If the user has several sign-in methods,
            // the first method in the list will be the "recommended" method to use.
            if (methods[0] === "password") {
              // Asks the user their password.
              // In real scenario, you should handle this asynchronously.
              // var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
              signInWithEmailAndPassword(email, password)
                .then(function (result) {
                  // Step 4a.
                  return result.user.linkWithCredential(pendingCred);
                })
                .then(function () {
                  // Google account successfully linked to the existing Firebase user.
                  console.log(
                    "Google account successfully linked to the existing Firebase user"
                  );
                });
              return;
            }
            // All the other cases are external providers.
            // Construct provider object for that provider.
            // TODO: implement getProviderForProviderId.

            // var provider = getProviderForProviderId(methods[0]);

            // At this point, you should let the user know that they already have an account
            // but with a different provider, and let them validate the fact they want to
            // sign in with this provider.
            // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
            // so in real scenario you should ask the user to click on a "continue" button
            // that will trigger the signInWithPopup.
            signInWithPopup(provider).then(function (result) {
              // Remember that the user may have signed in with an account that has a different email
              // address than the first one. This can happen as Firebase doesn't control the provider's
              // sign in flow and the user is free to login using whichever account they own.
              // Step 4b.
              // Link to Google credential.
              // As we have access to the pending credential, we can directly call the link method.
              result.user
                .linkAndRetrieveDataWithCredential(pendingCred)
                .then(function (usercred) {
                  // Google account successfully linked to the existing Firebase user.
                  // goToApp();
                  console.log("home page");
                });
            });
          });
        }
        // });
      });
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen w-full md:pad1024:block mb768:flex mb320:block">
        <ToastContainer position="bottom-center" theme="dark" />
        <div className="bg-white shadow-xl w-[40%] pad1024:my-6 rounded-xl lp1366:w-[90%] pad1024:mx-auto">
          <div
            style={{
              backgroundImage: 'url("images/top-curve-bg.png")',
              backgroundPosition: "center",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
            className=" text-center rounded-xl min-h-[165px] md:pad1024:min-h-[100px]"
          >
            <h1 className="text-white font-pophins text-3xl text-center pt-7 md:pad1024:pt-2">
              <img src="images/logo.png" alt="" className="m-auto" />
            </h1>
          </div>
          <div className="px-8 p-5 pt-0">
            <div>
              <p className="font-pophins text-lg my-3">Email</p>
              <input
                value={email}
                onChange={handleEmail}
                type="text"
                placeholder="Enter your mail"
                className="w-full bg-gray-100 py-4 pl-3 rounded-md border-solid border focus:bg-white focus:border focus:border-solid focus:border-gray-300 outline-none"
              />
              {emailErr && (
                <p className="font-pophins text-sm bg-red-500 p-2 rounded-md text-white my-3">
                  {emailErr}
                </p>
              )}
            </div>
            <div>
              <p className="font-pophins text-lg my-3"> Password</p>
              <div className="relative">
                <input
                  value={password}
                  onChange={handlePassword}
                  type={showPassIcon ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-gray-100 py-4 pl-3 rounded-md border-solid border focus:bg-white focus:border focus:border-solid focus:border-gray-300 outline-none"
                />
                {showPassIcon ? (
                  <AiFillEye
                    onClick={() => setShowPassIcon(!showPassIcon)}
                    className="absolute top-1/2 -translate-y-1/2 right-4 "
                  />
                ) : (
                  <AiFillEyeInvisible
                    onClick={() => setShowPassIcon(!showPassIcon)}
                    className="absolute top-1/2 -translate-y-1/2 right-4 "
                  />
                )}
              </div>
              {passwordErr && (
                <p className="font-pophins text-sm bg-red-500 p-2 rounded-md text-white my-3">
                  {passwordErr}
                </p>
              )}
            </div>
            {loading ? (
              <div className="w-full h-[50px] text-center bg-primary text-white font-pophins text-base py-0 rounded-md my-5 hover:bg-secondary hover:text-primary flex justify-center items-center">
                <FallingLines
                  color="#fff"
                  width="70"
                  visible={true}
                  ariaLabel="falling-lines-loading"
                />
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full text-center bg-primary text-white font-pophins text-base py-2.5 rounded-md my-5 hover:bg-secondary hover:text-primary"
              >
                {" "}
                Login
              </button>
            )}
            <p className="text-primary font-semibold text-right">
              <Link to="/forgotpassword">Forgot Password?</Link>
            </p>

            <div className="relative my-5">
              <hr />
              <p className="absolute top-[-12px] bg-white px-4 left-[50%]">
                or
              </p>
            </div>
            <button
              onClick={handleGoogleLogin}
              className="w-full text-center bg-red-500 text-white font-pophins text-base py-2.5 rounded-md my-5"
            >
              {" "}
              Login with Google
            </button>
            <div className="text-center">
              <p>
                Don’t have an account?{" "}
                <Link to="/registation" className="text-primary font-semibold">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
