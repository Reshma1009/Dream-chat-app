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
import { getCurrentUser } from "../Api/Fuctional";
const AllFriends = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    const friendsRef = ref(db, "friends/");
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().senderId ||
          data.uid == item.val().receiverId
        ) {
          arr.push({ ...item.val(), friendId: item.key });
        }
      });
      setFriendList(arr);
    });
  }, []);
  let handleBlock = (item) => {
    // console.log(item);
    if (data.uid == item.senderId) {
      set(push(ref(db, "block")), {
        whoBlockId: item.senderId,
        whoBlockName: item.senderName,
        whoBlockPhoto: item.senderPhoto,
        blockId: item.receiverId,
        blockName: item.receiverName,
        blockPhoto: item.receiverPhoto,
      }).then(() => {
        remove(ref(db, "friends/" + item.friendId));
      });
    } else {
      set(push(ref(db, "block")), {
        whoBlockId: item.receiverId,
        whoBlockName: item.receiverName,
        whoBlockPhoto: item.receiverPhoto,
        blockId: item.senderId,
        blockName: item.senderName,
        blockPhoto: item.senderPhoto,
      }).then(() => {
        remove(ref(db, "friends/" + item.friendId));
      });
    }
  };

  const [loginUser, setLoginUser] = useState([]);

  useEffect(() => {
    getCurrentUser( setLoginUser);
  }, []);
  return (
    <div className="scrollbar-hidden flex flex-col overflow-hidden h-[50vh]  p-7">
      {/* <Search placeholder={`search here for users`} /> */}
      <h2 className="font-pophins font-bold text-2xl text-primary mb-5">
        All Friends
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
                      ? loginUser
                          .filter(
                            (useritem) => useritem.userId !== item.senderId
                          )
                          .map((item) => item.profile_picture)[0]
                      : loginUser
                          .filter(
                            (useritem) => useritem.userId == item.senderId
                          )
                          .map((item) => item.profile_picture)[0]
                  }
                  className="rounded-full w-full"
                />
              </div>
              <div>
                <h3 className="text-heading font-bold text-xl font-pophins">
                  {item.senderId == data.uid
                    ? loginUser
                        .filter((useritem) => useritem.userId !== item.senderId)
                        .map((item) => item.username)[0]
                    : loginUser
                        .filter((useritem) => useritem.userId == item.senderId)
                        .map((item) => item.username)[0]}
                </h3>
                <p className="text-[#767676] font-normal text-sm font-pophins">
                  Hi Guys, How Are you
                </p>
              </div>
              <div className="grow text-right">
                <button
                  onClick={() => handleBlock(item)}
                  className="bg-red-500 py-2 px-3 text-white font-pophins text-sm rounded-md ml-5"
                >
                  Block
                </button>
              </div>
            </Flex>
          ))
        )}
      </div>
    </div>
  );
};

export default AllFriends;
