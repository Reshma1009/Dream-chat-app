import React from "react";
import { BsTriangleFill } from "react-icons/bs";
const Chat = () => {
  return (
    <div className="">
      <div className="text-left max-w-[85%]">
        <div className="mb-7">
          <div className="bg-[#F1F1F1] px-5 py-3 inline-block rounded-lg relative">
            <p className="font-pop font-medium text-base text-black">
              Hey There !
            </p>
            <BsTriangleFill className="absolute left-[-8px] bottom-0 text-[#F1F1F1]" />
          </div>
          <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
            Today, 2:01pm
          </p>
        </div>
        <div className="mb-7">
          <div className="bg-[#F1F1F1] px-5 py-3 inline-block rounded-lg relative">
            <p className="font-pop font-medium text-base text-black">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
              quibusdam nemo, culpa natus dicta mollitia voluptas commodi
              temporibus eligendi optio corrupti provident animi nobis quisquam
              quaerat excepturi sunt? Blanditiis, corporis.
            </p>
            <BsTriangleFill className="absolute left-[-8px] bottom-0 text-[#F1F1F1]" />
          </div>
          <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
            Today, 2:01pm
          </p>
        </div>
      </div>

      {/* Receive Message End */}
      {/* Send Message Start */}
      <div className="text-right max-w-[85%] ml-auto">
        <div className="mb-7 ">
          <div className="bg-primary px-5 py-3 inline-block rounded-lg relative text-left">
            <p className="font-pop font-medium text-base text-white">Hey !</p>
            <BsTriangleFill className="absolute right-[-8px] bottom-0 text-primary" />
          </div>
          <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
            Today, 2:01pm
          </p>
        </div>
        <div className="mb-7">
          <div className="bg-primary px-5 py-3 inline-block rounded-lg relative text-left">
            <p className="font-pop font-medium text-base text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
              quibusdam nemo, culpa natus dicta mollitia voluptas commodi
              temporibus eligendi optio corrupti provident animi nobis quisquam
              quaerat excepturi sunt? Blanditiis, corporis. Lorem ipsum dolor
              sit amet, consectetur adipisicing elit. Maiores quibusdam nemo,
              culpa natus dicta mollitia voluptas commodi temporibus eligendi
              optio corrupti provident animi nobis quisquam quaerat excepturi
              sunt? Blanditiis, corporis. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Maiores quibusdam nemo, culpa natus
              dicta mollitia voluptas commodi temporibus eligendi optio corrupti
              provident animi nobis quisquam quaerat excepturi sunt? Blanditiis,
              corporis.
            </p>
            <BsTriangleFill className="absolute right-[-8px] bottom-0 text-primary" />
          </div>
          <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
            Today, 2:01pm
          </p>
        </div>
        <div className="mb-7">
          <div className="bg-primary px-5 py-3 inline-block rounded-lg relative text-left">
            <p className="font-pop font-medium text-base text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
              quibusdam nemo, culpa natus dicta mollitia voluptas commodi
              temporibus eligendi optio corrupti provident animi nobis quisquam
              quaerat excepturi sunt? Blanditiis, corporis.
            </p>
            <BsTriangleFill className="absolute right-[-8px] bottom-0 text-primary" />
          </div>
          <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
            Today, 2:01pm
          </p>
        </div>
      </div>

      {/* Send Message End */}
      {/* Send Img Start */}
      <div className="mb-7 text-right">
        <div className="w-64 bg-primary p-3 inline-block rounded-lg relative text-left">
          {/* <ModalImage small={"images/login.png"} large={"images/login.png"} /> */}

          <BsTriangleFill className="absolute right-[-8px] bottom-0 text-primary" />
        </div>
        <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
          Today, 2:01pm
        </p>
      </div>
      {/* Send Img End */}
      {/* Receive Img Start */}
      <div className="mb-7 text-left">
        <div className="w-64 bg-[#f1f1f1] p-3 inline-block rounded-lg relative text-left">
          {/* <ModalImage small={"images/login.png"} large={"images/login.png"} /> */}

          <BsTriangleFill className="absolute left-[-8px] bottom-0 text-[#f1f1f1]" />
        </div>
        <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
          Today, 2:01pm
        </p>
      </div>
      {/* Receive Img End */}
      {/* Receive audio Start */}
      <div className="mb-7 text-left">
        <div className="w-64 inline-block rounded-lg text-left">
          <audio controls></audio>
        </div>
        <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
          Today, 2:01pm
        </p>
      </div>
      {/* Receive Img End */}
      {/* Receive video Start */}
      <div className="mb-7 text-left">
        <div className="w-64 inline-block rounded-lg text-left">
          <video controls></video>
        </div>
        <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
          Today, 2:01pm
        </p>
      </div>
      {/* Receive Img End */}
      {/* Send audio Start */}
      {/* <div className="mb-7 text-right">
          <div className="w-64 inline-block rounded-lg text-left">
            <audio controls></audio>
          </div>
          <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
            Today, 2:01pm
          </p>
        </div> */}
      {/* Send audio End */}
      {/* Send video Start */}
      {/* <div className="mb-7 text-right">
          <div className="w-64 inline-block rounded-lg text-left">
            <video controls></video>
          </div>
          <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
            Today, 2:01pm
          </p>
        </div> */}
      {/* Send video End */}
    </div>
  );
};

export default Chat;
