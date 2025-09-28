import { PlusIcon } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router'; // <- use react-router-dom here

const Navbar = () => {
  const location = useLocation();

  // check if current path starts with /users
  const isUsersPage = location.pathname.startsWith('/users');

  return (
    <header>
      <div className="navbar bg-base-300 max-w-6xl mx-auto">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            ThinkBoard
          </Link>
        </div>
        <div className="navbar-end">
          {isUsersPage ? (
            <Link to="/users/create" className="btn btn-outline">
              <PlusIcon />
              <span className="text-lg">Create User</span>
            </Link>
          ) : (
            <Link to="/create" className="btn btn-outline">
              <PlusIcon />
              <span className="text-lg">Create Note</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
