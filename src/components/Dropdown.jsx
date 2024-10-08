import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { RxAvatar } from "react-icons/rx";
import imageprofile from '../../public/userprofile.png'
import { Link, useNavigate } from "react-router-dom";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({logged,setLogged}) {
  const navigate=useNavigate();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="  ">
          <img src={imageprofile} className=" h-8 w-8 rounded-full mt-2 mr-2 hover:scale-110 duration-300 " alt="" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-5 w-56 origin-top-right rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link to="/UserDashboard"
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 hover:text-yellow-400"
                        : "text-gray-700",
                      "block px-4 py-2 text-sm w-full text-left"
                    )}
                  >
                    Profile
                </Link>
              )}
            </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                
                    <button
                    onClick={()=>{
                      
                      setLogged(localStorage.removeItem('user'));
                      localStorage.removeItem('jwt')
                       navigate('/', {replace: true});
                     }}
                     
                      className={classNames(
                        active
                          ? "bg-gray-100 text-gray-900 hover:text-yellow-400"
                          : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm"
                      )}
                    >
                      Log Out
                    </button>
                 
                )}
              </Menu.Item>
        
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
