import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import auth from "../../config/firebase";
import { signOut } from "firebase/auth";
import icon from '../../assets/green.jpeg';
import { UserContext } from "../../context/UserContext";


// import { CiMenuFries } from "react-icons/ci";


const Navbar = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const [log, setLog] = useState(false);

    const handleLogin = () => {
        navigate("/login");
    };

    useEffect(()=>{
        auth.onAuthStateChanged((currentuser)=>{
            setLog(!!currentuser)
        })
    }, []);

    const handleLogout = async()=> {
        await signOut(auth);
        setUser('User Logged Out');
        localStorage.clear();
        navigate('/login')
    };


    return (
        <div className="overflow-x-hidden bg-blue-100">
            <div className="flex justify-around pb-5 pt-10 items-center gap-2 px-2">
                <div className="flex items-center">
                    <img src={icon} className="h-10 w-auto rounded-full" alt="Taskify logo" />
                    <h1 className="text-3xl font-bold hidden md:block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">Taskify</h1>
                </div>

                <div className="flex gap-2 md:space-x-5 text-l  md:text-xl font-semibold">
                    <Link className='hover:text-blue-700 hover:underline decoration-black-500 cursor-pointer' to={"/home"}>Home</Link>
                    <Link className='hover:text-blue-700 hover:underline decoration-black-500 cursor-pointer' to={"/dashboard"}>Dashboard</Link>
                    <Link className='hover:text-blue-700 hover:underline decoration-black-500 cursor-pointer' to={"/about"}>About</Link>
                    <Link className='hover:text-blue-700 hover:underline decoration-black-500 cursor-pointer' to={"/contact"}>Contact</Link>
                </div>

                <div className="flex justify-between items-center hover:scale-105 transition-transform duration-300">
                    {
                        log ? <button onClick={handleLogout} className="bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-indigo-700 text-white font-semibold md:font-bold md:py-2 md:px-4 p-1 rounded" >Logout</button> : <button onClick={handleLogin} className="bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-400 hover:to-indigo-700 text-white font-semibold md:font-bold md:py-2 p-1 md:px-4 p-2 rounded" >Login</button>


                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar;