import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { Singleblog } from "../components/SingleBlog";
import { Appbar } from "../components/Appbar";

export const Blog = ()=>{
    const {id} = useParams();
    const { loading, post} = useBlog({
        id: id || "" 
    });
    if(loading){
        return <div>
            <Appbar/>
        <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
        </div>
    </div>
        
    }
    return <div>
        <Appbar/>
        <Singleblog post = {post}/>
    
    </div>
}