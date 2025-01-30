import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";


const Footer = () => {
    return (
        
        <div className="text-s mt-5">
            <div className="flex justify-between  p-5 bg-gray-900 text-white">
                <div className="flex flex-col md:gap-2 hover:cursor-pointer ">
                    <p className="hover:text-blue-400">About Us</p>
                    <p className="hover:text-blue-400">Contact US</p>
                    <p className="hover:text-blue-400">Help & Support</p>
                    <p className="hover:text-blue-400">Manage your activities</p>
                    <p className="hover:text-blue-400">24/7 Active</p>
                </div>
                <div className="mt-10 md:mt-20 flex flex-col gap-2 hover:cursor-pointer">
                <div className="flex gap-5 mt-2 text-xl">
                        <FaInstagram className="hover:text-pink-500"/>
                        <FaLinkedin className="hover:text-[#0077B5]"/>
                        <FaXTwitter className="hover:text-[#1DA1F2]"/>
                        <FaPinterest className="hover:text-[#E60023]"/>
                    </div>
                    <p className="hover:text-blue-400">&copy; 2025 Taskify. All Rights Reserved.</p>
                    
                </div>
            </div>
        </div>
        
    )
}

export default Footer