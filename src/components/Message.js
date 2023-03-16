import React from "react";
import Sidebar from "./Sidebar";
import UserList from "./UserList";
import Friends from "./Friends";
import Profile from "./Profile";
import Flex from "./Flex";
import Images from "./Images";
const Message = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-3 relative">
        <div className="h-[180px]">
          <Sidebar active={`message`} />
        </div>
        <div className="pl-8">
          <Friends />
        </div>
      </div>
      <div
        className="col-span-6  h-full overflow-x-hidden "
        style={{
          backgroundImage: 'url("images/bg-color.png")',
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Flex className="flex flex-col h-full">
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
          <div className="flex-1 h-full p-6">
            <p>jhjghjg</p>
          </div>
          {/* Messageing End */}
          {/* Input Text Area End */}
          <div>
            <input type="text" />
          </div>
          {/* Input Text Area End */}
        </Flex>
      </div>
      <div className="col-span-3">
        <Profile />
      </div>
    </div>
  );
};

export default Message;
