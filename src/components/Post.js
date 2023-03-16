import React, { useState, useEffect } from "react";
import Flex from "./Flex";
import Images from "./Images";
import { BsThreeDots } from "react-icons/bs";
import Modal from "./Modal";
const Post = ({ content, profilePic, name, postPic }) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <div className="px-6 pb-5 border-b border-solid border-black mb-5">
      <Flex className={`flex gap-x-5 items-center pb-5`}>
        <div className="">
          <Images imgSrc={profilePic} className="rounded-full" />
        </div>
        <div>
          <h3>{name}</h3>
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
        <p className="pb-3">{content}</p>
        <Images imgSrc={postPic} />
      </div>
    </div>
  );
};

export default Post;
