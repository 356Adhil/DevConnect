import axios from '../../../axios'
import React, { useEffect, useState } from 'react'

function ProfileEdit() {
  const user = JSON.parse(localStorage.getItem("user"))
const [userName,setUserName] = useState({})  
const [email,setEmail] = useState({})  
  useEffect(()=>{
     axios.get('http://localhost:4000/getProfile',{
      headers:{
        Authorization:user.token
      }
    }).then((res)=>{
      setUserName(res.data.user.fullName)
      setEmail(res.data.user.email)
    },[])

  })
  return (
    <div className='bg-gray-200 fixed px-10 py-5 rounded-xl'>
      
<form>
  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email"  id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder={email}  required />
  </div>
  <div className="mb-6">
    <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your fullName</label>
    <input type="text" id="fullName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder={userName} required />
  </div>

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
</form>

    </div>
  )
}

export default ProfileEdit
