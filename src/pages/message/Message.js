import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import UserList from "../../components/UserList";
import Friends from "../../components/Friends";
import Profile from "../../components/Profile";
import Flex from "../../components/Flex";
import Images from "../../components/Images";
import Chat from "../../components/Chat";
import AllGroupList from "../../components/AllGroupList";
import { BsFillCameraFill, BsFillMicFill } from "react-icons/bs";
import { BiHappy } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { ImAttachment } from "react-icons/im";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
const Message = () => {
  const db = getDatabase();
  const [message, setMessage] = useState("");
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  let activeChat = useSelector(
    (state) => state.allActiveChatUsers.activeChatUsers
  );
  console.log(activeChat);
  let handleMesage = (e) => {
    setMessage(e.target.value);
    // console.log(e.target.value);
  };
  let handleSendMessage = () => {
    if (!message) {
      console.log("write SomeThing");
    } else {
      if (activeChat && activeChat.status == "single") {
        set(push(ref(db, "singleMessage")), {
          whoSendId: data.uid,
          whoSendName: data.displayName,
          whoSendPhoto: data.photoURL,
          whoReceiveId: activeChat.id,
          whoReceiveName: activeChat.name,
          whoReceivePhoto: activeChat.profilePhoto,
          message,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(() => {
          setMessage("");
        });
      } else {
        set(push(ref(db, "groupMessage")), {
          whoSendId: data.uid,
          whoSendName: data.displayName,
          whoSendPhoto: data.photoURL,
          whoReceiveId: activeChat.id,
          adminId: activeChat.adminId,
          whoReceiveName: activeChat.name,
          whoReceivePhoto: activeChat.profilePhoto,
          message,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(() => {
          setMessage("");
        });
      }
    }
  };
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
                imgSrc={activeChat && activeChat.profilePhoto}
                className="rounded-full w-full"
              />
            </div>
            <div>
              <p className="font-pophins text-xl font-medium">
                {activeChat && activeChat.name}
              </p>
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
        <div className="flex items-center gap-x-5 p-5 pb-2 relative">
          <input
            onChange={handleMesage}
            value={message}
            type="text"
            className="w-[100%] p-3 rounded-lg outline-primary"
          />
          <div className="flex gap-x-5 absolute right-[110px]">
            <BsFillCameraFill className="text-primary text-2xl" />
            <BiHappy className="text-primary text-2xl" />
            <ImAttachment className="text-primary text-2xl" />
            <BsFillMicFill className="text-primary text-2xl" />
          </div>
          <button
            onClick={handleSendMessage}
            className="bg-primary px-5 py-3 rounded-lg"
          >
            <RiSendPlaneFill className="text-white text-2xl" />
          </button>
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
