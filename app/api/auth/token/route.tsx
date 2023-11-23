import { getToken } from 'next-auth/jwt'; //jwt - json web token
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const token = await getToken({ req: request });
    return NextResponse.json(token);
}


//we use this page just to see a json web token

//here we get a json object(json web token) with properties like name, email, picture and these are all the pieces of info we receive from google about the user or client
//and the authentication session of a user is represented by json web token
//authentication session means the user is already authenticated and using the app
//by default our tokens are valid for 30 days
//the json web token is like an id card the client sends to server each each request
