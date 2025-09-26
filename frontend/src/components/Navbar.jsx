import { PlusIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header>
      <div className="navbar bg-base-300 max-w-6xl mx-auto">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost normal-case text-xl">ThinkBoard</Link>
        </div>
        <div className="navbar-end">
          <Link to="/create" className="btn btn-outline">
            <PlusIcon /><span className='text-lg'>Create Note</span>
          </Link>
        </div>
</div>
    </header>
  )
}

export default Navbar