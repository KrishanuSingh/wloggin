import { Hono } from "hono";
import {PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, verify, sign} from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@krishanusingh/validcheck2";
import { Cloudinary } from '@cloudinary/url-gen';;


interface QueryData {
  inputs: string;
 // The text input describing the image
}
interface CloudinaryResponse {
  secure_url: string;
  error?: { message: string };
}
export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
      HF_API_KEY: string
      CLOUDNAME: string
    
    }, Variables:{
        userToken: string
    }
  }>();

  blogRouter.use("/*", async(c,next)=>{
   const header =  c.req.header("authorization") || " ";
   const token = header.split(" ")[1];
   try{
   const user = await verify(token,c.env.JWT_SECRET)as {id: string};
   if(user){
    c.set("userToken",user.id)
   await next();
   }
   else{
    c.status(403);
    return c.json({
        message: "you are not logged in"
    })
   }
}catch(e){
    c.status(403);
    return c.json({
        message: "you are not logged in"
    })
}

  });

  blogRouter.post('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const body = await c.req.json();

      const {success} = createBlogInput.safeParse(body);
      if(!success){
        c.status(401);
        return c.json({
                message: "invalid input"
            })
        
      }
      const userId = c.get("userToken");
     
      const response = await query({ inputs: "generate a black and white abstract image for a blog post with the title "+ body.title} ); 
      async function query(data: QueryData) {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/stable-diffusion-v1-5/stable-diffusion-v1-5",
          {
            headers: {
              Authorization: `Bearer ${c.env.HF_API_KEY}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
          }
        );
        const result = await response.blob();
        return result;
      }
      const cloud = c.env.CLOUDNAME;
      const final_url = await uploadImageToCloudinary(response,cloud)
    
      const date = new Date();
      const post  = await prisma.post.create({
        data:{
            title: body.title,
            content:body.content,
            authorId: userId,
            date: date,
            url:final_url

        }
      })


    return c.json({
        id: post.id
    })
    
  });
 
 const uploadImageToCloudinary = async (file: Blob,cloud:string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'wlogging'); // If using upload preset

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud}/image/upload`;

    try {
        const response = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formData,
        });
        console.log('Cloudinary raw response:', response);

        const data:CloudinaryResponse= await response.json();
        if (data.secure_url) {
            console.log('Image uploaded successfully:', data.secure_url);
            return data.secure_url;
        }
        throw new Error('Image upload failed');
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Image upload failed');
    }
};
  blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const body = await c.req.json();
      const {success} = updateBlogInput.safeParse(body);
      if(!success){
        c.status(401);
        return c.json({
                message: "invalid input"
            })
        
      }

      const post  = await prisma.post.update({
        where:{
            id: body.id
        },

        data:{
            title: body.title,
            content: body.content,
           
        }
      })



    return c.json({
        id: post.id
    })
  });
  // add pagination
blogRouter.get('/bulk' , async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    const blog = await prisma.post.findMany({
      select:{
        content: true,
        title:true,
        id: true,
        date:true,
        click:true,
        url:true,
        author: {
          select: {
            name:true
          }
        }
      }
    });
      return c.json({
        blog
      })


})
  blogRouter.get('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const id = await c.req.param("id");
      try{
      
        await prisma.post.update({
          where: {
              id: id
          },
          data: {
              click: { increment: 1 }  
          }
      });

      const post  = await prisma.post.findFirst({
        where:{
            id: id
        },
        select:{
          id:true,
          title:true,
          content:true,
          date:true,
          click:true,
          url:true,
          author:{
            select:{
              name:true
            }
            
          }
        }

      })
    return c.json({
        post
    })
    } catch(e){
        c.status(411);
        return c.json({
            error: "met with error"
        })
    }
});

  
  
  