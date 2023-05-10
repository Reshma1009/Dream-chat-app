import React, { useState, useEffect, createRef } from "react";
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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "react-html5-camera-photo/build/css/index.css";
import {
  getStorage,
  ref as sRef,
  uploadString,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import EmojiPicker from "emoji-picker-react";
import ScrollToBottom from "react-scroll-to-bottom";
import { AudioRecorder } from "react-audio-voice-recorder";
import Cropper, { ReactCropperElement } from "react-cropper";
import { getCurrentUser } from "../../Api/Fuctional";
import { useNavigate } from "react-router-dom";
import Loder from "../../components/Loder";
const Message = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [img, setImg] = useState("");
  let [blob, setBlob] = useState("");
  const [ audio, setAudio ] = useState( "" );
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();
    useEffect(() => {
      if (!data) {
        navigate("/");
      } else {
        setLoading(false);
      }
    }, []);

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudio(url);
    setBlob(blob);
  };

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
  };
  let handleOnFocus = (e) => {
    setShowEmoji(false);
  };
  let handleSendEmoji = () => {
    setShowEmoji(!showEmoji);
    // setMessage(message+);
  };
  // Enter Button Sebd Message
  const textarea = document.querySelector("textArea");
  let handleEnterButn = (e) => {
     if (e.key == "Enter") {
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
    const scHight = e.target.scrollHeight;
    textarea.style.height = `50px`;
    textarea.style.height = `${scHight}px`;
  };
  // Send Emoji
  let sendEmoji = (emoji) => {
    setMessage(message + emoji.emoji);
  };
  // Send Like
  let handleSendLike = () => {
    if (activeChat && activeChat.status == "single") {
      set(push(ref(db, "singleMessage")), {
        whoSendId: data.uid,
        whoSendName: data.displayName,
        whoSendPhoto: data.photoURL,
        whoReceiveId: activeChat.id,
        whoReceiveName: activeChat.name,
        whoReceivePhoto: activeChat.profilePhoto,
        message: " &#128077;",
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
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
        message: " &#128077;",
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
    }
  };
  // send Message
  let handleSendMessage = () => {
    setShowEmoji(false);
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
  // Send Img
  let handleSendImg = () => {
    const storage = getStorage();
    const storageRef = sRef(storage, "take-photo/" + auth.currentUser.uid);
    const message4 = img;
    uploadString(storageRef, message4, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        if (activeChat && activeChat.status == "single") {
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
        } else {
          set(push(ref(db, "groupMessage")), {
            whoSendId: data.uid,
            whoSendName: data.displayName,
            whoSendPhoto: data.photoURL,
            whoReceiveId: activeChat.id,
            adminId: activeChat.adminId,
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
        }
      });
    });
  };
  // Audio Send
  let sendRecordingAudio = () => {
    const storage = getStorage();
    const storageRef = sRef(storage, "audio/" + auth.currentUser.uid);
    uploadBytes(storageRef, blob).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        if (activeChat && activeChat.status == "single") {
          set(push(ref(db, "singleMessage")), {
            whoSendId: data.uid,
            whoSendName: data.displayName,
            whoSendPhoto: data.photoURL,
            whoReceiveId: activeChat.id,
            whoReceiveName: activeChat.name,
            whoReceivePhoto: activeChat.profilePhoto,
            audio: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setAudio("");
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
            audio: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setAudio("");
          });
        }
      });
    });
  };

  // SEnd File Upload
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef("");
  let files;
  const onChange = (e) => {
    e.preventDefault();
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      // console.log(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
    const storage = getStorage();
    const storageRef = sRef(storage, "files/" + auth.currentUser.uid);
    const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
    uploadString(storageRef, message4, "data_url").then((snapshot) => {
      console.log("Uploaded a data_url string!");
      getDownloadURL(storageRef).then((downloadURL) => {
        if (activeChat && activeChat.status == "single") {
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
            setIsOpen2(false);
            setImage("");
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
            image: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setMessage("");
            setIsOpen2(false);
            setImage("");
          });
        }
      });
    });
  };

  const [joinedGroup, setJoinedGroup] = useState([]);
  useEffect(() => {
    const acceptReqGroupRef = ref(db, "acceptGrpReq/");
    onValue(acceptReqGroupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // console.log("meme", item.val());

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
    setImage("");
  };
  const [loginUser, setLoginUser] = useState([]);
  useEffect(() => {
    getCurrentUser(setLoginUser);
  }, []);
  return (
    <>
      {loading ? (
        <Loder />
      ) : (
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
                      { activeChat && activeChat.name }
                      {console.log(activeChat.name)}
                  </p>
                  <p className="font-pophins text-base font-normal">Online</p>
                </div>
              </Flex>
            </div>
            {/* Name Info End*/}
            {/* Messageing Start */}

            <ScrollToBottom
              scrollViewClassName={`scrollToBottom scrollbar-hidden px-8`}
              className={`overflow-y-auto overflow-x-hidden scrollbar-hidden pt-5 flex-1 relative`}
            >
              <Chat />
            </ScrollToBottom>
            {/* Messageing End */}
            {/* Input Text Area End */}
            {activeChat && activeChat.status == "single" ? (
              <div className="flex items-center gap-x-5 p-5 pb-2 relative">
                {audio && (
                  <div className="absolute top-[14px] left-[20px] w-[87%] flex justify-between">
                    <audio controls src={audio} className="w-[550px]"></audio>
                    <div className="flex gap-x-5">
                      <button
                        onClick={sendRecordingAudio}
                        className="px-4 py-1 text-sm bg-primary rounded-lg text-white font-bold"
                      >
                        Send Audio
                      </button>
                      <button
                        onClick={() => setAudio("")}
                        className="px-4 py-1 text-sm bg-primary rounded-lg text-white font-bold"
                      >
                        Delete Audio
                      </button>
                    </div>
                  </div>
                )}
                <input
                  onChange={handleMesage}
                  onFocus={handleOnFocus}
                  onKeyUp={handleEnterButn}
                  value={message}
                  type="text"
                  className="w-full p-3 rounded-lg outline-primary"
                />
                {!audio && (
                  <div className="flex gap-x-5 absolute right-[110px]">
                    <BsFillCameraFill
                      onClick={openCamera}
                      className="text-primary text-2xl cursor-pointer"
                    />
                    <BiHappy
                      onClick={handleSendEmoji}
                      className="text-primary text-2xl cursor-pointer"
                    />
                    {showEmoji && (
                      <div className="absolute top-[-465px] right-0">
                        <EmojiPicker
                          onEmojiClick={(emoji) => sendEmoji(emoji)}
                        />
                      </div>
                    )}
                    <ImAttachment
                      onClick={openFile}
                      className="text-primary text-2xl cursor-pointer"
                    />
                    {/* <BsFillMicFill
                className="text-primary text-2xl cursor-pointer"
              /> */}
                    {!audio && (
                      <AudioRecorder onRecordingComplete={addAudioElement} />
                    )}
                  </div>
                )}
                {message ? (
                  <button
                    onClick={handleSendMessage}
                    className="bg-primary px-5 py-3 rounded-lg "
                  >
                    <RiSendPlaneFill className="text-white text-2xl" />
                  </button>
                ) : (
                  <button
                    onClick={handleSendLike}
                    className="bg-primary px-5 py-2 rounded-lg text-2xl"
                  >
                    {/* <RiSendPlaneFill className="text-white text-2xl" /> */}
                    &#128077;
                  </button>
                )}
              </div>
            ) : (
              activeChat &&
              (data.uid == activeChat.adminId ||
                joinedGroup.includes(activeChat.id + data.uid)) && (
                <div className="flex items-center gap-x-5 p-5 pb-2 relative">
                  {audio && (
                    <div className="absolute top-[14px] left-[20px] w-[87%] flex justify-between">
                      <audio controls src={audio} className="w-[550px]"></audio>
                      <div className="flex gap-x-5">
                        <button
                          onClick={sendRecordingAudio}
                          className="px-4 py-1 text-sm bg-primary rounded-lg text-white font-bold"
                        >
                          Send Audio
                        </button>
                        <button
                          onClick={() => setAudio("")}
                          className="px-4 py-1 text-sm bg-primary rounded-lg text-white font-bold"
                        >
                          Delete Audio
                        </button>
                      </div>
                    </div>
                  )}
                  <textarea
                    onChange={handleMesage}
                    onFocus={handleOnFocus}
                    onKeyUp={handleEnterButn}
                    value={message}
                    type="text"
                    className="w-full p-3 pr-[160px] rounded-lg outline-primary resize-none max-h-[150px] h-[50px] scrollbar-hidden"
                    rows="1"
                  ></textarea>
                  {!audio && (
                    <div className="flex gap-x-5 absolute right-[110px]">
                      <BsFillCameraFill
                        onClick={openCamera}
                        className="text-primary text-2xl cursor-pointer"
                      />
                      <BiHappy
                        onClick={handleSendEmoji}
                        className="text-primary text-2xl cursor-pointer"
                      />
                      {showEmoji && (
                        <div className="absolute top-[-465px] right-0">
                          <EmojiPicker
                            onEmojiClick={(emoji) => sendEmoji(emoji)}
                          />
                        </div>
                      )}
                      <ImAttachment
                        onClick={openFile}
                        className="text-primary text-2xl cursor-pointer"
                      />
                      {/* <BsFillMicFill
                className="text-primary text-2xl cursor-pointer"
              /> */}
                      {!audio && (
                        <AudioRecorder onRecordingComplete={addAudioElement} />
                      )}
                    </div>
                  )}
                  {message ? (
                    <button
                      onClick={handleSendMessage}
                      className="bg-primary px-5 py-3 rounded-lg "
                    >
                      <RiSendPlaneFill className="text-white text-2xl" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSendLike}
                      className="bg-primary px-5 py-2 rounded-lg text-2xl"
                    >
                      {/* <RiSendPlaneFill className="text-white text-2xl" /> */}
                      &#128077;
                    </button>
                  )}
                </div>
              )
            )}
            {/* text */}

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
            <Modal
              onClick={toggleModal2}
              titel="Open File"
              show={true}
              sendImg={getCropData}
            >
              <div>
                {image && (
                  <Cropper
                    ref={cropperRef}
                    style={{ height: 400, width: "100%" }}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    guides={true}
                  />
                )}
                {image && (
                  <>
                    <h1>Preview</h1>
                    <div className="w-[100px] h-[100px] mx-auto rounded-full overflow-hidden mb-5">
                      <div className="img-preview w-full h-full"></div>
                    </div>
                  </>
                )}
                <input onChange={onChange} type="file" name="" id="" />
              </div>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default Message;
