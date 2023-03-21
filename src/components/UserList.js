import React, { useState, useEffect } from "react";
import Flex from "./Flex";
import Images from "./Images";
import Search from "./Search";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
const UserList = () => {
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  let handleAddFriend = (item) => {
    set(push(ref(db, "friendRequest")), {
      senderId: data.uid,
      senderName: data.displayName,
      senderPhoto: data.photoURL,
      receiverId: item.userId,
      receiverName: item.username,
      receiverPhoto: item.profile_picture,
    });
  };
  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          arr.push({ ...item.val(), userId: item.key });
        }
      });
      setUserList(arr);
    });
  }, []);
  const [friendRequest, setFriendRequest] = useState([]);
  useEffect(() => {
    const friendReqRef = ref(db, "friendRequest/");
    onValue(friendReqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().receiverId + item.val().senderId);
      });
      setFriendRequest(arr);
    });
  }, []);

  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    const friendsRef = ref(db, "friends/");
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().senderId + item.val().receiverId);
      });
      setFriendList(arr);
    });
  }, []);
  return (
    <div className="">
      <h2 className="font-pophins font-bold text-2xl text-primary mb-5">
        All Users
      </h2>
      <Search placeholder={`search here for users`} />
      <div className="h-[100vh] overflow-y-auto">
        {userList.map((item) => (
          <Flex
            className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5`}
          >
            <div className="w-[50px] h-[50px] ">
              <Images
                imgSrc={item.profile_picture}
                className="rounded-full w-full"
              />
            </div>
            <div>
              <h3 className="text-heading font-semibold text-lg font-pophins">
                {item.username}
              </h3>
              <p className="text-[#767676] font-normal text-sm font-pophins">
                {item.email}
              </p>
            </div>
            <div className="grow text-right">
              {friendList.includes(data.uid + item.userId) ||
              friendList.includes(item.userId + data.uid) ? (
                <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
                  Friend
                </button>
              ) : friendRequest.includes(data.uid + item.userId) ||
                friendRequest.includes(item.userId + data.uid) ? (
                <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
                  Pending
                </button>
              ) : (
                <button
                  onClick={() => handleAddFriend(item)}
                  className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md"
                >
                  Add Friend
                </button>
              )}
            </div>
          </Flex>
        ))}
      </div>
    </div>
  );
};

export default UserList;
