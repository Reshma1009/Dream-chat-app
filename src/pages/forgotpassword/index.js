import React from "react";

const ForgotPassword = () => {
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
            <p className="font-pophins text-base my-3">
              Enter your email to get a password reset link
            </p>
            <input
              type="text"
              placeholder="Enter your mail"
              className="w-full bg-gray-100 py-4 pl-3 rounded-md border-none focus:bg-white focus:border focus:border-solid focus:border-gray-300 outline-none"
            />
          </div>
          <button className="w-full text-center bg-primary text-white font-pophins text-base py-2.5 rounded-md my-5 hover:bg-secondary hover:text-primary">
            {" "}
            Reset Password
          </button>
          <p className="text-primary font-semibold text-right">
            Remember your password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
