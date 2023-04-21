import React, { useState, useEffect, useMemo } from "react";
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
import { getCurrentUser, userSList } from "../Api/Fuctional";
const JoinedGroups = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  const [joinedGroup, setJoinedGroup] = useState([]);
  useEffect(() => {
    const acceptReqGroupRef = ref(db, "acceptGrpReq/");
    onValue(acceptReqGroupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().userId) {
          arr.push(item.val());
        }
      });
      setJoinedGroup(arr);
    });
  }, []);

  const [loginUser, setLoginUser] = useState({});
  useEffect(() => {
    getCurrentUser(setLoginUser);
  }, [] );

  console.log(loginUser, "myGropus");
  const [userList, setUserList] = useState({});
  useMemo(() => userSList(data, setUserList), []);
  return (
    <>
      <div className="flex flex-col overflow-hidden h-[100vh] shadow-2xl  pt-0">
        {/* <Search placeholder={`search here for users`} /> */}

        <div className="scrollbar-hidden overflow-y-auto overflow-x-hidden">
          {joinedGroup.length == 0 ? (
            <h1 className="capitalize p-5">You Have No join any group </h1>
          ) : (
            joinedGroup.map((item) => (
              <Flex
                className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
              >
                <div className="w-[50px] h-[50px] ">
                  <Images
                    className="rounded-full w-full"
                    // imgSrc={item.adminPhoto}

                    imgSrc={
                      loginUser
                        .filter((useritem) => useritem.userId == item.adminId)
                        .map((item) => item.profile_picture)[0]
                    }
                  />
                </div>
                <div>
                  <h3 className="text-heading font-medium text-lg font-pophins">
                    Group Name:{item.groupName}
                  </h3>
                  <p className="text-[#767676] font-normal text-sm font-pophins">
                    Admin Name:
                    {
                      loginUser
                        .filter((useritem) => useritem.userId == item.adminId)
                        .map((item) => item.username)[0]
                    }
                  </p>
                </div>
                <div className="grow text-right">
                  <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
                    Joined
                  </button>
                </div>
              </Flex>
            ))
          )}
        </div>
      </div>
    </>
    // {joinedGroup.map(item)}
  );
};

export default JoinedGroups;
