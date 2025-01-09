import { Hono } from "hono";
import {PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, verify, sign} from 'hono/jwt'
import {signupInput} from '@krishanusingh/validcheck2'


export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
    
    }, Variables:{
        userToken: string
    }
  }>();

userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
        c.status(401);
        return c.json({
            message: "input not correct"
        })
    }
    if (!body.email || !body.password) {
        return c.json({ error: "Missing required fields" }, 400);
      }
    try{
        const user = await prisma.user.create({
          data:{
            email: body.email,
            password: body.password,
            name:body.name
          }
          
        })
        const Username = user.name;
        const token = "Bearer "+ await sign({id: user.id},c.env.JWT_SECRET );
        return c.json({ Username, token});
    }
    catch(e){
        console.log(e);
      c.status(403);
      return c.json({
        error: "invalidee"
      })
    }
    
    
})

userRouter.post('/signin', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

const body = await c.req.json();
const {success} = signupInput.safeParse(body);
if(!success){
    c.status(401);
    return c.json({
        message: "input not correct"
    })
}
  try{
    const user  = await prisma.user.findFirst({
      where:{
        email:body.email,
        password:body.password
      }
    });
    if(!user){
      c.status(403);
      return c.json({error: "user not found"});
    }
    const Username = user.name;
    const token = "Bearer "+ await sign({id: user.id},c.env.JWT_SECRET );

      return c.json({Username, token});
  }
  catch(e){
    console.log(e);
    c.status(411);
    return c.text('invalid');
  }
})