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
const BlockUser = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  const [blockList, setBlockList] = useState([]);
  useEffect(() => {
    const blockRef = ref(db, "block");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        if (
          data.uid == item.val().whoBlockId ||
          data.uid == item.val().blockId
        ) {
          arr.push({ ...item.val(), blockListId: item.key });
        }
      });
      setBlockList(arr);
    });
  }, []);
  let handleUnblock = (item) => {
    set(push(ref(db, "friends")), {
      receiverId: item.blockId,
      receiverName: item.blockName,
      receiverPhoto: item.blockPhoto,
      senderId: item.whoBlockId,
      senderName: item.whoBlockName,
      senderPhoto: item.whoBlockPhoto,
    }).then(() => {
      remove(ref(db, "block/" + item.blockListId));
    });
  };
  const [loginUser, setLoginUser] = useState([]);

  useEffect(() => {
    getCurrentUser( setLoginUser);
  }, []);
  return (
    <div className="scrollbar-hidden flex flex-col overflow-hidden h-[50vh]  p-7 pt-0">
      {/* <Search placeholder={`search here for users`} /> */}
      <h2 className="font-pophins font-bold text-2xl text-primary mb-5">
        Block Users
      </h2>
      <div className="scrollbar-hidden overflow-y-scroll overflow-x-hidden">
        {blockList.length == 0 ? (
          <h1 className="font-blod text-xl bg-primary font-pophins text-white py-3 px-5 rounded-xl">
            No Block User Available
          </h1>
        ) : (
          blockList.map((item) => (
            <Flex
              className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5`}
            >
              <div className="w-[50px] h-[50px] ">
                <Images
                  className="rounded-full w-full"
                  imgSrc={
                    item.whoBlockId == data.uid
                      ? loginUser
                          .filter(
                            (useritem) => useritem.userId !== item.whoBlockId
                          )
                          .map((item) => item.profile_picture)[0]
                      : loginUser
                          .filter(
                            (useritem) => useritem.userId == item.whoBlockId
                          )
                          .map((item) => item.profile_picture)[0]
                  }
                />
              </div>
              <div>
                <h3 className="text-heading font-medium text-lg font-pophins">
                  {item.whoBlockId == data.uid
                    ? loginUser
                        .filter(
                          (useritem) => useritem.userId !== item.whoBlockId
                        )
                        .map((item) => item.username)[0]
                    : loginUser
                        .filter(
                          (useritem) => useritem.userId == item.whoBlockId
                        )
                        .map((item) => item.username)[0]}

                </h3>
                <p className="text-[#767676] font-normal text-sm font-pophins">
                  Hi Guys, How Are you
                </p>
              </div>
              <div className="grow text-right">
                {item.whoBlockId == data.uid && (
                  <button
                    onClick={() => handleUnblock(item)}
                    className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md"
                  >
                    Unblock
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

export default BlockUser;
