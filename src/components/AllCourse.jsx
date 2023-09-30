import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
function UpcomingCourse() {
 
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const [GroupSession, setGroupSession] = React.useState([]);
  const [upcoming, setUpcoming] = React.useState([]);
  const [PersonalSession, setPersonalSession] = React.useState([]);
  const [count, setCount] = React.useState(null);
  const [input, setInput] = React.useState("");


  if (GroupSession.length > 1) {
    var FilterData = GroupSession;
    console.log("Filter data Set", FilterData);
  }


  useEffect(() => {
    axios
      .get(`https://shivayshaktibackend.onrender.com/course`)

      .then((response) => {
        setGroupSession(response.data.filter((datas)=>datas.status!=="Upcoming"));
        setUpcoming(response.data.filter((datas)=>datas.status==="Upcoming"));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://shivayshaktibackend.onrender.com/course1`)

      .then((response) => {
        setPersonalSession(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  

  return (
    <>
        <div className="bgCat">
          <section className="text-gray-600 body-font bghero1 h-[450px] ">
            <div className=" py-32 sm:py-48">
              <p className=" text-white mb-5 text-4xl">Our Courses</p>
              <div className="">
                <p className=" text-white mb-5 text-3xl">Experience the benefits of yoga from the comfort of your home!</p>
              </div>
              {/* <div className="cat flex justify-center">
                <div>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-l-xl "
                  >
                    <option select="true">Programme</option>
                    <option defaultValue="US"> General Fitness</option>
                    <option defaultValue="CA">Weight Management</option>
                    <option defaultValue="FR">Mental Wellness</option>
                    <option defaultValue="DE">Medical Conditions</option>
                    <option defaultValue="FR">Flexibility</option>
                    <option defaultValue="DE">Spirituality</option>
                  </select>
                </div>
                <div>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option select="true">Type</option>
                    <option defaultValue="US">Personal Training Sessions</option>
                    <option defaultValue="CA">Group Sessions</option>
                  </select>
                </div>
                <div>
                  <div
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  rounded-r-xl "
                  >
                    <AiOutlineSearch size={19.5} />
                  </div>
                </div>
              </div> */}
            </div>
          </section>
        </div>

        {/* Search  Component */}

        <div className=" items-center text-center justify-around py-10  lg:flex">
          <div className=" flex items-center justify-center ">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block lg:w-[53em] w-72 pl-10 p-2.5"
                  placeholder="Search"
                  required
                />
              </div>
            </form>
          </div>
          <div className="">
            <h1 className="text-2xl mt-5 lg:text-lg">
              {GroupSession.length + PersonalSession.length} Results Page 1 of 1
            </h1>
          </div>
        </div>



        <div className="flex justify-center font-bold text-3xl">
          <h1>Upcoming Courses</h1>
        </div>

        <section className=" body-font ">
          <div className="container  py-5  rounded-2xl mx-auto  px-10 ">
            <div className="flex flex-wrap justify-center  gap-x-4">
              {upcoming.filter((item) => {
                return input.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(input);
              }).map((item, index) => {
                return (
                  <Link to={`/category/group-session/${item._id}`}>
                    {item.batchSize !== undefined ? (
                      <div className="flex items-center mt-5 hover:-translate-y-1  hover:scale-105 duration-300 drop-shadow-2xl mb-6">
                        <div className="sm:h-[420px] h-[380px]  w-[320px] sm:w-[280px] border-2 border-gray-200 border-opacity-60 rounded-3xl overflow-hidden ">
                          <div className=" flex-col flex items-center justify-center rounded-t-2xl ">
                            <img
                              className="rounded-b-none w-36 relative mt-2 h-10  ml-[125px]   "
                              src={
                                item.status == "Active"
                                  ? "https://res.cloudinary.com/dpzhezt6x/image/upload/v1683020867/Active_m87aku.png"
                                  : item.status == "Completed"
                                  ? "https://res.cloudinary.com/dpzhezt6x/image/upload/v1683020867/Completed_skxuge.png"
                                  : item.status == "Upcoming"
                                  ? "https://res.cloudinary.com/dpzhezt6x/image/upload/v1683020867/Upcoming_ghbhm7.png"
                                  : "https://res.cloudinary.com/dpzhezt6x/image/upload/v1683020916/Available_csztxa.png"
                              }
                            />

                            <img
                              className=" object-cover object-center -mt-14 w-full h-48"
                              src={item.image}
                              alt="blog"
                            />
                          </div>

                          <div className="p-2">
                            <h1 className="title-font text-lg font-medium text-yellow-500 mb-1">
                              {item.name}
                            </h1>
                            <p className="leading-relaxed mb-1">
                              Group Courses
                            </p>

                            {item?.batchSize !== undefined ? (
                              <p className="leading-relaxed text-xs">
                                Batch Size :{item.batchSize}
                              </p>
                            ) : null}

                            <p className="leading-relaxed text-xs">
                              Duration: {item.duration} Days
                            </p>

                            <p className="leading-relaxed text-xs">
                              Start Date: {item?.startDate?.slice(0, 10)}
                            </p>

                            <p className="leading-relaxed text-xs">
                              Price :{item.price}
                            </p>
                            {console.log("item id ", item._id)}
                          </div>
                          <div className="btn text-center lg:flex hidden lg:text-center items-center justify-center ">
                            <Link to={`/category/group-session/${item._id}`}>
                              <button
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2  dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                data={item._id}
                              >
                                View Details
                              </button>
                            </Link>
                            {/* <button className="text-white bg-gray-900 border hover:text-gray-900 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                          Book Now
                        </button> */}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </Link>
                );
              })}

              <span className="  w-[320px] lg:w-[280px] "></span>
              <span className="  w-[320px] lg:w-[280px] "></span>
              <span className=" w-[320px] lg:w-[280px] "></span>
            </div>
          </div>
        </section>
        <div className="flex justify-center font-bold text-3xl ">
          <h1>Personal Training Courses</h1>
          {count}
        </div>

        <section className=" body-font ">
          <div className="container  py-5  rounded-2xl mx-auto  px-10 ">
            <div className="flex flex-wrap justify-center  gap-x-4">
              {PersonalSession.filter((item) => {
                return input.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(input);
              }).map((item, index) => {
                // setCount("")
                return (
                  <Link to={`/category/personal-training-session/${item._id}`}>
                    {item.batchSize === undefined ? (
                      <div className="flex items-center mt-5 hover:-translate-y-1  hover:scale-105  duration-300 drop-shadow-2xl mb-6">
                        <div className="sm:h-[420px] h-[380px]  w-[320px] sm:w-[280px] border-2 border-gray-200 border-opacity-60 rounded-3xl overflow-hidden ">
                          <div className=" flex-col flex items-center justify-center rounded-t-2xl ">
                            <img
                              className="rounded-b-none w-36 relative mt-2 h-10  ml-[125px]   "
                              src={
                                item.status == "Active"
                                  ? "https://res.cloudinary.com/dpzhezt6x/image/upload/v1683020867/Active_m87aku.png"
                                  : item.status == "Completed"
                                  ? "https://res.cloudinary.com/dpzhezt6x/image/upload/v1683020867/Completed_skxuge.png"
                                  : item.status == "Upcoming"
                                  ? "https://res.cloudinary.com/dpzhezt6x/image/upload/v1683020867/Upcoming_ghbhm7.png"
                                  : "https://res.cloudinary.com/dpzhezt6x/image/upload/v1683020916/Available_csztxa.png"
                              }
                            />

                            <img
                              className=" object-cover object-center -mt-14 w-full"
                              src={item.image}
                              alt="blog"
                            />
                          </div>
                          <div className="p-2">
                            <h1 className="title-font text-lg font-medium text-yellow-500 mb-1">
                              {item.name}
                            </h1>
                            <p className="leading-relaxed mb-1">
                              {" "}
                              Personal Training Courses
                            </p>

                            <p className="leading-relaxed text-xs">
                              Sessions : {item.liveClasses} Days
                            </p>

                            <p className="leading-relaxed text-xs">
                              Duration: {item.duration} Days
                            </p>
                            <p className="leading-relaxed text-xs">
                              Difficulty : {item.difficulty} Days
                            </p>

                            <p className="leading-relaxed text-xs">
                              Price :{item.priceI}
                            </p>
                            {/* {console.log("item id ", item._id)} */}
                          </div>
                          <div className="btn text-center lg:flex hidden lg:text-center items-center justify-center  ">
                            <Link
                              to={`/category/personal-training-session/${item._id}`}
                            >
                              <button
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2  dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                data={item._id}
                              >
                                View Details
                              </button>
                            </Link>
                            {/* <button className="text-white bg-gray-900 border hover:text-gray-900 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                          Book Now
                        </button> */}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </Link>
                );
              })}

              <span className="  w-[320px] lg:w-[280px] "></span>
              <span className="   w-[320px] lg:w-[280px] "></span>
              <span className="   w-[320px] lg:w-[280px] "></span>
            </div>
          </div>
        </section>






        {/*         
        <h1>Group Sessions</h1> */}





        <div className="flex justify-center font-bold text-3xl">
          <h1>Group Courses</h1>
        </div>

        <section className=" body-font ">
          <div className="container  py-5  rounded-2xl mx-auto  px-10 ">
            <div className="flex flex-wrap justify-center  gap-x-4">
              {GroupSession.filter((item) => {
                return input.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(input);
              }).map((item, index) => {
                return (
                  <Link to={`/category/group-session/${item._id}`}>
                    {item.batchSize !== undefined ? (
                      <div className="flex items-center mt-5 hover:-translate-y-1  hover:scale-105 duration-300 drop-shadow-2xl mb-6">
                        <div className="sm:h-[420px] h-[380px]  w-[320px] sm:w-[280px] border-2 border-gray-200 border-opacity-60 rounded-3xl overflow-hidden ">
                          <div className=" flex-col flex items-center justify-center rounded-t-2xl ">
                            <img
                              className="rounded-b-none w-36 relative mt-2 h-10  ml-[125px]   "
                              src={
                                item.status == "Active"
                                  ? "https://res.cloudinary.com/dpzhezt6x/image/upload/v1683020867/Active_m87aku.png"
                                  : item.status == "Completed"
                                  ? "https://res.cloudinary.com/dpzhezt6x/image/upload/v1683020867/Completed_skxuge.png"
                                  : item.status == "Upcoming"
                                  ? "https://res.cloudinary.com/dpzhezt6x/image/upload/v1683020867/Upcoming_ghbhm7.png"
                                  : "https://res.cloudinary.com/dpzhezt6x/image/upload/v1683020916/Available_csztxa.png"
                              }
                            />

                            <img
                              className=" object-cover object-center -mt-14 w-full h-48"
                              src={item.image}
                              alt="blog"
                            />
                          </div>

                          <div className="p-2">
                            <h1 className="title-font text-lg font-medium text-yellow-500 mb-1">
                              {item.name}
                            </h1>
                            <p className="leading-relaxed mb-1">
                              Group Courses
                            </p>

                            {item?.batchSize !== undefined ? (
                              <p className="leading-relaxed text-xs">
                                Batch Size :{item.batchSize}
                              </p>
                            ) : null}

                            <p className="leading-relaxed text-xs">
                              Duration: {item.duration} Days
                            </p>

                            <p className="leading-relaxed text-xs">
                              Start Date: {item?.startDate?.slice(0, 10)}
                            </p>

                            <p className="leading-relaxed text-xs">
                              Price :{item.price}
                            </p>
                            {console.log("item id ", item._id)}
                          </div>
                          <div className="btn text-center lg:flex hidden lg:text-center items-center justify-center ">
                            <Link to={`/category/group-session/${item._id}`}>
                              <button
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2  dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                data={item._id}
                              >
                                View Details
                              </button>
                            </Link>
                            {/* <button className="text-white bg-gray-900 border hover:text-gray-900 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                          Book Now
                        </button> */}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </Link>
                );
              })}

              <span className="  w-[320px] lg:w-[280px] "></span>
              <span className="  w-[320px] lg:w-[280px] "></span>
              <span className=" w-[320px] lg:w-[280px] "></span>
            </div>
          </div>
        </section>


        
    </>
  )
}

export default UpcomingCourse
