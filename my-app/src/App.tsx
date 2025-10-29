import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/Dashboard'
import {Routes,Route} from "react-router-dom";
import StudentForm from './components/StudentForm'
// import Drawer from "./components/Drawer";
import BasicLineChart from "./components/Linechat"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* <BasicLineChart/> */}
        {/* <Dashboard/> */}
        {/* <Drawer/> */}
         <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/studentform" element={<StudentForm/>}/>
         </Routes>
         {/* <Linechat/> */}
      </div>
    </>
  )
}

export default App
