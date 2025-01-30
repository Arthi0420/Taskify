import React from "react";
import Footer from "./common/Footer"
import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="overflow-x-hidden bg-blue-100">
        <div className=" min-h-screen text-black">
            <div className="text-center py-5">
                <h1 className="text-4xl md:text-5xl h-20 font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">About Taskify</h1>
                <p className="md:text-xl max-w-3xl mx-auto">
                    Taskify is designed to revolutionize productivity by simplifying task management for everyone, everywhere.
                </p>
            </div>

            {/* //Section 1 */}
            <section className="py-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:space-x-10 space-y-10 md:space-y-0">
                <div className="p-8 bg-[#2e0249] rounded-lg text-center transform hover:scale-105 transition-transform duration-300 flex-1">
                    <h2 className="text-4xl text-white font-bold">Our Mission</h2>
                    <p className="mt-4 text-white font-semibold">
                        To provide a comprehensive platform that empowers users to manage tasks efficiently, fostering both personal and professional growth.
                    </p>
                </div>
                <div className="p-8 bg-[#2e0249] rounded-lg text-center transform hover:scale-105 transition-transform duration-300 flex-1">
                    <h2 className="text-4xl text-white font-bold">Our Vision</h2>
                    <p className="mt-4 text-white font-semibold">
                        Taskify envisions a world where every task is manageable and every goal achievable through innovative technology and user-centric design.
                    </p>
                </div>

            </section>

            {/* Section 2 */}
            <section className="pb-10 mt-16 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl  md:text-5xl h-20 font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">Our Story</h2>
                    <p className=" md:text-xl max-w-3xl mx-auto">
                        Taskify was founded with the belief that managing tasks should be simple and stress-free. Since 2024, we've been helping individuals and teams stay organized and productive.
                    </p>
                </div>
                <motion.div
                initial={{ opacity: 0, translateY: "+50%" }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 2 }}
                 className="py-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:space-x-10 space-y-10 md:space-y-0">
                    <div className="bg-[#2e0249] p-8 rounded-lg transform hover:scale-105 transition-transform duration-300 flex-1">
                        <h3 className="text-3xl font-bold text-white text-center text-black">Our Team</h3>
                        <p className="mt-4 text-white font-semibold">
                            Our diverse team is passionate about creating tools that make a difference. From developers to designers, everyone plays a crucial role in our success.
                        </p>
                    </div>
                    <div className="bg-[#2e0249] p-8 rounded-lg transform hover:scale-105 transition-transform duration-300 flex-1">
                        <h3 className="text-3xl text-white font-bold text-black text-center">Our Approach</h3>
                        <p className="mt-4 text-white font-semibold">
                            We focus on continuous improvement and listening to our users. Your feedback shapes the future of Taskify.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Section 3 */}
            <section className="py-5 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl h-20 font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">Why Taskify?</h2>
                </div>
                <motion.div 
                         initial={{ opacity: 0, translateY: "+50%" }}
                         whileInView={{ opacity: 1, translateY: 0 }}
                         transition={{ duration: 2 }}
                         className="mt-5 max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:space-x-10 space-y-10 md:space-y-0">
                    <div className="bg-[#2e0249] p-8 rounded-lg transform hover:scale-105 transition-transform duration-300 flex-1">
                        <ul className="list-disc list-inside">
                            <li className="text-white"><strong className="text-xl font-bold">Seamless Integration:</strong> Connect with your favorite tools for a streamlined workflow.</li>
                            <li className="text-white"><strong className="text-xl font-bold">Custom Workspaces:</strong> Adapt Taskify to fit your unique needs.</li>
                        </ul>
                    </div>
                    <div className="bg-[#2e0249] p-8 rounded-lg transform hover:scale-105 transition-transform duration-300 flex-1">
                        <ul className="list-disc list-inside ">
                            <li className="text-white"><strong className="text-xl font-bold">Real-Time Collaboration:</strong> Work together with your team in real time, no matter where you are.</li>
                            <li className="text-white"><strong className="text-xl font-bold">Data Security:</strong> Your privacy is our priority, with top-notch security protocols in place.</li>
                        </ul>
                    </div>
                </motion.div>
            </section>


            <div className="text-center mt-16">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">Join Taskify Today</h2>
                <p className="mt-4">
                    Ready to enhance your productivity? Sign up now and take the first step towards a more organized life.
                </p>
               
            </div>

            <Footer />
        </div>
        </div>
    );
};

export default About;
