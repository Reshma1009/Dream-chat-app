import React from "react";
import Flex from "./Flex";
import Images from "./Images";
import Search from "./Search";

const AllGroupList = () => {
  return (
    <div className="flex flex-col overflow-hidden h-[40vh] shadow-2xl p-7 pt-0">
      {/* <Search placeholder={`search here for users`} /> */}
      <h2 className="font-pophins font-bold text-2xl text-primary mb-5">
        All Groups
      </h2>
      <div className="overflow-y-auto overflow-x-hidden">
        <Flex
          className={`flex gap-x-5 bg-slate-100 p-4 items-center rounded-md hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition ease-out duration-[.4s] mb-5 `}
        >
          <div>
            <Images imgSrc={`images/profile.png`} />
          </div>
          <div>
            <h3 className="text-heading font-medium text-lg font-pophins">
              Group Name
            </h3>
            <p className="text-[#767676] font-normal text-sm font-pophins">
              Hi Guys, How Are you
            </p>
          </div>
          <div className="grow text-right">
            <button className="bg-primary py-2 px-3 text-white font-pophins text-sm rounded-md">
              Message
            </button>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default AllGroupList;
