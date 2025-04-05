import React, { useEffect, useState } from 'react'
import error from "../../assets/error.png";
import { useNavigate } from 'react-router-dom'


export default function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "NotFound";
  }, []);
  
  setTimeout(() => {
    navigate("../login")
  }, 1500);

  
  
  return <>
  
      <div className="container mx-auto py-4">
        <div className="text-red-600 text-xl text-center font-bold grid grid-cols-1">
          Not Found page 
            <div
              className=" pt-44 cursor-pointer rounded-sm border border-green-100 shadow-xl hover:shadow-green-500 hover:transition-all hover:duration-300"
            >
              <img
                src={error}
                alt={error}
                className="w-full"
              />
            </div>  
        </div>
      </div>

  </>
}

