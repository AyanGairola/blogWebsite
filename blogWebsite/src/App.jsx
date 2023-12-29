
import { useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import './App.css'
import {login,logout} from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'



function App() {
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .catch((error)=>{ 
      throw error;
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])

  if(loading){
    return null;
  }else{
    return (
      <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
        <div className='w-full block '>
          <Header/>
          <main>
           <Outlet/>
          </main>
          <Footer/>
        </div>
      </div>
    )
  }


}

export default App
