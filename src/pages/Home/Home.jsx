import React, { useContext, useEffect, useState } from 'react';
import { BsTrash3 } from 'react-icons/bs';
import { GrEdit } from 'react-icons/gr';
import { FaPenClip } from 'react-icons/fa6';
import Modal from '../../components/Modal/Modal';
import { modalContext } from '../../context/ModalContext';
import { noteContext } from '../../context/NoteContext';

export default function Home() {
  const { showModal, setShowModal, setEditingNote, editingNote } = useContext(modalContext);
  const { getUserNoteFn, deleteNoteFn, updateNoteFn } = useContext(noteContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getUserNoteFn();
      // Ensure we always have an array, even if data.notes is undefined
      setNotes(Array.isArray(data?.notes) ? data.notes : []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      // setError('No notes have been created yet.');
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNoteFn(noteId);
      // Optimistically update the UI
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
      setError('Failed to delete note. Please try again.');
    }
  };

  const handleEditingNote = (note) => {
    setShowModal(true);
    setEditingNote(note);
  };

  useEffect(() => {
    getUserNotes();
  }, []);

  if (loading) {
    return (
      <div className="p-10">
        <h1 className="text-3xl pt-2 font-bold mb-10 dark:text-black-100 text-blue-800">
          My Notes
        </h1>
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="p-10">
        <h1 className="text-3xl pt-2 font-bold mb-10 dark:text-black-100 text-blue-800">
          My Notes
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
            <button 
              onClick={() => setError(null)} 
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        {notes.length === 0 ? (
          <div className="m-auto text-center mt-16 p-16 bg-opacity-45 w-full max-w-2xl bg-white rounded-2xl shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700">
            <FaPenClip className="mx-auto text-5xl text-stone-700 dark:text-gray-300" />
            <span className="m-auto block mt-10 text-4xl font-serif text-gray-800 dark:text-gray-200">
              No notes have been created yet.
            </span>
            <button
              onClick={() => setShowModal(true)}
              className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Note
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="w-full h-64 flex flex-col justify-between bg-gray-300 dark:bg-gray-700 dark:border-gray-700 rounded-lg border border-gray-300 mb-6 py-5 px-4"
              >
                <div>
                  <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">
                    {note.title}
                  </h4>
                  <p className="text-gray-800 dark:text-gray-100 text-sm">
                    {note.content}
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
                    <button
                      onClick={() => handleDeleteNote(note._id)}
                      className="w-8 h-8 rounded-full bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-gray-300 focus:ring-black"
                    >
                      <BsTrash3 />
                    </button>
                    <button
                      onClick={() => handleEditingNote(note)}
                      className="w-8 h-8 rounded-full bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-gray-300 focus:ring-black"
                    >
                      <GrEdit />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      {showModal && <Modal getUserNotes={getUserNotes} editingNote={editingNote} />}
    </>
  );
}