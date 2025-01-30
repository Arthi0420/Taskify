import React from "react";
import Footer from "./common/Footer";
import { motion } from 'framer-motion';
import task from "../assets/task.jpeg";
import team from "../assets/team.jpeg";
import time from "../assets/time.jpeg";
import note from "../assets/create.jpeg";
import status from "../assets/staus.jpeg";
import dlt from "../assets/dlt.jpeg";
import read from "../assets/read.jpeg";




const Home = () => {
    return (
        <div className="overflow-x-hidden bg-blue-100">
        <div className="min-h-screen flex flex-col">

{/* Welcome Section */}
            <div className=" p-5">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl h-20 font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">Welcome to Taskify!</h1>
                    <p className="text-base md:text-xl font-semibold mt-5 md:m-2">
                        Simplify your day by managing your tasks efficiently. Organize, prioritize, and stay on top of your goals.
                    </p>

                </div>

                {/* img */}
                <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-10">
                    {/* Text Section */}
                    <div className="mt-10 md:mt-20 md:text-left ">
                        <h1 className="font-bold text-2xl md:text-4xl text-orange-600">
                            Manage tasks effortlessly
                        </h1>
                        <h1 className="font-bold text-2xl md:text-4xl my-5">
                            with <span className="text-blue-600">Taskify</span>
                        </h1>
                        <h1 className="font-bold text-2xl md:text-4xl">for Remote Teams</h1>
                    </div>

                    {/* Image Section */}
                    <div className=" mt-8 md:mt-0 flex justify-center hover:scale-105 transition-transform duration-300">
                        <img
                            src={task}
                            className="w-full h-auto max-w-md"
                            alt="task"
                        />
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="bg-gray-100 mt-5  ">
                <div className=" text-center mx-auto max-w-6xl bg-blue-100 ">
                    <h2 className="text-3xl md:text-5xl  font-bold mb-6 font-chakra bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">Features</h2>
                    <motion.div
                        initial={{ opacity: 0, translateY: "+50%" }}
                        whileInView={{ opacity: 1, translateY: 0 }}
                        transition={{ duration: 2 }}
                        className="grid md:grid-cols-3 gap-6 mt-10 px-4 md:px-16">
                        <div className="p-4 md:p-6 bg-[#2e0249] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <h3 className="text-lg md:text-xl font-bold mb-4 text-white">Taskify</h3>
                            <p className="text-sm md:text-base text-white">Taskify is a user-friendly app that simplifies task management by allowing users to create, track, and organize tasks efficiently.</p>
                        </div>

                        <div className="p-4 md:p-6 bg-[#2e0249] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <h3 className="text-lg md:text-xl text-white font-bold mb-4">Collaboration</h3>
                            <p className="text-sm md:text-base text-white">Work together with your team effortlessly and increase productivity.</p>
                        </div>

                        <div className="p-4 md:p-6 bg-[#2e0249] to-red-300 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <h3 className="text-lg md:text-xl text-white font-bold mb-4">24/7 Support</h3>
                            <p className="text-sm md:text-base text-white">The 24/7 Availability feature ensures users can access and manage their tasks anytime, providing flexibility and convenience.</p>
                        </div>

                        <div className="p-4 md:p-6 bg-[#2e0249] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <h2 className="text-lg md:text-xl text-white font-bold mb-4">Track Progress</h2>
                            <p className="text-sm md:text-base text-white">The Track Progress feature allows users to monitor the status and completion of their tasks, ensuring they stay on target.</p>
                        </div>

                        <div className="p-4 md:p-6 bg-[#2e0249] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <h2 className="text-lg md:text-xl font-bold text-white mb-4">Filter & Search</h2>
                            <p className="text-sm md:text-base text-white">The Filter and Search feature helps users quickly find tasks by applying filters based on various criteria like status, title, or date.</p>
                        </div>

                        <div className="p-4 md:p-6 bg-[#2e0249] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <h2 className="text-lg md:text-xl font-bold text-white mb-4">Custom Deadlines</h2>
                            <p className="text-sm md:text-base text-white">The Custom Deadlines feature allows users to set personalized due dates for tasks, helping them stay organized and meet their goals on time.</p>
                        </div>

                    </motion.div>


                </div>
            </div>

            {/* Images */}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 px-6 py-10">
                <div className="flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-300">
                    <img src={note} className="md:w-60 md:h-60 w-24 h-24" alt="task" />
                    <p className="font-bold text-sm md:text-xl ">Create Task</p>
                </div>

                <div className="flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-300">
                    <img src={read} className="md:w-60 md:h-60 w-24 h-24" alt="task" />
                    <p className="font-bold text-sm md:text-xl ">Read Task</p>
                </div>

                <div className="flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-300">
                    <img src={team} className="md:w-60 md:h-60 w-24 h-24" alt="task" />
                    <p className="font-bold text-sm md:text-xl ">Team Handeling </p>
                </div>

                <div className="flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-300">
                    <img src={status} className="md:w-60 md:h-60 w-24 h-24" alt="task" />
                    <p className="font-bold text-sm md:text-xl ">Update Status</p>
                </div>

                <div className="flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-300">
                    <img src={time} className="md:w-60 md:h-60 w-24 h-24" alt="task" />
                    <p className="font-bold text-sm md:text-xl ">Time Managing</p>
                </div>


                <div className="flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-300">
                    <img src={dlt} className="md:w-60 md:h-60 w-24 h-24" alt="task" />
                    <p className="font-bold text-sm md:text-xl ">Delete Task</p>
                </div>

                <div className="flex justify-center items-center col-span-2 md:col-span-3 ">
                    <button
                        onClick={() => (window.location.href = "/dashboard")}
                        className="mt-20 hover:scale-105 transition-transform duration-300 px-6 w-50% py-3 bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-indigo-700 font-semibold text-white rounded-lg shadow-lg "
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>

            {/* NewLetter */}
            <div className=" mx-auto text-center">
                <h1 className=" text-2xl md:text-4xl font-bold mt-5 p-2 font-chakra bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">Join our News Letter</h1>
                <p className=" text-base md:text-xl font-semibold mt-3">Stay connected Join our email list for fresh updates and exciting offers.</p>
                <input type="text" className="border border-gray-400 p-2 mt-5 w-full md:max-w-md" />
                <br />
                <button className=" text-xl mt-5 px-4 py-2 rounded-md bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-indigo-700 text-white">Subscribe</button>
            </div>

            {/* Footer Section */}
            <Footer />
        </div>
        </div>
    );
};

export default Home;
