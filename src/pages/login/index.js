import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassIcon, setShowPassIcon] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

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
  };
  return (
    <div className="flex justify-center items-center h-screen w-full">
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
            <p className="font-pophins text-lg my-3">Email</p>
            <input
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
            <p className="font-pophins text-lg my-3">Create Password</p>
            <div className="relative">
              <input
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
          <button
            onClick={handleSubmit}
            className="w-full text-center bg-primary text-white font-pophins text-base py-2.5 rounded-md my-5 hover:bg-secondary hover:text-primary"
          >
            {" "}
            Login
          </button>
          <p className="text-primary font-semibold text-right">
            <Link to="/forgotpassword">Forgot Password?</Link>
          </p>

          <div className="relative my-5">
            <hr />
            <p className="absolute top-[-12px] bg-white px-4 left-[50%]">or</p>
          </div>
          <button className="w-full text-center bg-red-500 text-white font-pophins text-base py-2.5 rounded-md my-5">
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
  );
};

export default Login;
