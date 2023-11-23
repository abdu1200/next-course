'use client';  //note that it is not for listening any browser event or accessing any browser api
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  const {status, data: session} = useSession();  //we call useSession and we get an object with a few properties and we destructure them
// in the above we are renaming data with session

  return (
    <div className='flex bg-slate-200 p-5 space-x-3'>
        <Link href="/" className='mr-5'>Next.js</Link>
        <Link href="/users" >Users</Link>
        { status === 'loading' && <div> loading... </div>}
        { status === 'authenticated' &&
         <div>{session.user!.name} 
         <Link href='/api/auth/signout' className='ml-3'>Signout</Link>
         </div>}  {/* the user property is optional b/c when the status is loading, we don't have a user object but at this moment since the status is authenticated, we use the exclamation mark to tell the typescript compiler that we definitely have a user*/}
        { status === 'unauthenticated' && <Link href="/api/auth/signin">Login</Link> } {/*this is another endpoint that is exposed by /auth or NextAuth*/}
    </div>
  )
}

export default NavBar

//in the above, we want to render the login link only if the status is unauthenticated
//we have to make this comp a client comp b/c 1. we are using useSession hook 2. with useSession hook we access the context object(react context object) that is passed using the session provider