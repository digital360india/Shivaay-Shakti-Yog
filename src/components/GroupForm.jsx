import React, { useState } from "react";
import Popup from "reactjs-popup";
import AOS from "aos";
import { HiXMark } from "react-icons/hi2";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import img1 from "../../public/Program/Group/group_form_icon/1.png";
import img2 from "../../public/Program/Group/group_form_icon/2.png";
import img3 from "../../public/Program/Group/group_form_icon/3.png";
import img4 from "../../public/Course/payment.jpeg";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
AOS.init({
  duration: 1200,
});
function GroupForm({ toggle1, setToggle1, staticData, courseData, type }) {
  const navigate = useNavigate();
  const [purchasedData, setPurchasedData] = useState({
    user_id: JSON.parse(localStorage.getItem("user"))?._id,
    status: "active",
    duration: "",
    price: "",
    index: null,
    message: "",
    toggle2: false,
    toggle3: false,
    agree: false,
    preferred_timing: "",
    index1: null,
    link: "",
  });
  const addDays = (date, days) => {
    console.log(date, days);
    const result = new Date(date);
    result.setDate(result.getDate() + days - 1);
    return result.toISOString().split("T")[0];
  };
  function handle1() {
    if (localStorage.getItem("user")) {
      setPurchasedData({ ...purchasedData, message: "" });
      if (
        purchasedData.duration !== "" &&
        purchasedData.price !== "" &&
        purchasedData.preferred_timing !== ""
      ) {
        setPurchasedData({ ...purchasedData, toggle2: true, message: "" });
      } else {
        setPurchasedData({
          ...purchasedData,
          message: "* All Field Are Mandatory",
        });
      }
    } else {
      navigate("/login", { replace: true });
    }
  }
  function handle2() {
    if (localStorage.getItem("user")) {
      setPurchasedData({ ...purchasedData, message: "" });
      if (
        purchasedData.agree === true &&
        purchasedData.duration !== "" &&
        purchasedData.price !== "" &&
        purchasedData.preferred_timing !== ""
      ) {
        setPurchasedData({ ...purchasedData, toggle3: true, message: "" });
      } else {
        setPurchasedData({
          ...purchasedData,
          message: "* All Field Are Mandatory",
        });
      }
    } else {
      navigate("/login", { replace: true });
    }
  }

  async function handlesubmit() {
    console.log("inside handle submit");
    setPurchasedData({ ...purchasedData, message: "loading" });

    if (localStorage.getItem("user")) {
      console.log("ind=side local");
      console.log(purchasedData.duration);
      if (
        purchasedData?.transaction_id?.trim().length === 6 &&
        purchasedData.agree === true &&
        purchasedData.duration &&
        purchasedData.price !== "" &&
        purchasedData.preferred_timing !== ""
      ) {
        console.log(courseData?.group_starting_date);
        if (typeof purchasedData.duration === "string") {
          console.log("duration");
          const b = purchasedData.duration.split(" ");

          if (b[1] === "Month") {
            b[0] = parseInt(b[0]) * 30;
          }
          const expirationDate = addDays(
            courseData?.group_starting_date,
            parseInt(b[0])
          );

          try {
            console.log("inside try");

            if (courseData && purchasedData) {
              const response = await axios.post(
                "http://localhost:5000/api/purchase",
                {
                  name: JSON.parse(localStorage.getItem("user"))?.name,
                  user_id: purchasedData?.user_id,
                  preferred_timing: purchasedData?.preferred_timing,
                  duration: purchasedData?.duration,
                  status: purchasedData?.status,
                  price: purchasedData?.price,
                  transaction_id: purchasedData?.transaction_id,
                  transaction_status: "pending",
                  link: purchasedData?.link,
                  starting_date: courseData?.group_starting_date,
                  course_id: courseData?._id,
                  course_name: courseData?.name,
                  expiration_date: expirationDate,
                  course_type: type,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("jwt"),
                  },
                }
              );
              console.log("Response:", response);

              console.log("hello");

              if (response?.data?.success === true) {
                setToggle1(false);
                // setTimeout(() => {
                //   navigate("/UserDashboard", { replace: true });
                // }, 1);
              }
            } else {
              console.log("data is missing");
            }
          } catch (e) {
            console.log("Error:", e.response ? e.response.data : e.message);
            setToggle1(false);
          }
        } else {
          console.log("Duration is not a string or is missing");
        }
      } else {
        setPurchasedData({
          ...purchasedData,
          message: "* All Fields Are Mandatory",
        });
      }
    } else {
      navigate("/login", { replace: true });
    }
  }

  return (
    <>
      <Popup
        open={toggle1}
        position="center center"
        closeOnDocumentClick={false}
        lockScroll={true}
        contentStyle={{
          placeContent: "center",
          // backgroundImage:"url('https://cdn.discordapp.com/attachments/1111568797476868128/1113746626696204349/WhatsApp_Image_2023-06-01_at_11.16.50.jpg')",
          width: "95vw",
          backgroundColor: "#FFF1C1",
          height: "95vh",
          borderRadius: "10px",
        }}
      >
        <div className="  w-[100%] h-[100%] p-4 sm:p-6 md:p-10 lg:p-24   ">
          <div className=" relative w-[100%] h-[100%]">
            <div className="  flex justify-between   ">
              <h1 className=" text-2xl  lg:text-4xl heading">
                {courseData?.name} {courseData?.course_duration_days2} Days
                Course
              </h1>
              <div
                className="cursor-pointer   "
                title="close"
                onClick={() => {
                  setToggle1(false);
                }}
              >
                <HiXMark size={40} />
              </div>
            </div>
            <div className="flex flex-col lg:hidden mt-3   ">
              <div className="flex  gap-2 items-center ">
                <Stack spacing={1}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={4.5}
                    precision={0.5}
                    readOnly
                  />
                </Stack>
                <p className="text-sm  para  font-extrabold ">4.2</p>
              </div>
              <p className=" text-xs  para font-bold">based on 78 reviews</p>
            </div>
            <div className=" flex mt-6 lg:mt-8 gap-x-3 sm:gap-x-14 md:gap-x-20  lg:gap-x-36 gap-y-4 flex-wrap ">
              <div className=" flex gap-2 sm:gap-3 ">
                <p>
                  <img src={img3} className="mt-1" alt="" />
                </p>
                <div>
                  <p className=" text-[#283143] text-[16px] para  font-extrabold ">
                    Group Sessions
                  </p>
                  <p className=" heading text-xl lg:text-2xl  ">
                    {courseData && courseData.group_batch_size} yogis
                  </p>
                </div>
              </div>
              {/* <div className=' flex gap-3 '>
            
                <p><img src={img2} className='mt-1'  alt="" /></p>
                <div>
                    <p className=' text-[#283143] text-[16px] para  font-extrabold ' >{data?.group_timing}</p>
                    <p className=' heading text-xl lg:text-2xl  '>{data?.group_session}</p>
                </div>
             </div> */}
              <div className=" flex gap-2 sm:gap-3 ">
                <p>
                  <img src={img1} className="mt-1" alt="" />
                </p>
                <div>
                  <p className=" text-[#283143] text-[16px] para  font-extrabold ">
                    Starting
                  </p>
                  <p className=" heading text-xl lg:text-2xl  ">
                    {courseData?.group_starting_date}
                  </p>
                </div>
              </div>

              <div className="hidden lg:block ">
                <div className="lg:flex gap-2 ">
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                    />
                  </Stack>
                  <p className="text-xl para font-extrabold ">4.5</p>
                </div>
                <p className="  float-right para font-bold">
                  based on 78 reviews
                </p>
              </div>
            </div>

            <div className=" mt-6 sm:mt-14">
              <p
                className=" text-xl lg:text-2xl   heading "
                style={{ color: "#283143" }}
              >
                Select Time
              </p>
              <div className=" mt-4 flex flex-wrap gap-3 lg:gap-10">
                {courseData &&
                  courseData.group_timing &&
                  courseData.group_timing?.map((value, i) => (
                    <>
                      <div>
                        <button
                          onClick={() => {
                            setPurchasedData({
                              ...purchasedData,
                              preferred_timing: value?.times,
                              link: value?.link,
                              index1: i,
                            });
                          }}
                          className={` text-xs sm:text-[16px] ${
                            purchasedData.index1 === i ? "button3" : "button2"
                          }`}
                        >
                          {String(value?.times)}
                        </button>
                        <p
                          className=" text-center mt-2 para  font-semibold text-xl lg:text-2xl "
                          style={{ color: "#283143" }}
                        >
                          {" "}
                          {String(value?.session)}
                        </p>
                      </div>
                    </>
                  ))}
              </div>
              {/* <p className=' font-semibold mt-2 text-sm text-red-500'>{purchasedData.message}</p> */}
            </div>

            <div className=" mt-6 sm:mt-14">
              <p
                className=" text-xl lg:text-2xl   heading "
                style={{ color: "#283143" }}
              >
                Select Duration
              </p>
              <div className=" mt-4 flex flex-wrap gap-3 lg:gap-10">
                {
                  // data&&data.group_duration?.map
                  courseData &&
                    courseData.group_duration?.map((value, i) => (
                      <>
                        <div>
                          <button
                            onClick={() => {
                              setPurchasedData({
                                ...purchasedData,
                                duration: value?.timing,
                                price: value?.price,
                                index: i,
                              });
                            }}
                            className={` text-xs sm:text-[16px] ${
                              purchasedData.index === i ? "button3" : "button2"
                            }`}
                          >
                            {value?.timing}
                          </button>
                          <p
                            className=" text-center mt-2 para  font-semibold text-xl lg:text-2xl "
                            style={{ color: "#283143" }}
                          >
                            ₹ {value?.price}
                          </p>
                        </div>
                      </>
                    ))
                }
              </div>
              <p className=" font-semibold mt-2 text-sm text-red-500">
                {purchasedData.message}
              </p>
            </div>
            <button
              onClick={handle1}
              className="absolute bottom-10 sm:bottom-0 button3 right-4"
            >
              Proceed
            </button>
          </div>
        </div>
      </Popup>
      <Popup
        open={purchasedData.toggle2}
        // onClose={purchasedData.toggle2}
        position="center center"
        closeOnDocumentClick={false}
        lockScroll={true}
        contentStyle={{
          border: "none",
          display: "grid",
          placeContent: "center",
          //  backgroundImage:"url('https://cdn.discordapp.com/attachments/1111568797476868128/1113746626696204349/WhatsApp_Image_2023-06-01_at_11.16.50.jpg')",
          width: "90vw",
          backgroundColor: "#FFF1C1",
          height: "90vh",
          borderRadius: "10px",
        }}
      >
        <div className="w-[90vw] h-[90vh]    " data-aos="zoom-in">
          <div className=" w-[80vw] mx-auto h-[80vh] mt-10 overflow-y-auto scrollbar-hide ">
            <div className=" flex justify-between items-center ">
              <p className=" heading text-2xl sm:text-3xl md:text-6xl">
                Terms & Conditions
              </p>
              <div
                className="cursor-pointer text-3xl"
                title="close"
                onClick={() => {
                  setPurchasedData({ ...purchasedData, toggle2: false });
                }}
              >
                <HiXMark />
              </div>
            </div>
            <div
              className=" mt-8 flex flex-col  gap-8 text-justify text-[12px]  scrollbar-hide  sm:text-[14px] max-h-[400px] overflow-auto  md:text-[18px]  para "
              style={{ color: "#000" }}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure{" "}
              </p>
            </div>
            <div
              className="  mt-8 flex flex-col gap-y-7 sm:gap-0 sm:flex-row justify-between sm:items-center
            "
            >
              <div className=" flex gap-3 items-center ">
                <input
                  type="checkbox"
                  checked={purchasedData.agree}
                  onClick={() =>
                    setPurchasedData({
                      ...purchasedData,
                      agree: !purchasedData.agree,
                    })
                  }
                  name="agree"
                  id="agree"
                  className=" focus:accent-[#2C3E50] w-6 h-6 "
                />
                <label
                  className="para text-sm md:text-[18px]   font-semibold"
                  htmlFor="agree"
                  style={{ color: "black" }}
                >
                  I agree to the terms above
                </label>
                <p className="text-red-500">{purchasedData.message}</p>
              </div>
              <div className=" hidden md:flex ">
                <button
                  className=" button3 para text-xl font-semibold  "
                  onClick={handle2}
                  style={{ minWidth: "260px", height: "40px", color: "white" }}
                >
                  <span>Proceed To Checkout</span>
                </button>
              </div>
              <div className="md:hidden flex  self-end ">
                <button
                  onClick={handle2}
                  className=" button3 para text-[18px] font-semibold  "
                  style={{ minWidth: "260px", height: "40px", color: "white" }}
                >
                  <span>Proceed To Checkout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Popup>
      <Popup
        open={purchasedData.toggle3}
        // onClose={purchasedData.toggle3}
        position="center center"
        closeOnDocumentClick={false}
        lockScroll={true}
        contentStyle={{
          border: "none",
          display: "grid",
          placeContent: "center",
          //  backgroundImage:"url('https://cdn.discordapp.com/attachments/1111568797476868128/1113746626696204349/WhatsApp_Image_2023-06-01_at_11.16.50.jpg')",
          width: "90vw",
          backgroundColor: "#FFF1C1",
          height: "90vh",
          borderRadius: "10px",
        }}
      >
        <div className="w-[90vw] h-[90vh]    " data-aos="zoom-in">
          <div className=" w-[80vw] mx-auto h-[80vh] mt-10 overflow-y-auto scrollbar-hide ">
            <div className=" flex justify-between items-center ">
              <p className=" heading text-2xl sm:text-3xl md:text-6xl">
                Payment
              </p>
              <div
                className="cursor-pointer text-3xl"
                title="close"
                onClick={() => {
                  setPurchasedData({ ...purchasedData, toggle3: false });
                }}
              >
                <HiXMark />
              </div>
            </div>

            {/* Qr code */}
            <div className=" mt-8 flex flex-col h-[300px]  w-[300px]  gap-8 text-justify text-[12px] sm:text-[14px]  md:text-[18px]  para ">
              <img src={img4} className="w-[100%] h-[100%]" alt="" />
            </div>
            <div
              className="  mt-8 flex flex-col gap-y-7 sm:gap-0 lg:flex-row justify-between lg:items-center
            "
            >
              <div className=" flex flex-col gap-3">
                <label
                  className="para text-sm md:text-[18px]   font-semibold"
                  htmlFor="transaction_id"
                  style={{ color: "black" }}
                >
                  Enter Transaction Id
                </label>
                <input
                  placeholder="enter last 6 digit...."
                  type="text"
                  value={purchasedData.transaction_id}
                  onChange={(e) =>
                    setPurchasedData({
                      ...purchasedData,
                      transaction_id: e.target.value,
                    })
                  }
                  maxLength={6}
                  name="transaction_id"
                  id="transaction_id"
                  className=" p-2 text-black border border-gray-400 rounded-md w-full sm:w-[400px] h-[40px] "
                />

                <p className="text-red-500">{purchasedData.message}</p>
              </div>
              <div className=" hidden lg:flex ">
                <button
                  className=" button3 para text-xl font-semibold  "
                  onClick={handlesubmit}
                  style={{ minWidth: "260px", height: "40px", color: "white" }}
                >
                  <span>Submit</span>
                </button>
              </div>
              <div className="lg:hidden flex  self-end ">
                <button
                  onClick={handlesubmit}
                  className=" button3 para text-[18px] font-semibold  "
                  style={{ minWidth: "260px", height: "40px", color: "white" }}
                >
                  <span>Submit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
}
export default GroupForm;
