import React, { useState, useEffect } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <div
            className="transition-all duration-[1s] ease-in"
            onClick={() => handleClick(index)}
          >
            <p className="flex justify-between ">
              {item.title}
              {activeIndex === index ? (
                <span className="text-2xl">
                  <FaAngleDown />
                </span>
              ) : (
                <span className="text-2xl">
                  <FaAngleUp />
                </span>
              )}
            </p>
          </div>
          {activeIndex === index && (
            <div className=" text-center ">
              <p>DreamsChat</p>
              {item.content.email && <p>{item.content.email}</p>}

              {item.content.editName && (
                <p>
                  {item.content.editName}{" "}
                  <AiFillEdit className="inline-block ml-4" />
                </p>
              )}
              {item.content.editBio && (
                <p>
                  {item.content.editBio}
                  <AiFillEdit className="inline-block ml-4" />{" "}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
