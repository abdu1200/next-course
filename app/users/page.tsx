import React, { Suspense } from 'react'
import UserTable from './UserTable'
import Link from 'next/link'

interface Props {
  searchParams : { sortOrder: string }
}

const UsersPage =  ({searchParams: { sortOrder }}:Props) => {
  return (
   <>
      <h1>Users</h1>
      <p>{new Date().toLocaleTimeString()}</p> {/*to see the effect start you app in prod mode*/}
      <Link href="/users/new" className='btn'>New User</Link>
      <Suspense fallback={<p>Loading...</p>}>
        <UserTable sortOrder={sortOrder} />   {/*here we are passing the query string parameter to the user table component*/} 
      </Suspense>
    </>
  ) 
}

export default UsersPage

{/* 
  <ul>
  {users.map((user) => <li key={user.id}> {user.name} </li>)}
  <ul/>   

  ...the above is to list the data as a list
*/}