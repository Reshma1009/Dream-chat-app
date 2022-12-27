import React from "react";
import { BsChatText } from "react-icons/bs";
import { IoMdLogOut, } from "react-icons/io";
import { BiGroup } from "react-icons/bi";
import { RiSettings5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { TbBellRinging } from "react-icons/tb";
import { ImUserPlus } from "react-icons/im";
const Sidebar = () => {
  return (
    <div className="">
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
          <img src="images/logo.png" alt="" className="pt-5" />
        </div>
        <div className="flex gap-5 justify-between py-7 items-center ">
          <div className="relative">
            <BsChatText
              className="text-white text-2xl  "
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Message"
            />
          </div>
          <div className="relative">
            <FiEdit
              className="text-white text-2xl "
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Groups"
            />
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
