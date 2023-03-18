import React from "react";
import { BsChatText } from "react-icons/bs";
import { IoMdLogOut, } from "react-icons/io";
import { BiGroup } from "react-icons/bi";
import { RiSettings5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { TbBellRinging } from "react-icons/tb";
import { ImUserPlus } from "react-icons/im";
import { Link, NavLink } from "react-router-dom";
const Sidebar = ({active}) => {
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
          <div className="relative">
            <Link to="/message">
              <BsChatText
                className={`${
                  active == "message" ? "bg-red-500" : "bg-green-500"
                } text-white text-2xl `}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Message"
              />
            </Link>
          </div>
          <div className="relative">
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
            <BiGroup
              className="text-white text-2xl "
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Friends"
            />
          </div>

          <div className="relative">
            <TbBellRinging
              className="text-white text-2xl "
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Notifications"
            />
          </div>
          <div className="relative">
            <ImUserPlus
              className="text-white text-2xl "
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="User Lists"
            />
          </div>
          <div className="relative">
            <RiSettings5Line
              className="text-white text-2xl "
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Settings"
            />
          </div>
          <div className="relative">
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
