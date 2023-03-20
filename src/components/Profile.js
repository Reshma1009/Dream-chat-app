import React, { useState, useEffect } from "react";
import Flex from "./Flex";
import Images from "./Images";
import { MdCloudUpload } from "react-icons/md";
import Accordion from "./Accordian";
import Modal from "./Modal";
const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
      setIsOpen(!isOpen);
    }
  const items = [{ title: "Info", content: { email: "Email Address" } }];
  const items2 = [
    {
      title: "Settings",
      content: { editName: "Display Name", editBio: "Edit Your Bio" },
    },
  ];
  return (
    <>
      <Flex className="items-center flex flex-col pt-10">
        <div className="relative mb-5 group">
          <div className="w-[150px] h-[150px]">
            <Images imgSrc="images/avatar.jpg" className="rounded-full" />
          </div>
          <div
            onClick={toggleModal}
            className=" transition-all opacity-0 group-hover:opacity-100 absolute w-full h-full bg-[rgba(0,0,0,.4)] rounded-full top-0 left-0 flex justify-center items-center ease-out duration-[.4s] "
          >
            <MdCloudUpload className="text-4xl text-primary" />
          </div>
        </div>
        {isOpen && (
          <Modal onClick={toggleModal} titel="Edit">
            <div>
              <Flex>Edit Post</Flex>
              <Flex>Delete Post</Flex>
            </div>
          </Modal>
        )}
        <h2 className="text-3xl font-bold font-pophins mb-5">Display Name</h2>
        <p className="font-pophins font-medium text-xl">Display Bio</p>
      </Flex>
      <div className="border-black border-b border-solid mb-5 pb-5 px-5">
        <Accordion items={items} />
      </div>
      <div className="px-5">
        <Accordion items={items2} />
      </div>
    </>
  );
};

export default Profile;
