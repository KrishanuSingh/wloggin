import { Link } from "react-router-dom";

export interface BlogCardProps{
    id:string
    authorname: string;
    title: string;
    content: string;
    publishedDate: string;
    click: number;
}

export const BlogCard = ({
    id,
    authorname,
    title,
    content,
    publishedDate,
    click
}: BlogCardProps) =>{
    return <Link to ={`/blog/${id}`}>
    <div>
        <div className="flex items-center px-1 pt-2 text-2xl">
           <Avatar name = {authorname} /> 
           
           <div  className="font-extralight px-1">
                {authorname}
            </div> 
            <div className="text-xs">
            &#65372;
            </div>

           <div className="font-thin text-sm ">
                {publishedDate.slice(0,10)}
                
            </div>
        </div>
       
        <div className="text-xl font-semibold px-1 pt-2">
            {title}
        </div>
        <div className="text-md font-thin px-1">
            {content.slice(0,100) + "..."}
        </div>
        <div className="text-slate-400 text-xs font-thin px-1 pt-2 pb-4">
                {`${Math.ceil(content.length/100)} minute(s) read`}
         <span className=" px-2">   
                Views:{click}
        </span>       
        </div>
        
           
        
        <div className="bg-slate-200 h-0.5 w-full">

        </div>
    </div>
    </Link>
}

export function Avatar({name, size= "small"}: {name:string, size?:"small" |"big"}){
    return <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-9 h-9"} overflow-hidden bg-zinc-400 rounded-full dark:bg-zinc-400`}>
        <span className="font-medium text-white dark:text-white">
            {name[0]}

        </span>
    </div>
    
}