import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import  prisma  from "@/prisma/client"  //client is the client file in prisma 

//handles get request
//getting a collection of user objects
export async function GET(request: NextRequest) { //request is an object
    //in this func, we recieve a request and return a response

    const users = await prisma.user.findMany();   //to get all the users in our db but we can also filter users with 'where property' look the doc
    return NextResponse.json(users);
} 

//if we remove the 'request' object from the GET func, next will cache the response

//handles post request for creating user objects:
//creating a user object
export async function POST(request: NextRequest) {
    const body = await request.json(); //to read the body of the request..it returns a promise 
    const validation = schema.safeParse(body); //to validate the body object/request object and it returns the validation result, the result might be an exception erro

    if (!validation.success)  
        return NextResponse.json(validation.error.errors, { status: 400})  //here we want the errors that are detected by zod..not hardcoded error like 'name is not defined'

    const user = await prisma.user.findUnique({
       where: { email: body.email}   //to check first if there already exists a user with same email and if so, to handle the 500 error(user with same email exists)
    });
        
    if (user)
        return NextResponse.json({ error: 'User already exists'}, { status:400 })

    const newUser = await prisma.user.create({  //we call the create method and await it to get the user object that was created in the prisma schema and it will be migrated to the db
        data: {
            name: body.name,    
            email: body.email    //the other properties are not required b/c we gave them default values
        }
    });


    return NextResponse.json(newUser, {status: 201});  //here we are returning the user object to the client
    } 