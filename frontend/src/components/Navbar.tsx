import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='w-full h-20 bg-black pl-40 pr-40 pt-10 pb-5 flex items-center justify-between'>
        <p className='text-white text-xl'>Grantitude</p>
        <div><Link to={"/login"}><button className="p-[3px] relative">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-900 rounded-lg" />
  <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
    Login
  </div>
</button></Link></div>
        
    </div>
  )
}

export default Navbar