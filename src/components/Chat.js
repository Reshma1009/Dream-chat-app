import React, { useState, useEffect } from "react";
import { BsTriangleFill } from "react-icons/bs";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import ModalImage from "react-modal-image";
import moment from "moment";
import { getCurrentUser } from "../Api/Fuctional";
const Chat = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  // console.log("login",data);
  let activeChat = useSelector(
    (state) => state.allActiveChatUsers.activeChatUsers
  );
  // console.log( "adminid", activeChat);
  const [singleMessageList, setSingleMessageList] = useState([]);
  const [groupMessageList, setGroupMessageList] = useState([]);
  useEffect(() => {
    const singleMessageRef = ref(db, "singleMessage/");
    onValue(singleMessageRef, (snapshot) => {
      let arr = [];
      snapshot.forEach( ( item ) =>
      {
        console.log(item.val(), "item.val()ggggggggggggggggggggg");
        if (
          (data.uid == item.val().whoSendMessId &&
            item.val().whoReceiveMessId == activeChat.id) ||
          (data.uid == item.val().whoReceiveMessId &&
            item.val().whoSendMessId == activeChat.id)
        ) {
          arr.push(item.val());
        }
      });
      setSingleMessageList(arr);
    });
  }, [activeChat]);

  useEffect(() => {
    const groupMessageRef = ref(db, "groupMessage/");
    onValue(groupMessageRef, (snapshot) => {
      let arr = [];
      snapshot.forEach( ( item ) =>

      {console.log(item.val(),"gropList Mess")
        // console.log(item.val(), "item.val() group messahe");
        arr.push(item.val());
      });
      setGroupMessageList(arr);
    });
  }, [activeChat]);
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
  }, [] );
  const [loginUser, setLoginUser] = useState([]);
  useEffect(() => {
    getCurrentUser(setLoginUser);
  }, [] );
  return (
    <div>
      {activeChat && activeChat.status == "single" ? (
        singleMessageList.map((item) =>
          item.whoSendMessId == data.uid ? (
            item.message ? (
              <div className="text-right max-w-[85%] ml-auto">
                <div className="mb-7 ">
                  <div className="bg-primary px-5 py-3 inline-block rounded-lg relative text-left">
                    <p
                      dangerouslySetInnerHTML={{ __html: item.message }}
                      className="font-pop font-medium text-base text-white"
                    >

                    </p>
                    <BsTriangleFill className="absolute right-[-8px] bottom-0 text-primary" />
                  </div>
                  <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
                    {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                  </p>
                </div>
              </div>
            ) : item.image ? (
              <div className="text-right max-w-[85%] ml-auto">
                <div className="mb-7 ">
                  <div className="bg-primary px-5 py-3 inline-block rounded-lg relative text-left">
                    <div className="w-[200px]">
                      <ModalImage small={item.image} large={item.image} />
                    </div>

                    <BsTriangleFill className="absolute right-[-8px] bottom-0 text-primary" />
                  </div>
                  <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
                    {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mb-7 text-right">
                <div className=" inline-block rounded-lg text-left">
                  <audio controls src={item.audio}></audio>
                </div>
                <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
                  {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                </p>
              </div>
            )
          ) : item.message ? (
            <div className="text-left max-w-[85%]">
              <div className="mb-7">
                <div className="bg-[#F1F1F1] px-5 py-3 inline-block rounded-lg relative">
                  <p
                    dangerouslySetInnerHTML={{ __html: item.message }}
                    className="font-pop font-medium text-base text-black"
                  ></p>
                  <BsTriangleFill className="absolute left-[-8px] bottom-0 text-[#F1F1F1]" />
                </div>
                <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
                  {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                </p>
              </div>
            </div>
          ) : item.image ? (
            <div className="text-left max-w-[85%]">
              <div className="mb-7">
                <div className="bg-[#F1F1F1] px-5 py-3 inline-block rounded-lg relative">
                  {/* <img className="w-[200px]" src={item.image} alt="" /> */}
                  <div className="w-[200px]">
                    <ModalImage small={item.image} large={item.image} />
                  </div>
                  <BsTriangleFill className="absolute left-[-8px] bottom-0 text-[#F1F1F1]" />
                </div>
                <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
                  {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-7 text-right">
              <div className="w-64 inline-block rounded-lg text-left">
                <audio src={item.audio} controls></audio>
              </div>
              <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
                {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
              </p>
            </div>
          )
        )
      ) : activeChat &&
        (data.uid == activeChat.adminId ||
          joinedGroup.includes(activeChat.id + data.uid)) ? (
        groupMessageList.map((item) =>
          item.whoSendId == data.uid
            ? item.whoReceiveId == activeChat.id &&
              (item.message ? (
                <div className="text-right max-w-[85%] ml-auto">
                  <div className="mb-7 ">
                    <div className="bg-primary px-5 py-3 inline-block rounded-lg relative text-left">
                      <p
                        dangerouslySetInnerHTML={{ __html: item.message }}
                        className="font-pop font-medium text-base text-white"
                      ></p>
                      <BsTriangleFill className="absolute right-[-8px] bottom-0 text-primary" />
                    </div>
                    <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
                      {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </p>
                  </div>
                </div>
              ) : item.image ? (
                <div className="mb-7 text-right">
                  <div className="w-64 bg-primary p-3 inline-block rounded-lg relative text-left">
                    {<ModalImage small={item.image} large={item.image} />}

                    <BsTriangleFill className="absolute right-[-8px] bottom-0 text-primary" />
                  </div>
                  <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
                    {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                  </p>
                </div>
              ) : (
                <div className="mb-7 text-right">
                  <div className="inline-block rounded-lg text-left">
                    <audio controls src={item.audio}></audio>
                  </div>
                  <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
                    {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                  </p>
                </div>
              ))
            : item.whoReceiveId == activeChat.id &&
              (item.message ? (
                <div className="text-left max-w-[85%]">
                  <div className="mb-7">
                    <p className="font-pop mb-3 italic  font-normal text-sm text-[#5e5555]">
                      {
                        loginUser
                          .filter(
                            (useritem) => useritem.userId == item.whoSendId
                          )
                          .map((item) => item.username)[0]
                      }
                    </p>
                    <div className="bg-[#F1F1F1] px-5 py-3 inline-block rounded-lg relative">
                      <p
                        dangerouslySetInnerHTML={{ __html: item.message }}
                        className="font-pop font-medium text-base text-black"
                      ></p>

                      <BsTriangleFill className="absolute left-[-8px] bottom-0 text-[#F1F1F1]" />
                    </div>
                    <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
                      {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </p>
                    <img
                      src={
                        loginUser
                          .filter(
                            (useritem) => useritem.userId == item.whoSendId
                          )
                          .map((item) => item.profile_picture)[0]
                      }
                      alt=""
                    />
                  </div>
                </div>
              ) : item.image ? (
                <div className="mb-7 text-left">
                  <div className="w-64 bg-[#f1f1f1] p-3 inline-block rounded-lg relative text-left">
                    {<ModalImage small={item.image} large={item.image} />}

                    <BsTriangleFill className="absolute left-[-8px] bottom-0 text-[#f1f1f1]" />
                  </div>
                  <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
                    {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                  </p>
                </div>
              ) : (
                <div className="mb-7 text-left">
                  <div className=" inline-block rounded-lg text-left">
                    <audio controls src={item.audio}></audio>
                  </div>
                  <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
                    {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                  </p>
                </div>
              ))
        )
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-white bg-primary px-8 rounded py-3 text-2xl capitalize font-pophins font-bold">
            You are not Member
          </h1>
        </div>
      )}
    </div>
  );
};

export default Chat;
