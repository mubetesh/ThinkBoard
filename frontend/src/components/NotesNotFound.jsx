import { NotebookIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const NotesNotFound = () => {
  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-lg shadow'>
        <div className='flex flex-col items-center'>
            <div>
                <NotebookIcon className='size-20 text-center mx-auto mt-10 text-gray-400'/>
            </div>
            <h2 className='text-center text-2xl font-bold mt-10'>No Notes Found</h2>
            <p className='text-center text-lg mt-4'>You have not created any notes yet. Start by creating a new note!</p>
            <Link to="/create" className='mt-6 btn btn-primary'>Create Note</Link>
        </div>
    </div>
  )
}

export default NotesNotFound