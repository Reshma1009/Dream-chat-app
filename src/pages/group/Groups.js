import React, { useEffect, useState } from "react";
import GroupLists from "../../components/GroupList";
import MyGroups from "../../components/MyGroups";
import AllGroupList from "../../components/AllGroupList";
import Profile from "../../components/Profile";
import Sidebar from "../../components/Sidebar";
import JoinedGroups from "../../components/JoinedGroup";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loder from "../../components/Loder";
const Groups = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  const [groupName, setGroupName] = useState("");
  const [groupTagline, setGroupTagline] = useState("");
  const [groupNameErr, setGroupNameErr] = useState("");
  const [groupTaglineErr, setGroupTaglineErr] = useState("");
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    if (!data) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [])
  let handleGroupName = (e) => {
    setGroupName(e.target.value);
    setGroupNameErr("");
  };
  let handleGroupTagLine = (e) => {
    setGroupTagline(e.target.value);
    setGroupTaglineErr("");
  };
  let handleCreateGroup = () => {
    if (!groupName) {
      setGroupNameErr("Group Name Is Requried");
    }
    if (!groupTagline) {
      setGroupTaglineErr("Group TagLine Is Requried");
    }
    set(push(ref(db, "createGroup")), {
      groupName,
      groupTagline,
      adminId: data.uid,
      admin: data.displayName,
      adminPhoto: data.photoURL,
    });
    setGroupName("");
    setGroupTagline("");
  };

  const [toggleTab, setToggleTab] = useState(1);
  let handleToggle = (index) => {
    setToggleTab(index);
  };

  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <div className="flex h-screen overflow-hidden">
          <div className=" w-[500px] bg-white relative">
            <div className="h-[180px]">
              <Sidebar active="group" />
            </div>
            <div className="pl-8 pr-5">
              <p className="font-pophins font-bold text-2xl text-primary mb-5 border-primary border-b border-solid pb-3">
                {" "}
                Groups
              </p>
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
                    Joined Group{" "}
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
                    <h2 className="mb-5 border-primary border-b border-solid pb-3 font-pophins font-medium text-xl text-primary my-5">
                      Groups you've joined
                    </h2>

                    <JoinedGroups />
                  </div>
                  <div className={` ${toggleTab == 2 ? "block" : "hidden"}  `}>
                    <div>
                      <p className="font-pophins text-lg my-3">Grpup Name</p>
                      <input
                        value={groupName}
                        onChange={handleGroupName}
                        type="text"
                        placeholder="Group Name"
                        className="w-full border border-solid bg-gray-100 py-4 pl-3 rounded-md focus:bg-white focus:border focus:border-solid focus:border-gray-300 outline-none"
                      />
                      {groupNameErr && (
                        <p className="font-pophins text-sm bg-red-500 p-2 rounded-md text-white my-3">
                          {groupNameErr}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="font-pophins text-lg my-3">Group TagLine</p>
                      <input
                        value={groupTagline}
                        onChange={handleGroupTagLine}
                        type="text"
                        placeholder="Group Tagline"
                        className="w-full border border-solid bg-gray-100 py-4 pl-3 rounded-md focus:bg-white focus:border focus:border-solid focus:border-gray-300 outline-none"
                      />
                      {groupTaglineErr && (
                        <p className="font-pophins text-sm bg-red-500 p-2 rounded-md text-white my-3">
                          {groupTaglineErr}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={handleCreateGroup}
                      className="bg-primary py-4 px-3 text-white font-pophins text-lg rounded-md w-full mt-5 inline-block"
                    >
                      Create Group
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex-1"
            style={{
              backgroundImage: 'url("images/bg-color.png")',
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div>
              <MyGroups />
              <GroupLists />
            </div>
          </div>
          <div className="w-[400px]">
            <Profile />
          </div>
        </div>
      )}
    </>
  );
};

export default Groups;
