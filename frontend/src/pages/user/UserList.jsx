import React, { useEffect, useState } from 'react'
import api from '../../lib/axios'
import { Link } from 'react-router'

const UserList = () => {
    const [users,setUsers] = useState([])

    useEffect (()=>{
        const fetchUsers = async() => {

            try{
                const userList =  await api.get("/users")
                setUsers(userList.data)
            }
            catch(error){
                console.log("Error in fetching users")
                console.log(error)
            }

        };
        fetchUsers();
    },[])
  return (
    <div className='p-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-gap-4 justify-items-center'>
            {users.map(user => (
            <div key={user.id} className='card bg-secondary text-primary-content w-80 m-2 transition-transform shadow-lg hover:shadow-secondary hover:shadow-md p-4'>
                <div className='card-body'>
                    <h2 className='card-title'>Name: {user.name}</h2>
                    <h2 className='card-title'>Sex: {user.sex}</h2>
                    <h2 className='card-title'>Age: {user.age}</h2>
                </div>
            </div>
        ))}
        </div>
        
    </div>
  )
}

export default UserList