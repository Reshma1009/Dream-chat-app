import React, { useState, useEffect } from "react";
import Flex from "./Flex";
import Images from "./Images";
import Search from "./Search";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
const FriendRequest = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.allUserSInfo.userInfo);

  const [friendRequest, setFriendRequest] = useState([]);
  useEffect(() => {
    const friendReqRef = ref(db, "friendRequest/");
    onValue(friendReqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().receiverId) {
          arr.push({ ...item.val(), friendReqId: item.key });
        }
      });
      setFriendRequest(arr);
    });
  }, []);
  let handleAcceptFrndReq = (item) => {
    set(push(ref(db, "friends")), {
      ...item,
    });
  };
  const [friendAList, setFriendAList] = useState([]);
  useEffect(() => {
    const friendsRef = ref(db, "friends/");
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().senderId + item.val().receiverId);
      });
      setFriendAList(arr);
    });
  }, []);
  return (
    <div>
      <h2 className="font-pophins font-bold text-2xl text-primary mb-5">
        Friend Request
      </h2>
      <Search placeholder={`search here for users`} />

      <div className="h-[100vh] overflow-y-auto">
        {friendRequest.map((item) => (
          <Flex
            className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5`}
          >
            <div className="w-[50px] h-[50px] ">
              <Images
                imgSrc={item.senderPhoto}
                className="rounded-full w-full"
              />
            </div>
            <div>
              <h3 className="text-heading font-semibold text-lg font-pophins">
                {item.senderName}
              </h3>
              <p className="text-[#767676] font-normal text-sm font-pophins">
                Hi Guys, How Are you
              </p>
            </div>
            <div className="grow text-right">
              {friendAList.includes(data.uid + item.senderId) ||
              friendAList.includes(item.senderId + data.uid) ? (
                <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
                  Accepted
                </button>
              ) : (
                <button
                  onClick={() => handleAcceptFrndReq(item)}
                  className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md"
                >
                  Accept
                </button>
              )}
            </div>
          </Flex>
        ))}
      </div>
    </div>
  );
};

export default FriendRequest;
