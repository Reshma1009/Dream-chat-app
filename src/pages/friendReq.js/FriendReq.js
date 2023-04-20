import React, { useState, useEffect } from "react";
import Profile from "../../components/Profile";
import Sidebar from "../../components/Sidebar";
import FriendRequest from "../../components/FriendRequest";
import BlockUser from "../../components/BlockUser";
import AllFriends from "../../components/AllFriends";
import Loder from "../../components/Loder";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const FriendReq = () => {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(getAuth(), (res) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);
  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <div className="grid grid-cols-12 h-screen overflow-hidden">
          <div className="col-span-3 w-[500px] bg-white relative">
            <div className="h-[180px]">
              <Sidebar active="request" />
            </div>
            <div className="pl-8">
              <FriendRequest />
            </div>
          </div>
          <div
            className="col-span-6 "
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
          <div className="col-span-3">
            <Profile />
          </div>
        </div>
      )}
    </>
  );
};

export default FriendReq;
