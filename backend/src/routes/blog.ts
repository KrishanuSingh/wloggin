import { Hono } from "hono";
import {PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, verify, sign} from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@krishanusingh/validcheck2";
export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
    
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

      const post  = await prisma.post.create({
        data:{
            title: body.title,
            content:body.content,
            authorId: userId

        }
      })


    return c.json({
        id: post.id
    })
  });
  
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

      const post  = await prisma.post.findFirst({
        where:{
            id: id
        },
        select:{
          id:true,
          title:true,
          content:true,
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

  
  
  