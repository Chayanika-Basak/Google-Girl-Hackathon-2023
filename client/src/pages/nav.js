import React from 'react'
import {CgProfile} from "react-icons/cg";
import {FaOpencart} from "react-icons/fa";
import {FaEarthAsia} from 'react-icons/fa6';

const Navbar = ({pageName}) => {
  
  const active = `border-b border-b-4 rounded-md border-b-teal-300 no-underline text-black text-lg px-1 py-2 hover:shadow-md`;
  const inactive = `no-underline text-black text-lg rounded-full p-2 hover:bg-teal-300 hover:text-white hover:shadow-md`;
  return (
    <div className='flex items-center justify-evenly p-6'>
        <div className='text-xl w-2/5 flex items-center'>
          {/* <img src="/images/logo.png" alt="logo" className='w-16'/> */}
          <div><FaEarthAsia className='text-teal-700 mr-3'/></div>
          <h1 className='font-inter font-semibold'>ClimaTact</h1>
        </div>
        <div className='flex items-center justify-evenly w-3/5'>
        <a href="/" className={pageName == "home" ? active: inactive}>Climate Change</a>
        <a href="/airPollution" className={pageName == "airPollution" ? active: inactive}>Air Quality</a>
        <a href="/waterPollution" className={pageName == "waterPollution" ? active: inactive}>Water Pollution</a>
        <a href="/deforestationRates" className={pageName == "deforestationRates" ? active: inactive}>Deforestation Rates</a>
        </div>
    </div>
  )
}

export default Navbar