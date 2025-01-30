import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import auth from "../config/firebase";
import axios from "axios";


const Signup = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate();

       // Backend URL
       const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        window.scrollTo(0, 0);
        auth.onAuthStateChanged(function (user) {
            if (user) {
                navigate("/login")
            }
            
        })
    }, []);

    const handleemail =(e)=>{
        setEmail(e.target.value)
    }
    
    const handlepass = (e)=>{
        setPass(e.target.value)
    }

    const handleConfirmpass = (e)=>{
        setConfirmPass(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pass !== confirmPass) {
            setError("Password does not match")
            return;
        }
        else {
            alert("You have successfully Signup your account");
            navigate('/login')
        }

        createUserWithEmailAndPassword(auth,email,pass).then( async(res)=>{
            console.log(res._tokenResponse)
            const uid = res.user.uid
            try {
                await axios.post(`${backendUrl}/api/signup`, { email, uid })
                console.log('User Data sent to DB');
                navigate('/login'); 
                
            } catch (error) {
                console.log('Error saving user to DB');
            }
        })
      
        .catch(()=>{
            console.log("Failed to add user")
        });

        console.log("User Registered:", {email,pass});
        navigate('/login')
    }

    
    return (
        <div className="flex justify-center items-center bg-blue-100">
            <form onSubmit={handleSubmit} className=" p-5 md:p-10 bg-blue-100 rounded-lg shadow-lg w-[950px]">
                <h1 className="text-2xl font-bold text-violet-900 text-center">Welcome to Taskify :)</h1>
                <h2 className="text-yellow-500 mt-7">Please SignUp using your Gmail acoount.</h2>
                <div className="mb-4 mt-2">
                    <label className="block">Email</label>
                    <input
                        onChange={handleemail}
                        type="email"
                        value={email}
                        placeholder="Enter Your Email"
                        className="mt-2 p-2 w-full" required
                    ></input>
                </div>

                <div className="mb-4">
                    <label className="block">Password</label>
                    <input
                        onChange={handlepass}
                        type="password"
                        value={pass}
                        placeholder="Enter the Password"
                        className="mt-2 p-2 w-full"
                        required
                    ></input>
                </div>

                <div className="mb-4">
                    <label className="block">Confirm Password</label>
                    <input
                        onChange={handleConfirmpass}
                        type="password"
                        value={confirmPass}
                        placeholder="Again Enter the Password"
                        className="mt-2 p-2 w-full"
                        required
                    ></input>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                </div>

                <p className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>Already have an account? Login here</p>
                <button className="log-btn bg-gradient-to-r from-green-400 to-green-500 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded mt-2">Register</button>

            </form>
        </div>
    )
}

export default Signup