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
const GroupLists = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  const [groupList, setGroupList] = useState([]);
  useEffect(() => {
    const groupRef = ref(db, "createGroup/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.val().adminId) {
          arr.push(item.val());
        }
      });
      setGroupList(arr);
    });
  }, []);
  let handleJoinGroup = (item) => {
    set(push(ref(db, "joinGroupReq")), {
      ...item,
      userName: data.displayName,
      userId: data.uid,
      userPhoto: data.photoURL,
    });
  };
  const [groupReqList, setReqGroupList] = useState([]);
  useEffect(() => {
    const groupReqRef = ref(db, "joinGroupReq/");
    onValue(groupReqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().groupId + item.val().userId);
      });
      setReqGroupList(arr);
    });
  }, []);
  return (
    <div className="flex flex-col overflow-hidden h-[50vh]  p-7">
      {/* <Search placeholder={`search here for users`} /> */}
      <h2 className="font-pophins font-bold text-2xl text-primary mb-5">
        Group Lists
      </h2>
      <div className="overflow-y-scroll overflow-x-hidden">
        {groupList.length == 0 ? (
          <h1 className="font-blod text-xl bg-primary font-pophins text-white py-3 px-5 rounded-xl">
            No Groups Available
          </h1>
        ) : (
          groupList.map((item) => (
            <Flex
              className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
            >
              <div className="w-[50px] h-[50px] ">
                <Images
                  imgSrc={item.adminPhoto}
                  className="rounded-full w-full"
                />
              </div>
              <div>
                <h3 className="text-heading font-medium text-lg font-pophins">
                  Group Name: {item.groupName}
                </h3>
                <p className="text-[#767676] font-normal text-sm font-pophins">
                  Group Tag: {item.groupTagline}
                </p>
                <p className="text-[#767676] font-normal text-sm font-pophins">
                  Admin: {item.admin}
                </p>
              </div>
              <div className="grow text-right">
                {groupReqList.includes(data.uid + item.adminId) ||
                groupReqList.includes(item.adminId + data.uid) ? (
                  <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
                    Pending
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoinGroup(item)}
                    className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md"
                  >
                    Join Request
                  </button>
                )}
              </div>
            </Flex>
          ))
        )}
      </div>
    </div>
  );
};

export default GroupLists;
