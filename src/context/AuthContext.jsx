import axios from "axios";
import React, { createContext, useState } from "react";

export const authContext = createContext();

//AuthProvider : you can rename it any : AuthContext

export default function Authcontext({ children }) {

  const [token, setToken] = useState(localStorage.getItem("userToken") || "")

  const registerUserFn = async (values) => {
    try {
      const data = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
        values
      );
      console.log(data);
      return data;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  };

  const loginUserFn = async (values) => {
    try {
      const data = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
        values
      );
      console.log(data);
      setToken(data.data.token)
      localStorage.setItem("userToken",data.data.token)
      return data;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  };




  return (
    <authContext.Provider value={{ registerUserFn ,  loginUserFn , setToken ,token}}>
      {children}
    </authContext.Provider>
  );
}