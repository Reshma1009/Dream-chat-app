import React, { useState, useEffect } from "react";
import Flex from "./Flex";
import Images from "./Images";
import Search from "./Search";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { activeUsersInfo } from "../slices/activeChatUsers";

const Friends = () => {
  const db = getDatabase();
  let dispatch = useDispatch();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  const [friendList, setFriendList] = useState([]);
  const [usersList, setusersList] = useState([]);
  useEffect(() => {
    const friendsRef = ref(db, "friends/");
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().senderId ||
          data.uid == item.val().receiverId
        ) {
          arr.push(item.val());
        }
      });
      setFriendList(arr);
    });
  }, []);
  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), userId: item.key });
      });
      setusersList(arr);
    });
  }, []);

  let handleSingleMessage = (item) => {
    console.log(item);
    if (data.uid == item.receiverId) {
      dispatch(
        activeUsersInfo({
          name: item.senderName,
          id: item.senderId,
          status: "single",
          profilePhoto: item.senderPhoto,
        })
      );
      localStorage.setItem(
        "activeChatUser",
        JSON.stringify({
          name: item.senderName,
          id: item.senderId,
          status: "single",
          profilePhoto: item.senderPhoto,
        })
      );
    } else {
      dispatch(
        activeUsersInfo({
          name: item.receiverName,
          id: item.receiverId,
          status: "single",
          profilePhoto: item.receiverPhoto,
        })
      );
      localStorage.setItem(
        "activeChatUser",
        JSON.stringify({
          name: item.receiverName,
          id: item.receiverId,
          status: "single",
          profilePhoto: item.receiverPhoto,
        })
      );
    }
  };
  return (
    <div className="flex flex-col overflow-hidden h-[50vh]  p-7">
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
            <Flex
              className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
            >
              <div className="w-[50px] h-[50px] ">
                <Images
                  imgSrc={
                    item.senderId == data.uid
                      ? item.receiverPhoto
                      : item.senderPhoto
                  }
                  className="rounded-full w-full"
                />
              </div>
              <div>
                <h3 className="text-heading font-medium text-lg font-pophins">
                  {item.senderId == data.uid
                    ? item.receiverName
                    : item.senderName}
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
            </Flex>
          ))
        )}
      </div>
    </div>
  );
};

export default Friends;
