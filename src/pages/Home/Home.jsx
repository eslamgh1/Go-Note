import React, { useContext, useEffect, useState } from 'react'
import { BsTrash3 } from 'react-icons/bs';
import { GrEdit } from 'react-icons/gr';
import Modal from '../../components/Modal/Modal';
import { modalContext } from '../../context/ModalContext';
import NoteContext, { noteContext } from '../../context/NoteContext';
import { data } from 'autoprefixer';


export default function Home() {
  const { showModal, setShowModal,setEditingNote ,editingNote } = useContext(modalContext);
  const { getUserNoteFn , deleteNoteFn , updateNoteFn } = useContext(noteContext);
  const [notes, setNotes] = useState([])


  const handleEditingNote = (note)=>{
    setShowModal(true);
    setEditingNote(note)

  }

  const getUserNotes = async () => {
    try {
      const { data } = await getUserNoteFn()
      console.log(data);
      setNotes(data.notes)
    }
    catch (error) {
      console.log(error);
    }
  }

  const deleteNote = async (noteId) => {
    try {
      const { data } = await deleteNoteFn(noteId)
      console.log(data);
      getUserNotes();
      
    }
    catch (error) {
      console.log(error);
    }
  }


  const updateNote = async (values,noteId) => {
    try {
      const { data } = await deleteNoteFn(values,noteId)
      console.log(data);
      getUserNotes();
      
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserNotes();

  }, [])



  return (
    <>
      <section className='p-10 bg-amber-200'>
        <h1 className='text-3xl pt-2 font-bold mb-10 dark:text-black-100'>My Notes</h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-amber-200">
          {notes?.map((note) => {
            return <div key={note._id} className="w-full h-64 flex flex-col justify-between bg-gray-300 dark:bg-gray-700 dark:border-gray-700 rounded-lg border border-gray-300 mb-6 py-5 px-4">
              <div>
                <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">{note.title}</h4>
                <p className="text-gray-800 dark:text-gray-100 text-sm">{note.content}</p>
              </div>
              <div>
                <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
                  <button onClick={()=>deleteNote(note._id)} className="w-8 h-8 rounded-full bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-gray-300 focus:ring-black" >
                    <BsTrash3 />
                  </button>
                  <button onClick={()=>handleEditingNote(note)} className="w-8 h-8 rounded-full bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-gray-300 focus:ring-black" >
                    <GrEdit />
                  </button>
                </div>
              </div>
            </div>
          })}

        </div>
      </section >
      {showModal && <Modal getUserNotes={getUserNotes}  editingNote={editingNote} />}
    </>
  )
}































// <div className='m-auto text-center mt-16 p-16 bg-opacity-45 w-full max-w-2xl bg-white rounded-2xl shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700'>
// <FaPenClip className='mx-auto text-5xl text-stone-700 dark:text-gray-300' />
// <span className='m-auto block mt-10 text-4xl font-serif text-gray-800 dark:text-gray-200'>
//     No notes have been created yet.
// </span>
// </div> 
