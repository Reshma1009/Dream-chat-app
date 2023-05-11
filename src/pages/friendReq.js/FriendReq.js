import React, { useState, useEffect } from "react";
import Profile from "../../components/Profile";
import Sidebar from "../../components/Sidebar";
import FriendRequest from "../../components/FriendRequest";
import BlockUser from "../../components/BlockUser";
import AllFriends from "../../components/AllFriends";
import Loder from "../../components/Loder";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const FriendReq = () => {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  useEffect(() => {
    if (!data) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <div className="flex h-screen overflow-hidden">
          <div className=" w-[500px] bg-white relative">
            <div className="h-[180px]">
              <Sidebar active="request" />
            </div>
            <div className="pl-8 max-w-full">
              <FriendRequest />
            </div>
          </div>
          <div
            className="flex-1 "
            style={{
              backgroundImage: 'url("images/bg-color.png")',
              backgroundPosition: "center",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div>
              <AllFriends />
              <BlockUser />
            </div>
          </div>
          <div className="w-[400px]">
            <Profile />
          </div>
        </div>
      )}
    </>
  );
};

export default FriendReq;
