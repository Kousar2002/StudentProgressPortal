import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/Dashboard'
import {Routes,Route} from "react-router-dom";
import StudentForm from './components/StudentForm'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* <Dashboard/> */}
         <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/studentform" element={<StudentForm/>}/>
         </Routes>
      </div>
    </>
  )
}

export default App
