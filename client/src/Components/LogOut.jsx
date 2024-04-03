import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LogOut = ()=>{
  const [token,setToken] = useState(localStorage.getItem('jwtToken'))
  const navigate = useNavigate()
  
  navigate("/signup")
}
export default LogOut