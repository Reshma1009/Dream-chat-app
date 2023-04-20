import React from 'react'
import { CirclesWithBar } from "react-loader-spinner";
const Loder = () => {
  return (
    <div className='flex h-screen justify-center items-center flex-col'>
      <p className='text-2xl font-pophins font-semibold'>Loading..... Please wait</p>
      {/* <Mdspin */ }
      <CirclesWithBar/>
    </div>
  )
}

export default Loder