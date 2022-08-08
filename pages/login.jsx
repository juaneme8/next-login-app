import axios from 'axios';
import React, { useState } from 'react'
import {useRouter} from 'next/router'

function LoginPage() {
  const router = useRouter()

  const [credentials, setCredentials] = useState({
    email: '',
    password:''
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', credentials)
      console.log(res.data)
      if (res.status === 200) {
        router.push("/dashboard");
      }

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

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginPage