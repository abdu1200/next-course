import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";   //to validate the request object
import Prisma  from '@/prisma/client'
import bcrypt from 'bcrypt';


const schema = z.object({ //here we are creating a schema for validation
    email: z.string().email(),
    password: z.string().min(5)
})

//post request handler...to register with credentials
export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = schema.safeParse(body) //we get the validation object
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })
    //now if the user is valid, then we have to make sure that the same email doesn't exist in our db
    const user = await Prisma.user.findUnique({ where: { email: body.email }}) //we await the call to get a user object

    if (user) 
        return NextResponse.json({ error: 'User already exists'}, { status: 400})
    //but if there is no user with the same email, we will create this user but first we have to hash their password
    //to hash or encrypt the password, we use 'encrpt'
    const hashedPassword = await bcrypt.hash(body.password, 10)  //for the 2nd arg, the higher the number, the slower the encryption but more secure
    
    //now we create the user
    const newUser = await Prisma.user.create({
        data: {
            email: body.email,
            hashedPassword
        }
    });

    return NextResponse.json({ email: newUser.email });
    }
