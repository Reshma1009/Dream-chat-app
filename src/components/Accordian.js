import React, { useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <div className="accordion-title" onClick={() => handleClick(index)}>
            <p>{item.title}</p>
            {activeIndex === index ? (
              <p>
                <FaAngleDown />
              </p>
            ) : (
              <p>
                <FaAngleUp />
              </p>
            )}
          </div>
          {activeIndex === index && (
            <div className="accordion-content">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
