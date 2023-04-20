import React from "react";
import { BsChatText } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { BiGroup } from "react-icons/bi";
import { RiSettings5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { TbBellRinging } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { usersInformation } from "../slices/userSlices"
const Sidebar = ( { active } ) => {
  let navigate = useNavigate();
  let dispatch= useDispatch()
  let handleLogOut = () => {
    navigate( "/login" );
    dispatch( usersInformation( null ) );
    localStorage.removeItem("userRegistationIfo");
  };
  return (
    <div className=" max-w-full left-0 top-0">
      <div
        style={{
          backgroundImage: 'url("images/top-curve-bg.png")',
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
        className="pb-12 px-7"
      >
        <div className="max-w-[180px]">
          <Link to="/">
            <img src="images/logo.png" alt="" className="pt-5" />
          </Link>
        </div>
        <div className="flex gap-5 justify-between py-7 items-center ">
          <div
            className={`${
              active == "home" ? "before:bg-white" : "before:bg-transparent"
            } relative before:absolute before:w-[10px] before:h-[10px] before:content-[''] before:bottom-[-15px] before:left-1/2 before:-translate-x-1/2 before:rounded-full before:text-center`}
          >
            <Link to="/">
              <AiOutlineHome
                className={` text-white text-3xl rounded-md `}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="User Lists"
              />
            </Link>
          </div>
          <div
            className={`${
              active == "request" ? "before:bg-white" : "before:bg-transparent"
            } relative before:absolute before:w-[10px] before:h-[10px] before:content-[''] before:bottom-[-15px] before:left-1/2 before:-translate-x-1/2 before:rounded-full before:text-center`}
          >
            <Link to="/request">
              <BiGroup
                className="text-white text-2xl "
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Friends"
              />
            </Link>
          </div>
          <div
            className={`${
              active == "message" ? "before:bg-white" : "before:bg-transparent"
            } relative before:absolute before:w-[10px] before:h-[10px] before:content-[''] before:bottom-[-15px] before:left-1/2 before:-translate-x-1/2 before:rounded-full before:text-center`}
          >
            <Link to="/message">
              <BsChatText
                className={` text-white text-2xl `}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Message"
              />
            </Link>
          </div>
          <div
            className={`${
              active == "group" ? "before:bg-white" : "before:bg-transparent"
            } relative before:absolute before:w-[10px] before:h-[10px] before:content-[''] before:bottom-[-15px] before:left-1/2 before:-translate-x-1/2 before:rounded-full before:text-center`}
          >
            <Link to="/group">
              <FiEdit
                className="text-white text-2xl "
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Groups"
              />
            </Link>
          </div>

          <div className="relative">
            <TbBellRinging
              className="text-white text-2xl "
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Notifications"
            />
          </div>

         {/*  <div className="relative">
            <RiSettings5Line
              className="text-white text-2xl "
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Settings"
            />
          </div> */}
          <div onClick={handleLogOut} className="relative cursor-pointer">
            <IoMdLogOut
              className="text-white text-2xl "
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="LogOut"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
