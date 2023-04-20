import React, { useState, useEffect } from "react";
import Flex from "./Flex";
import Images from "./Images";
import Search from "./Search";
import {
  getDatabase,
  ref,
  onValue,

} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { activeUsersInfo } from "../slices/activeChatUsers";
import { getCurrentUser } from "../Api/Fuctional";
const AllGroupList = () => {
  const db = getDatabase();
  let data = useSelector( ( state ) => state.allUserSInfo.userInfo );
  let dispatch=useDispatch()
  const [groupList, setGroupList] = useState([]);
  useEffect(() => {
    const groupRef = ref(db, "createGroup/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), groupId: item.key });
      });
      setGroupList(arr);
    });
  }, []);
  let handleGroupMessage = (item) => {
    // console.log( item );
   dispatch(
     activeUsersInfo({
       name: item.groupName,
       id: item.groupId,
       status: "group",
       profilePhoto: item.adminPhoto,
       adminId: item.adminId,
     })
   );
   localStorage.setItem(
     "activeChatUser",
     JSON.stringify({
       name: item.groupName,
       id: item.groupId,
       status: "group",
       profilePhoto: item.adminPhoto,
       adminId: item.adminId,
     })
   );
  };
   const [loginUser, setLoginUser] = useState([]);
   useEffect(() => {
     getCurrentUser(setLoginUser);
   }, []);
  return (
    <div className=" scrollbar-hidden flex flex-col overflow-hidden h-[40vh] shadow-2xl p-7 pt-0">
      {/* <Search placeholder={`search here for users`} /> */}
      <h2 className="font-pophins font-bold text-2xl text-primary mb-5">
        All Groups
      </h2>
      <div className="scrollbar-hidden overflow-y-auto overflow-x-hidden">
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
                  imgSrc={
                    loginUser
                      .filter((useritem) => useritem.userId == item.adminId)
                      .map((item) => item.profile_picture)[0]
                  }
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
                  Admin:{" "}
                  {
                    loginUser
                      .filter((useritem) => useritem.userId == item.adminId)
                      .map((item) => item.username)[0]
                  }
                </p>
              </div>
              <div className="grow text-right">
                <button
                  onClick={() => handleGroupMessage(item)}
                  className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md"
                >
                  Meesage
                </button>
              </div>
            </Flex>
          ))
        )}
      </div>
    </div>
  );
};

export default AllGroupList;
