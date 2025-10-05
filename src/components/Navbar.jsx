/*
import React from 'react'
import { HiSun } from 'react-icons/hi'
import { FaUser } from 'react-icons/fa'
import { RiSettings3Fill } from 'react-icons/ri'

const Navbar = () => {
  return (
    <>
      <div className="nav flex items-center justify-between px-[100px] h-[90px] border-b-[1px] border-gray-800">
        <div className="logo">
          <h3 className="text-[25px] font-[700] sp-text">GenUI</h3>
        </div>
        <div className="icons flex items-center gap-[15px]">
          <div className="icon">
            <HiSun />
          </div>
          <div className="icon">
            <FaUser />
          </div>
          <div className="icon">
            <RiSettings3Fill />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar*/

import React from 'react'
import { HiSun } from 'react-icons/hi'
import { FaUser } from 'react-icons/fa'
import { RiSettings3Fill } from 'react-icons/ri'

const Navbar = () => {
  return (
    <>
      <div className="nav flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-[100px] h-[70px] sm:h-[80px] md:h-[90px] border-b border-gray-800 bg-[#141319] sticky top-0 z-50">
        {/* Logo */}
        <div className="logo flex items-center gap-2">
          <h3 className="text-[20px] sm:text-[22px] md:text-[25px] font-bold text-white">
            Gen<span className="text-purple-400">UI</span>
          </h3>
        </div>

        {/* Icons */}
        <div className="icons flex items-center gap-3 sm:gap-4 md:gap-5 text-[18px] sm:text-[20px] text-gray-300">
          <button
            className="p-2 rounded-lg hover:bg-[#2a2a2a] transition-all"
            title="Toggle Theme"
          >
            <HiSun />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-[#2a2a2a] transition-all"
            title="User Profile"
          >
            <FaUser />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-[#2a2a2a] transition-all"
            title="Settings"
          >
            <RiSettings3Fill />
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar
