import React from "react";
import Sidebar from "../../components/Sidebar";
import UserList from "../../components/UserList";
import Friends from "../../components/Friends";
import Profile from "../../components/Profile";
import Flex from "../../components/Flex";
import Images from "../../components/Images";
import Chat from "../../components/Chat";
import AllGroupList from "../../components/AllGroupList";
const Message = () => {
  return (
    <div className="flex h-screen overflow-hidden ">
      <div className="relative w-[500px]">
        <div className="h-[180px]">
          <Sidebar active={`message`} />
        </div>
        <div className="">
          <div>

            <AllGroupList />
          </div>
          <div>

            <Friends />
          </div>
        </div>
      </div>
      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{
          backgroundImage: 'url("images/bg-color.png")',
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Name Info Start*/}
        <div className="bg-white border-r border-solid border-black">
          <Flex className="flex gap-x-5 p-6 items-center">
            <div className="w-[90px] h-[90px]">
              <Images
                imgSrc="images/profile.png"
                className="rounded-full w-full"
              />
            </div>
            <div>
              <p className="font-pophins text-xl font-medium">Display Name</p>
              <p className="font-pophins text-base font-normal">Online</p>
            </div>
          </Flex>
        </div>
        {/* Name Info End*/}
        {/* Messageing Start */}

        <div className="p-8  overflow-y-auto overflow-x-hidden scrollbar-hidden pt-5 flex-1">
          <Chat />
        </div>
        {/* Messageing End */}
        {/* Input Text Area End */}
        <div>
          <input type="text" />
        </div>
        {/* Input Text Area End */}
      </div>

      <div className="w-[400px]">
        <Profile />
      </div>
    </div>
  );
};

export default Message;
