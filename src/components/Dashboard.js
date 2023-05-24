import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate=useNavigate();
  const token=window.localStorage.getItem("token")
  const [taskList,setTaskList]=useState([])
  const [task,setTask]=useState("")
    
    useEffect(()=>{
      if(!token){
        navigate("/")
    }
    },[navigate,token])

    const createTask=()=>{
      if(task){
        setTaskList([{task: task},...taskList]);
        setTask("");
      }
    }

    const logoutHandler=()=>{
      window.localStorage.removeItem("token")
      navigate("/")
    }


  return (
    <div className='flex flex-col w-full items-center'>
    <div className='bg-gray-900 text-white text-center px-2 py-2 w-full'><h1 className='font-medium'>Task Manager Dashboard</h1></div>
    <button onClick={()=>logoutHandler()} className='absolute right-8 top-1 bg-[#E21717] text-white px-2 py-1 rounded-lg'>Logout</button>
    <div className='flex flex-col items-center mt-10'>
      <div className='flex flex-row gap-3 items-center'>
        <input className='border border-gray-900 pl-2 w-64 py-1 rounded-lg' onChange={(e)=>setTask(e.target.value)} value={task} type='text' placeholder='Write your task'/>
        <button className='bg-gray-900 text-white px-3 py-1 rounded-lg' onClick={()=>createTask()}>Create Task</button>
      </div>
      {
        taskList && taskList.map((data,index)=>(
          <div key={index} className='bg-[#CAD5E2] px-3 py-2 mt-2 w-96 '><h2>{data.task}</h2></div>
        ))
      }
    </div>
    </div>
  )
}

export default Dashboard