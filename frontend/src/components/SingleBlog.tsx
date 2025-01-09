

import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"


export const Singleblog = ({post}:{post: Blog}) =>{
    return<div className="flex-justify-center pt-6 pl-48">
    <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl">
        <div className="col-span-8">
            <div className="text-3xl font-extrabold">
                {post.title}
            </div>
            <div className="text-sm font-light">
                {post.content}
            </div>

        </div>

        <div className="col span-4">
    <div className="text-sm">
        Author
    </div>
    <div className="flex items-center space-x-1">
       
        <div>
            <Avatar name={post.author.name || "Anonymous"} />
        </div>
        
        <div className="text-2xl font-semibold">
            {post.author.name || "Anonymous"}
        </div>
    </div>
</div>


    </div>
    </div>
}