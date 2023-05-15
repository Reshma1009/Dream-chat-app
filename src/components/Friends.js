import React, { useState, useEffect } from "react";
import Flex from "./Flex";
import Images from "./Images";
import Search from "./Search";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { activeUsersInfo } from "../slices/activeChatUsers";
import { getCurrentUser } from "../Api/Fuctional";

const Friends = ({ handleFriendClick }) => {
  const db = getDatabase();
  let dispatch = useDispatch();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  const [friendList, setFriendList] = useState([]);
  const [loginUser, setLoginUser] = useState([]);

  useEffect(() => {
    getCurrentUser(setLoginUser);
  }, []);
  useEffect(() => {
    const friendsRef = ref(db, "friends/");
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid === item.val().userId || data.uid == item.val().sendRqId) {
          arr.push({ ...item.val(), friendId: item.key });
        }
      });
      setFriendList(arr);
    });
  }, []);

  let handleSingleMessage = (item) => {
    if (data.uid === item.sendRqId) {
      dispatch(
        activeUsersInfo({
          // name: item.senderName,
          name: loginUser
            .filter((useritem) => useritem.userId == item.userId)
            .map((item) => item.username)[0],

          id: item.userId,
          status: "single",
          profilePhoto: loginUser
            .filter((useritem) => useritem.userId == item.userId)
            .map((item) => item.profile_picture)[0],
        })
      );
      localStorage.setItem(
        "activeChatUser",
        JSON.stringify({
          // name: item.senderName,
          name: loginUser
            .filter((useritem) => useritem.userId == item.userId)
            .map((item) => item.username)[0],

          id: item.userId,
          status: "single",
          profilePhoto: loginUser
            .filter((useritem) => useritem.userId == item.userId)
            .map((item) => item.profile_picture)[0],
        })
      );
    } else {
      dispatch(
        activeUsersInfo({
          name: loginUser
            .filter((useritem) => useritem.userId == item.sendRqId)
            .map((item) => item.username)[0],
          // name: item.sendRqName,

          id: item.sendRqId,
          status: "single",
          profilePhoto: loginUser
            .filter((useritem) => useritem.userId == item.sendRqId)
            .map((item) => item.profile_picture)[0],
          // profilePhoto: item.sendRqPhoto,
        })
      );
      localStorage.setItem(
        "activeChatUser",
        JSON.stringify({
          name: loginUser
            .filter((useritem) => useritem.userId == item.sendRqId)
            .map((item) => item.username)[0],
          // name: item.sendRqName,

          id: item.sendRqId,
          status: "single",
          profilePhoto: loginUser
            .filter((useritem) => useritem.userId == item.sendRqId)
            .map((item) => item.profile_picture)[0],
        })
      );
    }
  };

  // console.log(loginUser, "loginUser friends");
  return (
    <div className="flex flex-col overflow-hidden h-[45vh]  p-7">
      {/* <Search placeholder={`search here for users`} /> */}
      <h2 className="font-pophins font-bold text-2xl text-primary mb-5">
        Friends
      </h2>
      <div className="scrollbar-hidden overflow-y-scroll overflow-x-hidden">
        {friendList.length == 0 ? (
          <h1 className="font-blod text-xl bg-primary font-pophins text-white py-3 px-5 rounded-xl">
            No Friends Available
          </h1>
        ) : (
          friendList.map((item) => (
            <div
              key={item.friendId}
              onClick={() => handleFriendClick(item.friendId)}
              className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
            >
              <div className="w-[50px] h-[50px] ">
                <Images
                  imgSrc={
                    item.userId == data.uid
                      ? loginUser
                          .filter(
                            (useritem) => useritem.userId === item.sendRqId
                          )
                          .map((item) => item.profile_picture)[0]
                      : loginUser
                          .filter((useritem) => useritem.userId === item.userId)
                          .map((item) => item.profile_picture)[0]
                  }
                  className="rounded-full w-full"
                />
              </div>
              <div>
                <h3 className="text-heading font-bold text-xl font-pophins">
                  {item.userId == data.uid
                    ? loginUser
                        .filter((useritem) => useritem.userId === item.sendRqId)
                        .map((item) => item.username)[0]
                    : loginUser
                        .filter((useritem) => useritem.userId === item.userId)
                        .map((item) => item.username)[0]}
                </h3>
                <p className="text-[#767676] font-normal text-sm font-pophins">
                  Hi Guys, How Are you
                </p>
              </div>
              <div className="grow text-right">
                <button
                  onClick={() => handleSingleMessage(item)}
                  className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md"
                >
                  Message
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Friends;
