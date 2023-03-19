import React, { useState } from "react";
import GroupLists from "../../components/GroupList";
import MyGroups from "../../components/MyGroups";
import AllGroupList from "../../components/AllGroupList";
import Profile from "../../components/Profile";
import Sidebar from "../../components/Sidebar";

const Groups = () => {
  const [toggleTab, setToggleTab] = useState(1);
  let handleToggle = (index) => {
    setToggleTab(index);
  };
  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      <div className="col-span-3 relative">
        <div className="h-[180px]">
          <Sidebar active="group" />
        </div>
        <div className="pl-8">
          <p> Create Groups</p>
          <div>
            {/* Tab Button */}
            <div>
              <button
                onClick={() => handleToggle(1)}
                className={` ${
                  toggleTab == 1
                    ? "bg-primary text-white"
                    : "transparent text-primary border-primary border-solid border"
                }  inline-block py-2 px-5 rounded-md font-medium font-pophins text-lg mr-3`}
              >
                {" "}
                Members{" "}
              </button>
              <button
                onClick={() => handleToggle(2)}
                className={` ${
                  toggleTab == 2
                    ? "bg-primary text-white"
                    : "transparent text-primary border-primary border-solid border"
                }  inline-block py-2 px-5 rounded-md font-medium font-pophins text-lg mr-3`}
              >
                Create Group
              </button>
            </div>
            <div>
              <div className={` ${toggleTab == 1 ? "block" : "hidden"}  `}>
                <h2>Group Lists</h2>
                <hr />
                <GroupLists />
              </div>
              <div className={` ${toggleTab == 2 ? "block" : "hidden"}  `}>
                <h2>Content 2</h2>
                <hr />
                <div>
                  <p className="font-pophins text-lg my-3">Grpup Name</p>
                  <input
                    type="text"
                    placeholder="Enter your mail"
                    className="w-full bg-gray-100 py-4 pl-3 rounded-md border-none focus:bg-white focus:border focus:border-solid focus:border-gray-300 outline-none"
                  />
                </div>
                <div>
                  <p className="font-pophins text-lg my-3">Group TagLine</p>
                  <input
                    type="text"
                    placeholder="Enter your mail"
                    className="w-full bg-gray-100 py-4 pl-3 rounded-md border-none focus:bg-white focus:border focus:border-solid focus:border-gray-300 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-span-6"
        style={{
          backgroundImage: 'url("images/bg-color.png")',
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <MyGroups />
          <AllGroupList />
        </div>
      </div>
      <div className="col-span-3">
        <Profile />
      </div>
    </div>
  );
};

export default Groups;
