import React,{useState} from "react";
import Sidebar from "./Sidebar";

const Groups = () => {
  const [toggleTab, setToggleTab] = useState(1);
  let handleToggle = (index) => {
    setToggleTab(index);
  };
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-3 relative">
        <div className="h-[180px]">
          <Sidebar />
        </div>
        <div className="pl-8">
          <p> Create Groups</p>
          <div>
            {/* Tab Button */}
            <div>
              <button
                onClick={() => handleToggle(1)}
                className={` ${
                  toggleTab == 1 ? "bg-blue-500" : "bg-red-500"
                } text-white inline-block py-2 px-5 rounded-md font-medium font-pophins text-lg mr-3`}
              >
                {" "}
                Member{" "}
              </button>
              <button
                onClick={() => handleToggle(2)}
                className={` ${
                  toggleTab == 2 ? "bg-blue-500" : "bg-red-500"
                } text-white inline-block py-2 px-5 rounded-md font-medium font-pophins text-lg mr-3`}
              >
                Create Group{" "}
              </button>
            </div>
            <div>
              <div
                className={` ${toggleTab==1? "block" : "hidden"}  `}
              >
                <h2>Content 1</h2>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati praesentium incidunt quia aspernatur quasi quidem
                  facilis quo nihil vel voluptatum?
                </p>
              </div>
              <div
                className={` ${toggleTab==2? "block" : "hidden"}  `}
              >
                <h2>Content 2</h2>
                <hr />
                <p>
                  from 2
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-6 bg-red-400">
        <h1>jhjkgjhg</h1>
      </div>
      <div className="col-span-3 bg-green-400">
        <h2>jhgjhf</h2>
      </div>
    </div>
  );
};

export default Groups;
