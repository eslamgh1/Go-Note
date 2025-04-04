import React, { useContext, useEffect } from 'react';
import { IoIosClose } from "react-icons/io";
import {modalContext} from '../../context/ModalContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js';
import { z } from "zod";
import NoteContext, { noteContext } from '../../context/NoteContext';



export default function Modal({getUserNotes , editingNote }) {

const { showModal , setShowModal } = useContext(modalContext);
const { addNoteFn ,updateNoteFn } = useContext(noteContext);

const schema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
  })

const {register , handleSubmit , formState:{errors , isSubmitting} , setValue} = useForm({mode:"all",  resolver: zodResolver(schema)});

const  addNote = async (values)=>{
  try{

    if (editingNote){
      const {data} = await updateNoteFn(editingNote._id,values)
      console.log(data);

    }else {
      const {data} = await addNoteFn(values)
      console.log(data);
    }
    
    setShowModal(false);
    getUserNotes();
    
    
  }
  catch(error){
    console.log(error);
  }
}





useEffect(() => {
if(editingNote){
  setValue("title" ,editingNote.title)
  setValue("content" ,editingNote.content)
  
}
}, [])


    return (
        <>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="flex fixed z-50 bg-black/50 ml-20 inset-0 items-center justify-center">
                <div className="p-4 w-full max-w-xl max-h-full">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-xl overflow-hidden">
                        <div className="flex justify-between items-center px-6 py-4">
                            <h2 className="text-xl font-semibold text-black dark:text-white">
                                {editingNote ? "Edit Note": "New Note"}
                            </h2>
                            <button onClick={ ()=>{setShowModal(false)}} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <IoIosClose className='text-3xl' />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(addNote)} className="bg-gray-50 dark:bg-gray-700 flex flex-col gap-3">
                            <div className='border-y-2 dark:border-gray-600 p-4'>
                                <input type="title" {...register("title")} className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-xl font-medium rounded-lg block outline-none w-full p-2.5 placeholder-gray-500 dark:placeholder-gray-400" required placeholder="Note Title" />
                                {errors.title && <div className='text-red-500 m-2'> {errors.title.message}</div>}

                                <textarea rows="4" {...register("content")} className="bg-gray-50 dark:bg-gray-700 outline-none resize-none block p-2.5 w-full text-base text-gray-900 dark:text-white rounded-lg placeholder-gray-500 dark:placeholder-gray-400" placeholder="Write your thoughts here..." />
                                {errors.content && <div className='text-red-500 m-2'> {errors.content.message}</div>}

                            </div>
                            <div type="submit" className="px-6 py-3 flex justify-end gap-3">
                                <button className="px-4 py-2 text-black dark:text-white rounded-lg border dark:border-gray-600 text-sm font-sans hover:bg-gray-100 dark:hover:bg-gray-600">
                                {isSubmitting ? <div className='w-6 h-6 border-b-2 rounded-full animate-spin mx-auto'></div> : editingNote ? "Update Note": "Add Note" } 

                                    
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}