import React from "react";
import Message from "../../components/Message";
import Post from "../../components/Post";
import Profile from "../../components/Profile";
import Sidebar from "../../components/Sidebar";
import UserList from "../../components/UserList";

const Home = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-3 relative">
        <div className="h-[180px]">
          <Sidebar />
        </div>
        <div className="pl-8">
          <UserList />
        </div>
      </div>
      <div
        className="col-span-6 pt-5 h-full overflow-x-hidden "
        style={{
          backgroundImage: 'url("images/bg-color.png")',
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="">
          {" "}
          <Post
            name={"name"}
            profilePic="images/profile.png"
            postPic="images/img.png"
            content="Post Content"
          />
          <Post
            name={"name"}
            profilePic="images/profile.png"
            postPic="images/img.png"
            content="Post Content"
          />
          <Post
            name={"name"}
            profilePic="images/profile.png"
            postPic="images/img.png"
            content="Post Content"
          />
          <Post
            name={"name"}
            profilePic="images/profile.png"
            postPic="images/img.png"
            content="Post Content"
          />
          <Post
            name={"name"}
            profilePic="images/profile.png"
            postPic="images/img.png"
            content="Post Content"
          />
        </div>
      </div>
      <div className="col-span-3">
        <Profile />
      </div>
    </div>
  );
};

export default Home;
