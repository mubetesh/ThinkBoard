import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../lib/axios";
import toast from "react-hot-toast";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", { name, sex, age });
      toast("User created Successfully");
      navigate("/users");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-lg shadow">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="input input-bordered w-full mb-4"
        />
        <select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          className="select select-bordered w-full mb-4"
        >
          <option value="">Select Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          className="input input-bordered w-full mb-4"
        />
        <button type="submit" className="btn btn-primary">
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
