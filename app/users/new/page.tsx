'use client';
// import { useRouter } from 'next/router'; this is part of the old pages router
import { useRouter } from 'next/navigation'; 

import React from 'react'

const NewUserPage = () => {
  const router = useRouter();    //a hook to get an access to a router object

  return (
    <button className='btn btn-primary '
    onClick={() => {router.push('/users')}}>create</button>  /*b/c we can't use link in onClick, we use programmatic navigation w/h is using a router object'*/
  )
}

// '/users' is the url of the target page
export default NewUserPage