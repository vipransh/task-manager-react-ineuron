import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function AuthPage() {
    const [token, setToken]=useState("")
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate();

    useEffect(()=>{
        const auth=window.localStorage.getItem("token")
        if(auth){
            navigate("/dashboard")
        }
        if(token){
            window.localStorage.setItem("token",token)
            navigate("/dashboard")
        }
    },[navigate,token])

    const handleLogin=()=>{
        const url = 'https://reqres.in/api/login';
        const data = {
           email: 'eve.holt@reqres.in',
           password: 'cityslicka'
        };

        if(!loading){
            setLoading(true)
            fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(data)
             })
             .then(response => response.json())
             .then(data => {
                setToken(data.token);
                setLoading(false)
             })
             .catch(error => {
                setLoading(false)
                console.error('Error:', error)
             });
        }
    }

  return (
    <div className='bg-slate-200 w-full h-screen flex items-center justify-center'>
    <div className='bg-gray-900 w-96 h-64 rounded-lg text-white flex flex-col items-center p-3'>
        <h2 className='font-bold text-xl mt-10'>Task Manager</h2>
        <button onClick={()=>handleLogin()} className="mt-10 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          {loading? "Please wait..." : "Dashboard Login"}
          </span>
       </button>
    </div>
    </div>
  )
}

export default AuthPage