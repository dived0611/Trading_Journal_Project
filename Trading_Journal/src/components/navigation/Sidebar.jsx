import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import img from '../../assets/Adobe Express - file (2).png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChartSimple, 
    faBook, 
    faChartLine, 
    faGear, 
    faMoon, 
    faSun,
    faRightFromBracket ,
    faAddressBook
} from '@fortawesome/free-solid-svg-icons';
const Sidebar = () => {
    const location = useLocation();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    const handleLogout = () => {
        // Add your logout logic here
        console.log('Logging out...');
    };

    return (
        <div className='sidebar w-20 p-5 h-screen shadow-xl flex flex-col items-center'>
            <div className='flex flex-col items-center gap-8'>
                <Link to="/">
                    <div className="p-3 rounded-full w-[70px] h-[70px] flex items-center justify-center">
                        <img src={img} width={60} alt="logo" />
                    </div>
                </Link>

                <Link to="/dashboard">
                    <div className={`p-3 rounded-full hover:bg-gray-100 transition-all w-[45px] h-[45px] flex items-center justify-center ${
                        location.pathname === '/dashboard' ? 'bg-gray-100' : ''
                    }`}>
                        <FontAwesomeIcon 
                            icon={faChartLine} 
                            className={`text-[25px] transition-all cursor-pointer ${
                                location.pathname === '/dashboard' 
                                    ? 'text-[#1d7ed1]' 
                                    : 'text-[#bcbcbc] hover:text-[#1d7ed1]'
                            }`}
                        />
                    </div>
                </Link>

                <Link to="/journal">
                    <div className={`p-3 rounded-full hover:bg-gray-100 transition-all w-[45px] h-[45px] flex items-center justify-center ${
                        location.pathname === '/journal' ? 'bg-gray-100' : ''
                    }`}>
                        <FontAwesomeIcon 
                            icon={faBook} 
                            className={`text-[25px] transition-all cursor-pointer ${
                                location.pathname === '/journal' 
                                    ? 'text-[#1d7ed1]' 
                                    : 'text-[#bcbcbc] hover:text-[#1d7ed1]'
                            }`}
                        />
                    </div>
                </Link>

                <Link to="/analytics">
                    <div className={`p-3 rounded-full hover:bg-gray-100 transition-all w-[45px] h-[45px] flex items-center justify-center ${
                        location.pathname === '/analytics' ? 'bg-gray-100' : ''
                    }`}>
                        <FontAwesomeIcon 
                            icon={faChartSimple} 
                            className={`text-[25px] transition-all cursor-pointer ${
                                location.pathname === '/analytics' 
                                    ? 'text-[#1d7ed1]' 
                                    : 'text-[#bcbcbc] hover:text-[#1d7ed1]'
                            }`}
                        />
                    </div>
                </Link>
               <Link to="/profile">
                    <div className={`p-3 rounded-full hover:bg-gray-100 transition-all w-[45px] h-[45px] flex items-center justify-center ${
                        location.pathname === '/profile' ? 'bg-gray-100' : ''
                    }`}>
                        <FontAwesomeIcon 
                            icon={faAddressBook} 
                            className={`text-[25px] transition-all cursor-pointer ${
                                location.pathname === '/profile' 
                                    ? 'text-[#1d7ed1]' 
                                    : 'text-[#bcbcbc] hover:text-[#1d7ed1]'
                            }`}
                        />
                    </div>
                </Link>
                
            </div>
            
            {/* Bottom section with settings, dark mode, and logout */}
            <div className="mt-auto mb-8 flex flex-col items-center gap-4">
                {/* Settings */}
                <Link to="/settings">
                    <div className={`p-3 rounded-full hover:bg-gray-100 transition-all w-[45px] h-[45px] flex items-center justify-center ${
                        location.pathname === '/settings' ? 'bg-gray-100' : ''
                    }`}>
                        <FontAwesomeIcon 
                            icon={faGear} 
                            className={`text-[22px] transition-all cursor-pointer ${
                                location.pathname === '/settings' 
                                    ? 'text-[#1d7ed1]' 
                                    : 'text-[#bcbcbc] hover:text-[#1d7ed1]'
                            }`}
                        />
                    </div>
                </Link>

                {/* Dark Mode Toggle */}
                <div 
                    onClick={toggleDarkMode}
                    className="p-3 rounded-full hover:bg-gray-100 transition-all w-[45px] h-[45px] flex items-center justify-center cursor-pointer"
                >
                    <FontAwesomeIcon 
                        icon={isDarkMode ? faSun : faMoon} 
                        className="text-[22px] text-[#bcbcbc] transition-all hover:text-[#1d7ed1]"
                    />
                </div>

                {/* Logout */}
                <div 
                    onClick={handleLogout}
                    className="p-3 rounded-full hover:bg-gray-100 transition-all w-[45px] h-[45px] flex items-center justify-center cursor-pointer"
                >
                    <FontAwesomeIcon 
                        icon={faRightFromBracket} 
                        className="text-[22px] text-[#bcbcbc] transition-all hover:text-[#1d7ed1]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;