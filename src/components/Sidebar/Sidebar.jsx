import React, { useContext, useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { BsPersonFillAdd } from "react-icons/bs";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import {modalContext} from '../../context/ModalContext';
import Swal from 'sweetalert2';



export default function Sidebar() {
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode"));
  const { loginUserFn, token, setToken } = useContext(authContext);
  const { showModal , setShowModal ,setEditingNote ,editingNote } = useContext(modalContext);

  const navigate = useNavigate()
  
  


const logOutFn = ()=>{
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Log out!"
  }).then((result) => {
    if (result.isConfirmed) {
      
  setToken("");
  localStorage.removeItem("userToken")
  navigate("/login")

      Swal.fire({
        title: "You logged out",
        text: "Success => You logged out ",
        icon: "success"
      });
    }
  });



}

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", darkMode);
      console.log("classList.add-dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("darkMode", darkMode);
      console.log("classList.remove-dark");
    }
  }, [darkMode]);

  return (
    <>
      <div className="bg-yellow-500 w-20 dark:bg-gray-800 text-gray-900 dark:text-white h-screen fixed transition-all duration-300 border-r border-gray-300 dark:border-gray-700 -3xl bg-transparent ease-in-out flex flex-col justify-between">
        <div className="top-bar">
          <div className="bg-yellow-600 p-4 border-b border-gray-300 dark:border-gray-700">
            <div className="text-center text-base font-bold">Docket</div>
          </div>
          <nav className="mt-4 space-y-4 flex flex-col justify-around">
            <div className="relative">
              {token ? (
              <div className="relative ">
                  <button
                  // As a toggle setAction(!action)
                    onClick={() => setShowAddOptions(!showAddOptions)}
                    className="rounded-xl mx-auto block mt-5 mb-2 text-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                  >
                  <FaCirclePlus className={`text-3xl mx-auto transition-transform duration-300 ${showAddOptions ? 'rotate-45' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showAddOptions ? 'max-h-40 scale-100 opacity-100' : 'max-h-0 scale-95 opacity-0'}`}>
                    <button
                      onClick={() => {
                        setShowAddOptions(false);
                        setShowModal(true)
                        setEditingNote(null)
                      }}
                      className="mt-2 text-xs font-light font-sans block px-1.5 mx-auto text-center bg-gray-600 text-white py-2 rounded-md hover:bg-gray-500 transition-all"
                    >
                      New Note
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="group relative">
                    <Link
                      to={"/register"}
                      className="block py-3 px-4 w-full hover:bg-gray-300 dark:hover:bg-gray-700 text-center"
                    >
                      <BsPersonFillAdd className="text-2xl mx-auto" />
                      <span className="absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Register
                      </span>
                    </Link>
                  </div>
                  <div className="group relative">
                    <Link
                      to={"/login"}
                      className="block py-3 px-4 w-full hover:bg-gray-300 dark:hover:bg-gray-700 text-center"
                    >
                      <RiLoginCircleLine className="text-2xl mx-auto" />
                      <span className="absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Login
                      </span>
                    </Link>
                  </div>
                </>
              )}

            </div>
          </nav>
        </div>
        <div className="bottom-bar">
          <div className="group relative">
            {token && (
              <>
                <button onClick={()=>logOutFn()} className="block py-3 px-4 w-full mx-auto hover:bg-gray-300 dark:hover:bg-gray-700">
                  <TbLogout2 className="text-2xl mx-auto" />
                  <span className="absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Logout
                  </span>
                </button>
              </>
            )}
          </div>
          <div className="relative w-full border-t border-gray-300 dark:border-gray-700 space-y-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="block mx-auto my-4 p-2 bg-gray-300 dark:bg-gray-700 rounded-full"
            >
              {darkMode ? (
                <FaSun className="text-md" />
              ) : (
                <FaMoon className="text-md" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
