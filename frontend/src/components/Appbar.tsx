import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"
import logo from "../assets/img/logo.png"


// const Username = localStorage.getItem("Username")||"Anonymous";
export const Appbar = () =>{
    const userName = getName();
    
    return <div className="border-b flex justify-between px-10 py-4">
        <span>
        <Link to = {'/blog'}>
        <img src={logo} className="w-12 h-10"></img>
        </Link>
        </span> 
        <div>
       
        <Link to = {'/blog'}>
        <span className="flex flex-col justify-center font-semibold cursor-pointer text-4xl font-sans px-2">
            Wlog 
        </span>
        </Link>
        </div>
        
        <div className="flex justify-end w-full">
            <Link to = {`/publish`}>
                 <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">New</button>
            </Link>
            <Link to = {`/signin`}>
                 <button type="button" onClick={ClrStorage} className="text-gray-700 hover:text-white border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-500 dark:focus:ring-gray-800">Log Out</button>
            </Link>
        </div>
       
        <div>
            <Avatar name = {userName} size="big"/>
        </div>

    </div>

}

function getName(){

    const Username = localStorage.getItem("Username")||"Anonymous";
    return Username;
}

function ClrStorage(){
    localStorage.clear();

}