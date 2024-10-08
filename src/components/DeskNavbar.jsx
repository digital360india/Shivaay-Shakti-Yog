import React, { useState } from "react";
import logo from "../../public/shi_logo.png";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "./Dropdown";
import Consultation from "./Consultation";

const DeskNavbar = () => {
  const { pathname } = useLocation();
  const [logged, setLogged] = useState(localStorage.getItem("user"));
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleOpen = () => {
    setIsConsultationOpen(true);
  };

  const handleClose = () => {
    setIsConsultationOpen(false);
  };

  return (
    <>
      <div
        className={`hidden bg-[#faf7e6] ${
          pathname === "/UserDashboard" ? "normal" : "fixed"
        } w-[100vw] h-[70px] z-50 lg:flex justify-between md:px-12 sm:px-4 text-center items-center`}
      >
        <div>
          <Link to="/">
            <img className="w-[340px]" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex sm:gap-x-4 md:gap-x-12 items-center">
          <Link to="/">
            <span>Home</span>
          </Link>
          <Link to="/Courses">
            <span>Courses</span>
          </Link>
          <Link to="/about-us">
            <span>About Us</span>
          </Link>
          <button className="text-black  border-b-4 border-[#ffba42]" onClick={handleOpen}>
            Book a Demo Class
          </button>

          {!logged ? (
            <div className="flex gap-4">
              <Link to="/login" className="button3">
                <span>Login</span>
              </Link>
              <Link to="/Signup" className="button2">
                <span>Sign Up</span>
              </Link>
            </div>
          ) : (
            <div className="items-center hover:text-yellow-400 cursor-pointer">
              <div className="pr-2">
                <Dropdown logged={logged} setLogged={setLogged}></Dropdown>
              </div>
            </div>
          )}
        </div>
      </div>

      {isConsultationOpen && <Consultation setClose={handleClose} />}
    </>
  );
};

export default DeskNavbar;
