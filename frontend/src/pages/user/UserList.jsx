import React, { useEffect, useState } from "react";
import api from "../../lib/axios";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await api.get("/users");
        setUsers(userList.data);
      } catch (error) {
        console.log("Error in fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  // update handler (example: updates user's name)
  

  // delete handler
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    try {
      await api.delete(`/users/${id}`);

      // remove user from state
      setUsers((users) => users.filter((user) => user._id !== id));

      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Error in deleting user");
      console.log(error);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto my-10 p-6 bg-base-200 rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Header */}
          <thead className="bg-slate-800 text-primary-content text-white text-md font-bold">
            <tr>
              <th>Name</th>
              <th>Sex</th>
              <th>Age</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={index % 2 === 0 ? "bg-base-300" : "bg-base-100"} // alternating rows
              >
                <td>{user.name}</td>
                <td>{user.sex}</td>
                <td>{user.age}</td>
                <td className="flex justify-center gap-3">
                  <Link
                    to={`/users/${user._id}`}
                    state={{ user }}
                    className="btn btn-sm btn-outline btn-warning flex items-center gap-1"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={(e) => handleDelete(e, user._id)}
                    className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
