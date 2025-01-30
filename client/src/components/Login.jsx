import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../config/firebase";
import { UserContext } from "../context/UserContext";



const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    // const [user, setUser] = useState('');
    const { setUser} = useContext(UserContext)

    useEffect(() => {
        window.scrollTo(0, 0);
        auth.onAuthStateChanged(function (user) {

        })

    }, []);


    const handleemail = (e) => {
        setEmail(e.target.value);
    };

    const handlepass = (e) => {
        setPass(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await signInWithEmailAndPassword(auth, email, pass);
            const user = res.user;
    
            // Set user in context
            setUser({
                uid: user.uid,
                email: user.email,
            });
    
            // Save user data in local storage
            localStorage.setItem("userId", user.uid);
            localStorage.setItem("email", user.email);
    
            console.log('User Id:', user.uid);
            console.log('User Email:', user.email);
    
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/user-not-found') {
                setError('No user found with this email.');
            } else if (error.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again.');
            } else {
                setError('Error in signing in, Please try again.');
            }
        }
    };
    


    return (
        
<div className="flex justify-center items-center bg-blue-100 h-screen">
            <form onSubmit={handleLogin} className="p-5 md:p-10 bg-blue-100 rounded-lg shadow-lg w-[950px]">
                <h1 className="text-2xl font-bold text-violet-900 text-center">Welcome Back to Taskify :)</h1>
                <h2 className="text-yellow-500 mt-7">Please login using your account.</h2>
                <div className="mb-4 mt-2 ">
                    <label className="block">Email</label>
                    <input
                        onChange={handleemail}
                        type="email"
                        value={email}
                        placeholder="Enter Your Email"
                        className="mt-2 p-2 w-full"
                        required
                    />
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
                    />
                </div>

                <p className="text-red-500 my-2">{error}</p>

                <p className="text-blue-500 cursor-pointer" onClick={() => navigate("/signup")}>
                    Don't have an account? Sign up here
                </p>
                <button className="log-btn bg-gradient-to-r from-green-500 to-blue-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Login
                </button>
            </form>
        </div>

    );
};

export default Login;
