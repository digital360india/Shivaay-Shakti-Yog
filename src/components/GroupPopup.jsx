import { HiXMark } from "react-icons/hi2";
import Popup from "reactjs-popup";
import { FaCalendarDays } from "react-icons/fa6";
import Stats from "./Stats";
function GroupPopup({ toggle, setToggle, data }) {
  return (
    <>
      <Popup
        open={toggle}
        // onClose={toggle}
        position="center center"
        closeOnDocumentClick={false}
        lockScroll={true}
        contentStyle={{
          border: "none",
          display: "grid",
          placeContent: "center",
          backgroundColor: "#E6F5FA",
          width: "90vw",
          height: "90vh",
          borderRadius: "10px",
        }}
      >
        <div className="w-[90vw] h-[90vh]    " data-aos="zoom-in">
          <div className=" w-[80vw] mx-auto h-[80vh] mt-10 overflow-y-auto scrollbar-hide ">
            <div className=" flex flex-col lg:flex-row justify-between items-start gap-y-6 lg:items-center ">
              <p className=" heading text-2xl sm:text-3xl md:text-6xl">
                {data?.course_name} Course
              </p>
              <div className=" pr-6 sm:pr-20 md:pr-32 ">
                {data?.status === "active" && (
                  <a
                    href={data?.link}
                    target="_blank"
                    className="button3  "
                    style={{ minWidth: "120px" }}
                  >
                    <span>Join class</span>
                  </a>
                )}
              </div>
              <div
                className="cursor-pointer absolute  top-5 right-5 sm:right-10 md:block text-3xl"
                title="close"
                onClick={() => {
                  setToggle(false);
                }}
              >
                <HiXMark />
              </div>
            </div>
            <p className=" para sm:text-2xl mt-5 pl-3 ">
              Group Course{" "}
              <span className=" heading ml-6 sm:ml-16 ">
                ({data?.preferred_timing})
              </span>
            </p>
            <Stats data={data} />

            <p className=" para sm:text-2xl mt-5 pl-3 ">
              Starting Date
              <span className=" heading  ml-6 sm:ml-16 ">
                {data?.starting_date}
              </span>
            </p>
            <p className=" para sm:text-2xl mt-5 pl-3 ">
              Ending Date{" "}
              <span className=" heading  ml-6 sm:ml-16 ">
                {data?.expiration_date}
              </span>
            </p>
          </div>
        </div>
      </Popup>
    </>
  );
}

export default GroupPopup;
