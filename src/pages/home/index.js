import React from 'react'
import Sidebar from '../../components/Sidebar';

const Home = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-3 ">
        <Sidebar />
      </div>
      <div className="col-span-6 bg-red-400">
        <h1>jhjkgjhg</h1>
      </div>
      <div className="col-span-3 bg-green-400">
        <h2>jhgjhf</h2>
      </div>
    </div>
  );
}

export default Home