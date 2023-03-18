import React from "react";
import Sidebar from "../../components/Sidebar";
import UserList from "../../components/UserList";
import Friends from "../../components/Friends";
import Profile from "../../components/Profile";
import Flex from "../../components/Flex";
import Images from "../../components/Images";
import Chat from "../../components/Chat";
const Message = () => {
  return (
    <div className="h-screen">
      <div className="flex ">
        <div className="relative w-[500px]">
          <div className="h-[180px]">
            <Sidebar active={`message`} />
          </div>
          <div className="pl-8">
            <Friends />
          </div>
        </div>

        <div
          className="flex-1"
          style={{
            backgroundImage: 'url("images/bg-color.png")',
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="">
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
                  <p className="font-pophins text-xl font-medium">
                    Display Name
                  </p>
                  <p className="font-pophins text-base font-normal">Online</p>
                </div>
              </Flex>
            </div>
            {/* Name Info End*/}
            {/* Messageing Start */}

            <div className="p-6 pr-0">
              <Chat />
            </div>
            {/* Messageing End */}
            {/* Input Text Area End */}
            <div>
              <input type="text" />
            </div>
            {/* Input Text Area End */}
          </div>
        </div>

        <div className="w-[400px]">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Message;
