import React, { useState, useEffect } from "react";
import Flex from "./Flex";
import Images from "./Images";
import Search from "./Search";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../Api/Fuctional";
const UserList = () => {
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  let data = useSelector( ( state ) => state.allUserSInfo.userInfo );
  /* Get Current User From Users Collections Start*/
  useEffect(() => {
    getCurrentUser( setCurrentUser);
  }, [] );
   const [loginUser, setLoginUser] = useState([]);

   useEffect(() => {
     getCurrentUser(setLoginUser);
   }, []);
  // console.log("currentUser", currentUser);
  const [currentuserList, setCurrentUserList] = useState({});
  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.key) {
          arr.push({ ...item.val(), userId: item.key });
        }
      });
      setCurrentUserList(arr[0]);
    });
  }, []);
  /* Get Current User From Users Collections End*/

  /* Friend Request Send Start*/
  let handleAddFriend = ( item ) =>
  {
    console.log(item, "item");
    set(push(ref(db, "friendRequest")), {
      senderId: data.uid,
      // senderName: loginUser
      //   .filter((useritem) => useritem.userId == item.userId)
      //   .map((item) => item.username)[0],
      senderName: data.displayName,
      senderPhoto: data.photoURL,
      receiverId: item.userId,
      receiverName: item.username,
      receiverPhoto: item.profile_picture,
    });
  };
  /* Friend Request Send End*/


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
        arr.push(item.val().userId + item.val().sendRqId);
      });
      setFriendList(arr);
    });
  }, []);
  const [blockList, setBlockList] = useState([]);
  useEffect(() => {
    const blockRef = ref(db, "block");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log("block", item.val());

        arr.push(item.val().blockId + item.val().whoBlockId);
      });
      setBlockList(arr);
    });
  }, []);
  return (
    <div className="">
      <h2 className="font-pophins font-bold text-2xl text-primary mb-5">
        All Users
      </h2>
      <Search placeholder={`search here for users`} />
      <div className="w-[97%] h-[100vh] overflow-y-auto">
        {userList.length == 0 ? (
          <h1 className="font-blod text-xl bg-primary font-pophins text-white py-3 px-5 rounded-xl">
            No Block User Found
          </h1>
        ) : (
          userList.map((item) => (
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
                {blockList.includes(data.uid + item.userId) ||
                blockList.includes(item.userId + data.uid) ? (
                  <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
                    Block
                  </button>
                ) : friendList.includes(data.uid + item.userId) ||
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
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
