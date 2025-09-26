import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/notes', { title, description });
      toast.success('Note created!');
      setTitle('');
      setDescription('');
    } catch (error) {
      toast.error('Failed to create note!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered"
        />
        <textarea
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered"
        ></textarea>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePage;