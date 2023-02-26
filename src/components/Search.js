import React from 'react'
import { MdOutlineSearch } from "react-icons/md";
const Search = ({placeholder}) => {
  return (
    <div className='relative mb-6'>
      <input  className='w-[97%] p-3 border border-solid border-gray-300 rounded-md ' type="text" placeholder={ placeholder } />
      <MdOutlineSearch className='absolute  top-[50%] right-7 translate-y-[-50%] font-bold text-primary text-2xl'/>
    </div>
  );
}

export default Search