import React, { useState, useEffect } from "react";
import Profile from "../../components/Profile";
import Sidebar from "../../components/Sidebar";
import FriendRequest from "../../components/FriendRequest";
import BlockUser from "../../components/BlockUser";
import AllFriends from "../../components/AllFriends";
import Loder from "../../components/Loder";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsBarChartSteps } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Transition } from "@headlessui/react";
const FriendReq = () => {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  let data = useSelector( ( state ) => state.allUserSInfo.userInfo );
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
      const handleWindowResize = () => {
        if (window.innerWidth <= 1280) {
          setIsOpen(true);
        }
      };

      // Update the state based on the initial window width
      handleWindowResize();

      // Add event listener for window resize
      window.addEventListener("resize", handleWindowResize);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, []);
    const handleClick = () => {
      setIsOpen(!isOpen);
    };
  useEffect(() => {
    if (!data) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <div className="flex h-screen overflow-hidden relative max-mb768:flex-col max-mb768:overflow-y-auto">
          <div className=" w-[500px] max-mb768:w-full max-mb991:w-[45%] max-pad1024:w-[50%] max-pad1280:w-[35%] bg-white relative">
            <div className="h-[180px] max-mb580:h-[180px] max-mb768:h-[180px]">
              <div className=" hidden  justify-end pr-6 max-pad1280:flex absolute right-[-25px] max-pad1024:right-0 top-5">
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white focus:outline-none z-50"
                  onClick={handleClick}
                >
                  {isOpen ? (
                    <BsBarChartSteps className="text-2xl" />
                  ) : (
                    <AiOutlineCloseCircle className="text-2xl" />
                  )}
                </button>
              </div>
              <Sidebar active="request" />
            </div>
            <div className="pl-8 max-pad1280:px-5 max-w-full">
              <FriendRequest />
            </div>
          </div>
          <div
            className="flex-1 "
            style={{
              backgroundImage: 'url("images/bg-color.png")',
              backgroundPosition: "center",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div>
              <AllFriends />
              <BlockUser />
            </div>
          </div>

          <Transition
            show={!isOpen}
            enter="transition duration-300 ease-out transform"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transition duration-200 ease-in transform"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
            className={`max-mb768:absolute max-mb768:bg-slate-200 max-mb580:top-20 max-mb580:left-0 max-mb768:left-1/2 h-screen`}
          >
            <div className="w-[400px] max-pad1024:w-full max-pad1280:w-[300px]">
              <Profile />
            </div>
          </Transition>
        </div>
      )}
    </>
  );
};

export default FriendReq;
