import Navbar from './components/common/Navbar';
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import About from './components/About';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from './context/UserContext';

function App() {
  return (
<UserProvider>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>        

      </Routes> 
    </BrowserRouter>
     </UserProvider>
  )
}

export default App