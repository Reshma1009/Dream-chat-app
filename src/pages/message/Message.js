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
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../components/Modal";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import { getAuth } from "firebase/auth";
import "react-html5-camera-photo/build/css/index.css";
import {
  getStorage,
  ref as sRef,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import EmojiPicker from "emoji-picker-react";
const Message = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [img, setImg] = useState("");
  function toggleModal() {
    setIsOpen(!isOpen);
    setImg("");
  }
  function toggleModal2() {
    setIsOpen2(!isOpen2);
  }
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  let activeChat = useSelector(
    (state) => state.allActiveChatUsers.activeChatUsers
  );
  // console.log(activeChat);
  let handleMesage = (e) => {
    setMessage(e.target.value);
    // console.log(e.target.value);
    setShowEmoji(false);
  };
  let handleSendEmoji = () => {
    setShowEmoji(!showEmoji);
  };
  let handleSendMessage = () => {
    if (!message) {
      toast("write SomeThing");
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
  let handleSendImg = () => {
    const storage = getStorage();
    const storageRef = sRef(storage, "take-photo/" + auth.currentUser.uid);
    const message4 = img;
    uploadString(storageRef, message4, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        // console.log( "File available at", downloadURL );
        set(push(ref(db, "singleMessage")), {
          whoSendId: data.uid,
          whoSendName: data.displayName,
          whoSendPhoto: data.photoURL,
          whoReceiveId: activeChat.id,
          whoReceiveName: activeChat.name,
          whoReceivePhoto: activeChat.profilePhoto,
          image: downloadURL,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(() => {
          setMessage("");
          setIsOpen(false);
          setImg("");
        });
      });
    });
  };
  const [joinedGroup, setJoinedGroup] = useState([]);
  useEffect(() => {
    const acceptReqGroupRef = ref(db, "acceptGrpReq/");
    onValue(acceptReqGroupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log("meme", item.val());

        arr.push(item.val().groupId + item.val().userId);
      });
      setJoinedGroup(arr);
    });
  }, []);

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
    setImg(dataUri);
  }
  let openCamera = () => {
    setIsOpen(!isOpen);
  };
  let openFile = () => {
    setIsOpen2(!isOpen2);
  };
  let hadleFileUpload = () => {};
  return (
    <div className="flex h-screen overflow-hidden ">
      <ToastContainer position="bottom-center" theme="dark" />
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
        {activeChat.status == "single" ? (
          <div className="flex items-center gap-x-5 p-5 pb-2 relative">
            <input
              onChange={handleMesage}
              value={message}
              type="text"
              className="w-[100%] p-3 rounded-lg outline-primary"
            />
            <div className="flex gap-x-5 absolute right-[110px]">
              <BsFillCameraFill
                onClick={openCamera}
                className="text-primary text-2xl"
              />
              <BiHappy
                onClick={handleSendEmoji}
                className="text-primary text-2xl"
              />
              {showEmoji && (
                <div className="absolute top-[-465px] right-0">
                  <EmojiPicker />
                </div>
              )}
              <ImAttachment
                onClick={openFile}
                className="text-primary text-2xl"
              />
              <BsFillMicFill className="text-primary text-2xl" />
            </div>
            <button
              onClick={handleSendMessage}
              className="bg-primary px-5 py-3 rounded-lg"
            >
              <RiSendPlaneFill className="text-white text-2xl" />
            </button>
          </div>
        ) : (
          activeChat &&
          (data.uid == activeChat.adminId ||
            joinedGroup.includes(activeChat.id + data.uid)) && (
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
          )
        )}

        {/* Input Text Area End */}
      </div>

      <div className="w-[400px]">
        <Profile />
      </div>
      {isOpen && (
        <Modal
          onClick={toggleModal}
          titel="Take Your Photo"
          show={true}
          sendImg={handleSendImg}
        >
          <div>
            <Flex>open Camera</Flex>
            <Flex>Delete Post</Flex>

            <Camera
              onTakePhoto={(dataUri) => {
                handleTakePhoto(dataUri);
              }}
              idealFacingMode={FACING_MODES.ENVIRONMENT}
              idealResolution={{ width: 640, height: 480 }}
              imageType={IMAGE_TYPES.JPG}
              imageCompression={0.97}
              isMaxResolution={true}
              isImageMirror={false}
              isSilentMode={false}
              isDisplayStartCameraError={true}
              isFullscreen={false}
              sizeFactor={1}
            />
          </div>
          <div>
            <p className="text-xl text-black">Preview</p>
            {img && <img src={img} alt="" />}
          </div>
        </Modal>
      )}
      {isOpen2 && (
        <Modal onClick={toggleModal2} titel="Open File" show={true}>
          <div>
            <input onChange={hadleFileUpload} type="file" name="" id="" />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Message;
