import { useNavigate, useLocation, useParams } from "react-router";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    if (state?.user) {
      setName(state.user.name);
      setAge(state.user.age);
      setSex(state.user.sex);
    }
  }, [state]);

  useEffect(() => {
    if (!state?.user) {
      const fetchUser = async () => {
        try {
          const response = await api.get(`/users/${id}`);
          setName(response.user.name);
          setAge(response.user.age);
          setSex(response.user.sex);
        } catch (error) {
          toast.error("Error fetching note");
          console.log(error);
        } 
      };
      fetchUser();
    }
  }, [state, id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim() || !sex.trim()) {
      toast.error("Name, Sex and Age are required");
      return;
    }
    try {
      await api.put(`/users/${id}`, { name, sex, age });
      toast.success("User updated successfully");
      navigate("/users");
    } catch (error) {
      toast.error("Error updating user");
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      <div className="p-4 max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-lg shadow">
        <form onSubmit={handleUpdate}>
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
            <option value="">{sex}</option>
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
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
