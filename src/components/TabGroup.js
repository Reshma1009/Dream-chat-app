import React, { useState } from "react";
import Flex from "./Flex";
// import styled from "styled-components";


const TabGroup = () => {
  const types = ["Cash", "Credit Card", "Bitcoin"];
  const [active, setActive] = useState(types[0]);
  return (
    <>
      <Flex className={`flex`}>
        {types.map((type) => (
          <div
            
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
            {type}
          </div>
        ))}
      </Flex>
      <p />
      <p> Your payment selection: {active} </p>
    </>
  );
};
export default TabGroup;
