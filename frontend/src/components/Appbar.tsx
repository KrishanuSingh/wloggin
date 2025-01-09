import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"
const Username = localStorage.getItem("Username")|| "Anonymous";
export const Appbar = () =>{
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to = {'/blog'}>
        <div className="flex flex-col justify-center font-semibold cursor-pointer text-4xl font-sans">
            Wlog
        </div>
        </Link>
        <div className="flex justify-end w-full">
            <Link to = {`/publish`}>
                 <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">New</button>
            </Link>
        </div>
        <div>
            <Avatar name = {Username} size="big"/>
        </div>

    </div>

}