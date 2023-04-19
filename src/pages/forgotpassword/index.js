import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
const ForgotPassword = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  let navigate = useNavigate();
  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };

  let handleSubmit = () => {
    if (!email) {
      setEmailErr("Email Is Requried");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailErr("You have entered an invalid email address!");
      }
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password Reset Link Send Please Check your Email");
        setEmail("");

          navigate("/login");

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  };
  return (
    <div className="flex justify-center items-center h-screen w-full ">
      <ToastContainer position="top-right" theme="dark" />
      <div className="bg-white shadow-xl w-[40%]  rounded-xl pad1024:w-[90%]">
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
            <p className="font-pophins text-base my-3">
              Enter your email to get a password reset link
            </p>
            <input
              onChange={handleEmail}
              type="text"
              placeholder="Enter your mail"
              className="w-full bg-gray-100 py-4 pl-3 rounded-md border-solid border  focus:bg-white focus:border focus:border-solid focus:border-gray-300 outline-none"
            />
            {emailErr && (
              <p className="font-pophins text-sm bg-red-500 p-2 rounded-md text-white my-3">
                {emailErr}
              </p>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full text-center bg-primary text-white font-pophins text-base py-2.5 rounded-md my-5 hover:bg-secondary hover:text-primary"
          >
            {" "}
            Reset Password
          </button>
          <p className="text-primary font-semibold text-right">
            <Link to="/login">Remember your password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
