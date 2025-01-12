import { BlogCard } from "../components/BlogCard"
import {Appbar} from "../components/Appbar.tsx"
import {useBlogs} from "../hooks"
import { Skeleton } from "../components/Skeleton.tsx"
import { Popularcard } from "../components/Popularcard.tsx"
import icon from "../assets/img/mainpage.jpg"
import trending from "../assets/img/trending.png"


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
            <div className="bg-[url('./assets/img/mainback3.png')] bg-auto bg-repeat ">

            <div>
                <Appbar/>
            </div>
            <div className=" flex justify-center pt-6">
                <span className="px-40">
                <div className="text-4xl font-bold flex items-center gap-4">
               
                <span>New Blogs</span>
                <img src={icon} className="w-20 h-20" alt="Icon" />
            </div>
                <div className="w-96 pt-2">
               {blogs.slice()
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
               .map(blog=> <BlogCard
                key={blog.id}
                id={blog.id}
                authorname={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.date}
                click={blog.click}>    
                </BlogCard>)}
                </div>
                </span>
                <span className="flex justify-center">
              
                    <div className="pt-20 px-28">
                    <div className="font-serif text-3xl font-bold flex">
                        <span>
                        Popular
                        </span>
                        <img src={trending} className="w-15 h-10 px-2" alt="trending"  />

                    </div>
                    <div className="">
                        {
                            blogs
                            .sort((a, b) => (b.click) - (a.click))
                            .slice(0,3) 
                           .map(blog=> <Popularcard
                            key={blog.id}
                            id={blog.id}
                            authorname={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={blog.date}
                            click={blog.click}>    
                            </Popularcard>)

                        }
                        
                    </div>
                    </div>
                </span>

            </div>


            </div>
            </div>
            
}
