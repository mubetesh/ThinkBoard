import React from "react";
import UserList from "./pages/user/UserList";
import { Routes, Route } from "react-router";
import Homepage from "./pages/HomePage";
import CreateNotePage from "./pages/note/CreateNotePage";
import NoteDetailPage from "./pages/note/NoteDetailPage";
import CreateUser from "./pages/user/CreateUser";
import Navbar from "./components/Navbar";
import UserUpdate from "./pages/user/UserUpdate";


const App = () => {
  return (
    <div data-theme="night">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreateNotePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/:id" element={<UserUpdate />} />
      </Routes>
    </div>
  );
};

export default App;
