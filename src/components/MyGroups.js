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
const MyGroups = () => {
  const db = getDatabase();
  let data = useSelector( ( state ) => state.allUserSInfo.userInfo );
  console.log(data.uid);
  const [showReq, setShowReq] = useState(false);
  const [groupList, setGroupList] = useState([]);
  useEffect(() => {
    const groupRef = ref(db, "createGroup/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminId) {
          arr.push({ ...item.val(), groupId: item.key });
        }
      });
      setGroupList(arr);
    });
  }, []);
  const [groupReqList, setReqGroupList] = useState([]);
  let handleRequest = (groupItem) => {
    console.log(groupItem);
    setShowReq(true);
    const groupReqRef = ref(db, "joinGroupReq/");
    onValue(groupReqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach( ( item ) => {
        console.log(item.val());
        if (
          data.uid == item.val().userId &&
          groupItem.groupId == item.val().groupId
        ) {
          arr.push(item.val());
        }
      });
      setReqGroupList(arr);
    });
  };
  return (
    <div className="flex flex-col overflow-hidden h-[55vh]  p-7 pb-0">
      {/* <Search placeholder={`search here for users`} /> */}
      <div className="flex justify-between mb-5">
        <h2 className="font-pophins font-bold text-2xl text-primary ">
          My Groups
        </h2>
        {showReq && (
          <button
            onClick={() => setShowReq(false)}
            className="bg-primary py-2 px-4 text-white font-pophins text-sm rounded-md"
          >
            Go Back
          </button>
        )}
      </div>

      {showReq ? (
        <>
          <h2 className="font-pophins font-semibold text-lg text-primary mb-5 border-b border-solid border-red-500">
            Request For Join
          </h2>
          <div className="overflow-y-auto overflow-x-hidden">
            {groupReqList.length == 0 ? (
              <h1 className="font-blod text-xl bg-primary font-pophins text-white py-3 px-5 rounded-xl">
                No Groups Available
              </h1>
            ) : (
              groupReqList.map((item) => (
                <Flex
                  className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
                >
                  <div>
                    <Images imgSrc={`images/profile.png`} />
                  </div>
                  <div>
                    <h3 className="text-heading font-medium text-lg font-pophins">
                      Group Name
                    </h3>
                    <p className="text-[#767676] font-normal text-sm font-pophins">
                      Request Name
                    </p>
                    <p className="text-[#767676] font-normal text-sm font-pophins">
                      Hi Guys, How Are you
                    </p>
                  </div>
                  <div className="grow text-right">
                    <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
                      Accept
                    </button>
                  </div>
                </Flex>
              ))
            )}
          </div>
        </>
      ) : (
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
                  <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
                    Info
                  </button>
                  <button
                    onClick={() => handleRequest(item)}
                    className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md ml-5"
                  >
                    Request
                  </button>
                  <button className="bg-red-500 py-2 px-3 text-white font-pophins text-sm rounded-md ml-5">
                    Delete
                  </button>
                </div>
              </Flex>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyGroups;
