import { BlogCard } from "../components/BlogCard"
import {Appbar} from "../components/Appbar.tsx"
import {useBlogs} from "../hooks"
import { Skeleton } from "../components/Skeleton.tsx"

export const Blogs = () => {
    const {loading,blogs} = useBlogs();

    if(loading){
        return <div>
             <div>
                <Appbar/>
            </div>
            <div className="">
                <Skeleton/>
            </div>
            
               
        </div>
    }
    return <div>
            <div>
                <Appbar/>
            </div>
            <div className=" flex justify-center pt-6">
                <div className="w-96">
               {blogs.map(blog=> <BlogCard
                key={blog.id}
                id={blog.id}
                authorname={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.date}></BlogCard>)}
                </div>

            </div>


            </div>
            
}
