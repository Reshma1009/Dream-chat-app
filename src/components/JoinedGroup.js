import React, { useState, useEffect } from "react";
import Flex from "./Flex";
import Images from "./Images";
import Search from "./Search";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
const JoinedGroups = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  const [joinedGroup, setJoinedGroup] = useState([]);
  useEffect(() => {
    const acceptReqGroupRef = ref(db, "acceptGrpReq/");
    onValue(acceptReqGroupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        if (data.uid == item.val().userId) {
          arr.push(item.val());
        }
      });
      setJoinedGroup(arr);
    });
  }, []);
  return (
    <>
      <div className="flex flex-col overflow-hidden h-[100vh] shadow-2xl  pt-0">
        {/* <Search placeholder={`search here for users`} /> */}

        <div className="scrollbar-hidden overflow-y-auto overflow-x-hidden">
          {joinedGroup.map((item) => (
            <Flex
              className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
            >
              <div>
                <Images imgSrc={`images/profile.png`} />
              </div>
              <div>
                <h3 className="text-heading font-medium text-lg font-pophins">
                  Group Name:{item.groupName}
                </h3>
                <p className="text-[#767676] font-normal text-sm font-pophins">
                  AdMin Name:{item.admin}
                </p>
              </div>
              <div className="grow text-right">
                <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
                  Joined
                </button>
              </div>
            </Flex>
          ))}
        </div>
      </div>
    </>
    // {joinedGroup.map(item)}
  );
};

export default JoinedGroups;
