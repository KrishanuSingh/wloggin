import { useEffect, useState } from "react";
import axios from "axios"
import { BACKEND_URL } from "../config";
export interface Blog{
            "content" : string,
            "title" : string,
            "id" : string,
            "date": string,
            "click":number,
            "url":string,
            "author":{
                "name":string
            }
}
export const useBlog = ({id}: {id:string})=>{
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<Blog>({
        content: "",
        title: "",
        id: "",
        date: "",
        click: 0,
        url:"",
        author: { name: "Anonymous" },
      });

    useEffect(()=>{
    
         axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {Authorization: localStorage.getItem("token")}
         })
            .then(response => {
                setPost(response.data.post);
                setLoading(false);
            })
    },[id])

    return {
        loading,
        post
    }   
}
export const useBlogs = () =>{
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        const fetchPost = () => {
         axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {Authorization: localStorage.getItem("token")}
         })
            .then(response => {
                setBlogs(response.data.blog);
                setLoading(false);
            })
        }
            fetchPost(); // Initial fetch

            const interval = setInterval(() => {
              fetchPost(); // Refetch every 5 seconds (adjust as needed)
            }, 5000);
        
            return () => clearInterval(interval); 
    },[])

    return {
        loading,
        blogs
    }
}
