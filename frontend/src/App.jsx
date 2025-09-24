import React from 'react'
import Homepage from './pages/Homepage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import { Routes, Route } from 'react-router'
import { toast } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <button onClick={() => toast.success('Congrats')} className='btn btn-outline'>Click me</button>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App