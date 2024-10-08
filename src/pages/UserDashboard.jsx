import React, { useEffect, useState } from "react";
import HeroNavbar from "../components/HeroNavbar";
import Profile from "../components/Profile";
import Ongoing from "../components/Ongoing";
import Card1 from "../components/Card1";
import Card3 from "../components/Card3";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UserDashboard = () => {
  const { pathname } = useLocation();
  const [data, setData] = useState({
    datas: [],
    PurchasedCourse: [],
    completed: 0,
    active: 0,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  async function prof() {
    try {
      const response = await axios.get(
        `https://shivaay-shakti-backend-vm3k.onrender.com/api/purchase/${
          JSON.parse(localStorage.getItem("user"))?._id
        }/c`,
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      );
      console.log(response?.data?.data);
      if (Array.isArray(response?.data?.data)) {
        var a = response?.data?.data.filter(
          (v) => v?.status === "active" && v?.transaction_status === "completed"
        ).length;
        var b = response?.data?.data.filter(
          (v) =>
            v?.status === "expired" && v?.transaction_status === "completed"
        ).length;
      }
      setData((prevData) => ({
        ...prevData,
        PurchasedCourse: response?.data?.data,
        completed: b,
        active: a,
      }));
    } catch (e) {
      console.log(e);
    }
  }

  async function getdata() {
    try {
      const response = await axios.get("https://shivaay-shakti-backend-vm3k.onrender.com/api/course/");
      // console.log(response?.data)
      if (Array.isArray(response.data.data)) {
        setData((prevData) => ({ ...prevData, datas: response.data.data }));
      } else {
        console.error("Expected an array in response.data.data");
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    prof();
    getdata();
  }, []);
  return (
    <>
      <div className=" overflow-x-hidden  ">
        <div className=" relative z-10   ">
          <HeroNavbar />
        </div>

        <section className="w-[90vw] mt-2 md:mt-16 lg:mt-20   sm:mt-14  hi mx-auto  stats">
          <Profile completed={data.completed} active={data.active} />
        </section>

        <section className="w-[90vw] mt-11  mx-auto  ">
          <Ongoing data={data.PurchasedCourse} />
        </section>

        {/* <section className=' mt-20 w-[90vw] mx-auto '>
  <Stats/>
 </section> */}

        <section className=" mt-20 w-[90vw]  mb-10 mx-auto lg:px-20 ">
          <p className=" para text-xl lg:text-3xl">Add Courses</p>
          <section className=" flex box  p-1   gap-7 sm:gap-24 mt-6 flex-wrap   ">
            {data?.datas.map((value) => (
              <Card1 value={value} />
            ))}
          </section>
          {/* <section className=' sm:hidden box    flex gap-3 sm:gap-10 mt-6   flex-wrap  '>
        {data?.datas.map((value)=>
        <Card3 img={value?.main_url} data={value} type={2} />
        )}
        
           </section> */}
        </section>
      </div>
    </>
  );
};

export default UserDashboard;
