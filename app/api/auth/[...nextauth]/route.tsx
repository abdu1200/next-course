import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import  prisma  from "@/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

 //authOptions is for initializing NextAuth
 //authOptions is a constant
 //NextAuthOptions is anotating for authOptions... it is to give a type...it is also useful for auto completion for inside codes
 

 export const AuthOptions: NextAuthOptions = {  //we set our providers in this configuaration object
  adapter: PrismaAdapter(prisma), //here we are specifying an adapter as part of initializing NextAuth
 
  providers: [    //we set providers to an array and in this array, we can have one or more providers
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",

      credentials: { //this object is used to generate the form on the signin page
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) { //the authorize func is to authorize the user and make sure they have supplied the right username and password combination 
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.email || !credentials.password) return null; //this is to check the format of email given and password given if wrong then null otherwise...
        //otherwise we have to look up this user by this email in our db and for that we use our prisma client

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) return null; //if there is no user with that email we return null otherwise, we have to check their password to make sure they match and for that we use a library called 'Bcrypt'
        //using bcrypt, we can encrypt passwords upon inserting them in the database
        const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword!); //here we compare two passwords, the one that is passed in the credentials object and the one in the users model
        // ! is b/c hashedPassword is optional(can be null or string) and compare method can not accept null, we remove the error by putting ! at the end

        return passwordsMatch ? user : null; 

        // if (user) {
        //   // Any object returned will be saved in `user` property of the JWT
        //   return user
        // } else {
        //   // If you return null then an error will be displayed advising the user to check their details.
        //   return null

        //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // }
        
      } //if the user is valid, the authorize func returns a valid user object otherwise null
    }), 

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,  //to tell the typescript compiler that we definitely have a value stored in this environmental variable, w/h means the value is not undefined it is a string otherwise it yells at us
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!  
    })
  ],
  session: {
    strategy: 'jwt'
  }
} //we are exporting the configuration object as a separate constant, so that we can use it outside of this module as authOptions

 const handler = NextAuth(AuthOptions);  //it is a handler function and we call it and  give it a configration object

 export { handler as GET, handler as POST }  //we know that in route file, we have to export functions like get, post,...and we are exporting these functions as two d/t names

//any get or post request sent to this endpoint will be handled inside this 'handler' function
//here we are learning that, nextauth expose a bunch of endpoints that starts with '/auth'...eg for google providers authentication service, 'http://localhost:3000/api/auth/callback/google'
//we said this page is a route handler that handles endpoints or requests that starts with '/auth'
//with 'process.env, we can read our environmental variables


//this is the route file we use for initialzing NextAuth