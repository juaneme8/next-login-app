import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    username: ''
  })
  const getProfile = async () => {
    try {
      const res = await axios.get('/api/profile')
      setUser(res.data)
    }
    catch (error) {
      if (error.response) {
        console.log(error.response.data)
      }
      else {
        console.error(error)
      }
    }
  }
  const logout = async () => {
    try {
      const res = await axios.get('/api/auth/logout')
    }
    catch (error) {
      console.error(error)
    }
    router.push('/login')
  }

  return (
    <>
      <div>Dashboard</div>
      <div>{JSON.stringify(user)}</div>
      <button onClick={getProfile}>Profile</button>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default Dashboard