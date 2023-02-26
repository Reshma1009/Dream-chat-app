import React from "react";
import Message from "../../components/Message";
import Sidebar from "../../components/Sidebar";
import UserList from "../../components/UserList";

const Home = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-3 relative">
        <div className="h-[180px]">
          <Sidebar />
        </div>
        <div className="pl-8">
          <UserList />
        </div>
      </div>
      <div className="col-span-6 bg-red-400">
        <h1>jhjkgjhg</h1>
      </div>
      <div className="col-span-3 bg-green-400">
        <h2>hello</h2>
      </div>
    </div>
  );
};

export default Home;
