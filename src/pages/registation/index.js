import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { usersInformation } from "../../slices/userSlices";
import { InfinitySpin, FallingLines } from "react-loader-spinner";
const Registation = () => {
  const auth = getAuth();
  const db = getDatabase();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
  const [showPassIcon, setShowPassIcon] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  let handleName = (e) => {
    setName(e.target.value);
    setNameErr("");
  };
  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };
  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
  };
  let handleSubmit = () => {
    if (!name) {
      setNameErr("Full Name Is Requried");
    }
    if (!email) {
      setEmailErr("Email Is Requried");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailErr("You have entered an invalid email address!");
      }
    }
    if (!password) {
      setPasswordErr("Password Is Requried");
    } /*else {
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
    }*/
    if (name && email && password) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "images/avatar.jpg",
          })
            .then(() => {
              set(ref(db, "users/" + user.uid), {
                username: user.displayName,
                email: user.email,
                profile_picture: user.photoURL,
              });
            })
            .then(() => {
              toast.success(
                "Registation Successfull. Please Verify Your Email"
              );
              setName("");
              setEmail("");
              setPassword("");
              sendEmailVerification(auth.currentUser);

              setTimeout(() => {
                navigate("/login");
              }, 2500);
              setLoading(false);
            })

            .catch((error) => {});
        })
        .catch((error) => {
          const errorMessage = error.message;
          if (errorMessage.includes("auth/email-already-in-use")) {
            setEmailErr("Email Exits");
          }
          setLoading(false);
          // ..
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <ToastContainer position="bottom-center" theme="dark" />
      <div className="bg-white shadow-xl w-[40%]  rounded-xl ">
        <div
          style={{
            backgroundImage: 'url("images/top-curve-bg.png")',
            backgroundPosition: "center",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
          className=" text-center rounded-xl min-h-[165px]"
        >
          <h1 className="text-white font-pophins text-3xl text-center pt-7">
            <img src="images/logo.png" alt="" className="m-auto" />
          </h1>
        </div>
        <div className="px-8 p-5 pt-0">
          <div>
            <p className="font-pophins text-lg my-3">Name</p>
            <input
              value={name}
              onChange={handleName}
              type="text"
              placeholder="Enter your name"
              className="w-full border border-solid bg-gray-100 py-4 pl-3 rounded-md  focus:bg-white focus:border focus:border-solid focus:border-gray-300 outline-none"
            />
            {nameErr && (
              <p className="font-pophins text-sm bg-red-500 p-2 rounded-md text-white my-3">
                {nameErr}
              </p>
            )}
          </div>
          <div>
            <p className="font-pophins text-lg my-3">Email</p>
            <input
              onChange={handleEmail}
              type="email"
              value={email}
              placeholder="Enter your mail"
              className="w-full border border-solid bg-gray-100 py-4 pl-3 rounded-md  focus:bg-white focus:border focus:border-solid focus:border-gray-300 outline-none"
            />
            {emailErr && (
              <p className="font-pophins text-sm bg-red-500 p-2 rounded-md text-white my-3">
                {emailErr}
              </p>
            )}
          </div>
          <div>
            <p className="font-pophins text-lg my-3">Create Password</p>
            <div className="relative">
              <input
                value={password}
                onChange={handlePassword}
                type={showPassIcon ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-solid bg-gray-100 py-4 pl-3 rounded-md  focus:bg-white focus:border focus:border-solid focus:border-gray-300 outline-none"
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
              Register
            </button>
          )}
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registation;
