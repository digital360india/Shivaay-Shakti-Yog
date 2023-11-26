import React, { useEffect,useState } from 'react'
import HeroNavbar from '../components/HeroNavbar'
import Profile from '../components/Profile'
import Ongoing from '../components/Ongoing'
import Stats from '../components/Stats'
import Card1 from '../components/Card1'
import Card3 from '../components/Card3'
import helping from "../../public/helping1.png";
import axios from 'axios'

const UserDashboard = () => {
  const [data,setData]=useState([]);
   async function getdata()
   {
    try{
  const response=await axios.get('http://localhost:5000/api/course');
  setData(response?.data?.data);
  console.log(response?.data?.data)
    }
    catch(e)
    {
console.log(e);
    }
   }
  useEffect(()=>{
    getdata();
  },[])
  return (
    <>
    <div className="  ">
        <div className=" relative z-10 px-1 lg:px-10  ">
          <HeroNavbar/>
        </div>

        <section className='w-[90vw] mx-auto mt-10 md:mt-6 lg:mt-0 stats'>
        <Profile/>
        </section>
  
  <section className='w-[90vw] mt-11  mx-auto  '>
    <Ongoing/>
  </section>

 <section className=' mt-20 w-[90vw] mx-auto '>
  <Stats/>
 </section>

 <section className=' mt-20 w-[90vw]  mb-10 mx-auto lg:px-20 '>
 <p className=' para text-xl lg:text-3xl'>Add Courses</p>
 <section className=' hidden sm:flex box  p-1   gap-7 sm:gap-24 mt-6  scrollbar-hide   overflow-scroll '>
  {data.map((value)=>
  
            <Card1 value={value} />
  )}
        </section>
        <section className=' sm:hidden box    flex gap-3 sm:gap-10 mt-6   flex-wrap  '>
        {data.map((value)=>
        <Card3 img={value?.main_url} data={value} type={2} />
        )}
        
           </section>
 </section>

      </div>

    </>
  )
}

export default UserDashboard
