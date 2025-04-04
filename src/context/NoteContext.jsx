import axios from "axios";
import React, { createContext, useState } from "react";

export const noteContext = createContext();

export default function NoteContext({ children }) {

  const getUserNoteFn = async () => {
    try {
      const data = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`,

        { headers: { token: "3b8ny__" + localStorage.getItem("userToken") } }
      )
      console.log(data);
      return data
    }
    catch (error) {
      console.log(error)
      throw error
    }

  }

  const addNoteFn = async (values) => {
    try {
      const data = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`,
        values,
        { headers: { token: "3b8ny__" + localStorage.getItem("userToken") } }
      )
      console.log(data);
      return data
    }
    catch (error) {
      console.log(error)
      throw error
    }

  }

  const deleteNoteFn = async (notesId) => {
    try {
      const data = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${notesId}`,

        { headers: { token: "3b8ny__" + localStorage.getItem("userToken") } }
      )
      console.log(data);
      return data
    }
    catch (error) {
      console.log(error)
      throw error
    }

  }
  
  const updateNoteFn = async (notesId,values) => {
    try {
      const data = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${notesId}`,
        values,
        { headers: { token: "3b8ny__" + localStorage.getItem("userToken") } }
      )
      console.log(data);
      return data   
    }
    catch (error) {
      console.log(error)
      throw error
    }

  }



  return (
    <noteContext.Provider value={{ addNoteFn, getUserNoteFn ,deleteNoteFn , updateNoteFn }}>
      {children}
    </noteContext.Provider>
  );
}