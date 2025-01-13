import {BlogCardProps } from "./BlogCard";
import { Link } from "react-router-dom";

import { Avatar } from "./BlogCard";

export const Popularcard= ({
    id,
    authorname,
    title,
    content,
    click,
    url}:BlogCardProps) =>{

    return <Link to ={`/blog/${id}`}>
    <div className="w-3/4">
        <div className="border-l-2">        
        <div className="flex items-center px-1 pt-2">
           <Avatar name = {authorname} /> 
           
           <div  className="font-extralight px-1">
                {authorname}
            </div> 
         

         
        </div>
       
        <div className="flex">
       
       <span className="w-3/4" >
       <div className=" z-10 text-l font-semibold px-1 pt-2">
           {title}
       </div>

       <div className=" z-10 text-sm font-thin px-1">
           {content.slice(0, 50) + "..."}
       </div>
     
       <div className="text-slate-400 text-xs font-thin px-1 pt-2 pb-4">
               {`${Math.ceil(content.length/100)} minute(s) read`}
        <span className=" px-2">   
               Views:{click}
       </span>       
       </div>
       </span>
       <span className="flex items-center">
           <img src={url} className="w-28 h-20"></img>
       </span>
       </div>
        
           
        
        <div className="bg-slate-200 h-0.5 w-full">

        </div>
        <div className="pt-4">
            
        </div>
        </div>
    </div>
    </Link>
}

