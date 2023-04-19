import React, { useState, useEffect } from "react";
import Flex from "./Flex";
import Images from "./Images";
import { BsThreeDots } from "react-icons/bs";
import Modal from "./Modal";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../Api/Fuctional";
const Post = ({ item }) => {
  // console.log(item);
  const [isOpen, setIsOpen] = useState(false);
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  const db = getDatabase();
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  let submitLike = () => {
    set(ref(db, "posts/" + item.postId + "/likes/" + item.userId), {
      userId: item.userId,
    });
  };
  let submitcomm = () => {
    const postcommentsRef = ref(db, "posts/" + item.postId + "/comments");

    set(push(ref(db, "posts/" + item.postId + "/comments")), {
      userId: item.userId,
    });
  };
  const [loginUser, setLoginUser] = useState([]);

  useEffect(() => {
    getCurrentUser( setLoginUser);
  }, []);

  /*  console.log(
    loginUser
      .filter((useritem) => useritem.userId == item.userId)
      .map((item) => item.profile_picture)[0],
    "userList"
  ); */

  return (
    <div className="px-6 pb-5 border-b border-solid border-black mb-5">
      <Flex className={`flex gap-x-5 items-center pb-5`}>
        <div className="">
          <Images
            imgSrc={
              loginUser
                .filter((useritem) => useritem.userId == item.userId)
                .map((item) => item.profile_picture)[0]
            }
            className="rounded-full w-[50px]"
          />
        </div>
        <div>
          <h3>
            {
              loginUser
                .filter((useritem) => useritem.userId == item.userId)
                .map((item) => item.username)[0]
            }
          </h3>
        </div>
        <div className="ml-auto ">
          <BsThreeDots onClick={toggleModal} className="cursor-pointer" />
          {isOpen && (
            <Modal onClick={toggleModal} titel="Edit">
              <div>
                <Flex>Edit Post</Flex>
                <Flex>Delete Post</Flex>
              </div>
            </Modal>
          )}
        </div>
      </Flex>
      <div>
        <p className="pb-3">{item.posts}</p>
        {/* <Images imgSrc={postPic} /> */}
      </div>
      <button onClick={submitLike}>Like</button>
      <br />
      <button onClick={submitcomm}>comm</button>
    </div>
  );
};

export default Post;
