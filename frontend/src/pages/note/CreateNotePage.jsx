import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../lib/axios';
import { useNavigate } from 'react-router';

const CreateNotePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await api.post("/notes", {title,description})
      toast("Note created successfully")
      setLoading(false)
      navigate("/")
    }
    catch(error){
      toast("Note creation Failed")
    }

  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-lg shadow">
      {loading ? (
        <p>Loading Note Page</p>
      ) : (
        
          <form onSubmit={handleSubmit} className='flex flex-col gap-6' >
            <input type="text" placeholder='Title' value={title} onChange={(e)=> setTitle(e.target.value)} className='input input-bordered ' />
            <input type="textarea" placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)} className='textarea textarea-bordered h-40'/>
            <button type='submit'disabled={loading} className='btn btn-primary'>Create Note</button>
          </form>
        
      )
      }
    </div>
  )
}

export default CreateNotePage;