import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login-Register/Login';
import Register from './components/Login-Register/Register';
import Home from './components/Home/Home';
import Upload from './components/Upload/Upload';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/upload" element={<Upload/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App
