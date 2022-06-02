import {useState} from 'react'

import { useFirebase } from '../../../context/FirebaseContext'
function Register() {
const {register} = useFirebase()
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
  return (
     <form >
        <input type="text" placeholer="Username"
        onChange={(e)=> setEmail(e.target.value)}
        />
        <input type="password" placeholer="Password"
        onChange={(e)=> setPassword(e.target.value)}
        />
        <button 
        onClick={(e)=> {
          e.preventDefault()
          register(email, password)
        }}
        >Register</button>
      </form>
  )
}

export default Register