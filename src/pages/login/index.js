import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
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
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Check if the user has already created an account using email and password
      const userRef = ref(db, "users/" + result.user.uid);
      onValue(userRef, (snapshot) => {
        const user = snapshot.val();

        if (user && user.authMethod === "email") {
          alert(
            "You have already created an account using email and password. Please log in using that method."
          );
        } else {
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error.message);
    }
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
