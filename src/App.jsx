import { useState } from 'react'
import './App.css'
import Home from './Components/Home'
import Edit from './Components/Edit'
import { Navigate, Route, Routes } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />  
        <Route path='/edit/:id' element={<Edit/>} />
        <Route path='/*' element={<Navigate to="/" />} />
      </Routes>     
    </>
  )
}

export default App
