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
const MyGroups = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  // console.log(data.uid);
  const [showReq, setShowReq] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [groupReqList, setReqGroupList] = useState([]);
  const [accGroupReqList, setAccReqGroupList] = useState([]);
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
  let handleRequest = (groupItem) => {
    // console.log(groupItem);
    setShowReq(true);
    const groupReqRef = ref(db, "joinGroupReq/");
    onValue(groupReqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val(), "item.val()");
        if (
          data.uid == item.val().adminId &&
          groupItem.groupId == item.val().groupId
        ) {
          arr.push({ ...item.val(), groupReqId: item.key });
        }
      });
      setReqGroupList(arr);
    });
  };
  let acceptGrpReq = (item) => {
    console.log(item);
    set(push(ref(db, "acceptGrpReq")), {
      ...item,
    });
  };
  let deleteGroup = (item) => {
    console.log(item);
    remove(ref(db, "createGroup/" + item.groupId));
  };
  let rejectGroupReq = (item) => {
    console.log("rej", item);
    set(push(ref(db, "rejectGroupReq")), {
      ...item,
    }).then(() => {
      // remove(ref(db, "joinGroupReq/" + item.groupReqId));
    });
  };
  let seeInfo = (gitem) => {
    console.log("abs", gitem);
    setShowInfo(true);
    const accGroupReqRef = ref(db, "acceptGrpReq/");
    onValue(accGroupReqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        if (
          data.uid == item.val().adminId &&
          gitem.groupId == item.val().groupId
        ) {
          arr.push({ ...item.val() });
        }
      });
      setAccReqGroupList(arr);
    });
  };
  let handleGoBack = () => {
    setShowInfo(false);
    setShowReq(false);
  };
  const [rejectReqGroup, setRejectReqGroup] = useState([]);
  useEffect(() => {
    const rejectReqGroupRef = ref(db, "rejectGroupReq/");
    onValue(rejectReqGroupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        arr.push(item.val().groupReqId + item.val().adminId);
      });
      setRejectReqGroup(arr);
    });
  }, []);
  const [acceptgroupBtn, setAcceptgroupBtn] = useState([]);
  useEffect(() => {
    const accGroupReqRef = ref(db, "acceptGrpReq/");
    onValue(accGroupReqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log("acc", item.val());

        arr.push(item.val().groupReqId + item.val().adminId);
      });
      setAcceptgroupBtn(arr);
    });
  }, []);

  const [loginUser, setLoginUser] = useState([]);
  useEffect(() => {
    getCurrentUser(setLoginUser);
  }, []);
  console.log(loginUser, "myGropus login");
  const [userList, setUserList] = useState({});
  useMemo(() => userSList(data, setUserList), []);

  return (
    <div className="flex flex-col overflow-hidden h-[55vh]  p-7 pb-0">
      {/* <Search placeholder={`search here for users`} /> */}
      <div className="flex justify-between mb-5">
        <h2 className="font-pophins font-bold text-2xl text-primary ">
          My Groups
        </h2>
        {(showReq || showInfo) && (
          <button
            onClick={handleGoBack}
            className="bg-primary py-2 px-4 text-white font-pophins text-sm rounded-md"
          >
            Go Back
          </button>
        )}
      </div>

      <div className="scrollbar-hidden overflow-y-scroll overflow-x-hidden">
        {groupList.length == 0 ? (
          <h1 className="font-blod text-xl bg-primary font-pophins text-white py-3 px-5 rounded-xl">
            No Groups Available
          </h1>
        ) : showReq ? (
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
                    <div className="w-[50px] h-[50px] ">
                      <Images
                        // imgSrc={item.userPhoto}
                        imgSrc={
                          loginUser
                            .filter(
                              (useritem) => useritem.userId == item.userId
                            )
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
                        Request Name:{" "}
                        {
                          loginUser
                            .filter(
                              (useritem) => useritem.userId == item.userId
                            )
                            .map((item) => item.username)[0]
                        }
                      </p>
                      <p className="text-[#767676] font-normal text-sm font-pophins">
                        Hi Guys, How Are you
                      </p>
                    </div>
                    {acceptgroupBtn.includes(data.uid + item.groupReqId) ||
                    acceptgroupBtn.includes(item.groupReqId + data.uid) ? (
                      <div className="grow text-right">
                        <button className="bg-primary ml-5 py-2 px-3 text-white font-pophins text-sm rounded-md">
                          Accepted
                        </button>
                      </div>
                    ) : rejectReqGroup.includes(data.uid + item.groupReqId) ||
                      rejectReqGroup.includes(item.groupReqId + data.uid) ? (
                      <div className="grow text-right">
                        <button className="bg-red-500 ml-5 py-2 px-3 text-white font-pophins text-sm rounded-md">
                          Rejected
                        </button>
                      </div>
                    ) : (
                      <div className="grow text-right">
                        <button
                          onClick={() => acceptGrpReq(item)}
                          className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => rejectGroupReq(item)}
                          className="bg-red-500 ml-5 py-2 px-3 text-white font-pophins text-sm rounded-md"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </Flex>
                ))
              )}
            </div>
          </>
        ) : showInfo ? (
          <>
            <h2 className="font-pophins font-semibold text-lg text-primary mb-5 border-b border-solid border-red-500">
              Group Members
            </h2>
            <div className="overflow-y-auto overflow-x-hidden">
              {accGroupReqList.length == 0 ? (
                <h1 className="font-blod text-xl bg-primary font-pophins text-white py-3 px-5 rounded-xl">
                  No Group Member Available
                </h1>
              ) : (
                accGroupReqList.map((item) => (
                  <Flex
                    className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
                  >
                    <div className="w-[50px] h-[50px] ">
                      <Images
                        // imgSrc={item.userPhoto}
                        imgSrc={
                          loginUser
                            .filter(
                              (useritem) => useritem.userId == item.userId
                            )
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
                        Request Name:{" "}
                        {
                          loginUser
                            .filter(
                              (useritem) => useritem.userId == item.userId
                            )
                            .map((item) => item.username)[0]
                        }
                      </p>
                      <p className="text-[#767676] font-normal text-sm font-pophins">
                        Hi Guys, How Are you
                      </p>
                    </div>
                    <div className="grow text-right">
                      <button
                        // onClick={() => acceptGrpReq(item)}
                        className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md"
                      >
                        Member
                      </button>
                      <button
                        // onClick={() => acceptGrpReq(item)}
                        className="bg-red-500 ml-5 py-2 px-3 text-white font-pophins text-sm rounded-md"
                      >
                        Block
                      </button>
                    </div>
                  </Flex>
                ))
              )}
            </div>
          </>
        ) : (
          groupList.map((item) => (
            <Flex
              className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
            >
              <div className="w-[50px] h-[50px] ">
                <Images
                  imgSrc={userList.profile_picture}
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
                  Admin: {userList.username}
                </p>
              </div>
              <div className="grow text-right">
                <button
                  onClick={() => seeInfo(item)}
                  className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md"
                >
                  Info
                </button>
                <button
                  onClick={() => handleRequest(item)}
                  className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md ml-5"
                >
                  Request
                </button>
                <button
                  onClick={() => deleteGroup(item)}
                  className="bg-red-500 py-2 px-3 text-white font-pophins text-sm rounded-md ml-5"
                >
                  Delete
                </button>
              </div>
            </Flex>
          ))
        )}
      </div>
    </div>
  );
};

export default MyGroups;
