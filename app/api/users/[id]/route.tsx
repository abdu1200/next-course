import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client"

// interface Props {
//     params: { id: number}  //this id can not be type number, b/c id as a string is what we get a runtime 
// }

//getting a single user object
export async function GET(request: NextRequest, {params}: {params: {id: string}} ) { //the values in the url or endpoint is treated as a string even though there is a number
    
    const user = await prisma.user.findUnique({  //we get a single user object
        where: { id: parseInt(params.id) }  //here id is type Int(w/h is defined in the model) and params.id is type String
    })

    if (!user) //if that user with that id is not there
        return NextResponse.json({ error: 'User not found'}, { status: 400})

    return NextResponse.json(user);
}


//updating a user object
export async function PUT(request: NextRequest, {params}: {params: {id: string}} ) {

    // Validate the request body
const body = await request.json();
const validation = schema.safeParse(body); //to validate the body object/request object and it returns the validation result

if (!validation.success)  
    return NextResponse.json(validation.error.errors, { status: 400})  //here we want the errors that are detected by zod..not hardcoded error like 'name is not defined'


    const user = await prisma.user.findUnique({ //we await the call to get a user object 
        where: { id: parseInt(params.id) }
    })

    if (!user)   //if the user doesn't exist, we return below error, otherwise we update it in db
        return NextResponse.json( {error: 'user not found'}, {status: 404}) // If doesn't exist, return 404

    // Update the user
    const updatedUser = await prisma.user.update({ //we await the call and this returns the updated user
        where: { id: user.id}, //the user we want to update
        data: {     //the data we want to update
            name: body.name,
            email: body.email
        }
    })

    return NextResponse.json(updatedUser);
    // Return it to the client to see

}


//Delete request handler
export async function DELETE(request: NextRequest, {params}: {params: {id: string}} ) {

    const user = await prisma.user.findUnique({ //we await the call to get a user
        where: { id: parseInt(params.id) }
    })
    
    if (!user)
        return NextResponse.json({ error: 'User not found' }, { status: 404})

    await prisma.user.delete({  //we await the call and return an empty response
        where: { id: user.id}
    })

    return NextResponse.json({})

}