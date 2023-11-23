import React from 'react'
import Link from 'next/link'
import { sort } from 'fast-sort';

interface User {  //this is an interface or type 'User'
    id: number,
    name: string,
    email: string
  }

interface Props {
  sortOrder: string;
}

const UserTable = async ({ sortOrder }: Props) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', 
    // or the options object can be  {next: { revalidate : 10 }}  next js will refresh the data from the backend in the background every 10 second and puts them in to the data cache
    );    //caching behaviour is only applied on fetching

  const users: User[] = await res.json()

  const sortedUsers = sort(users).asc(
    sortOrder === "email"
      ? (user) => user.email
      : (user) => user.name
  );  //sorting the table by name or email logic

  return (
    <div><table className='table table-bordered'>
    <thead>
      <tr>
        <th>
          <Link href="/users?sortOrder=name">Name</Link>
        </th>
        <th>
          <Link href="/users?sortOrder=email">Email</Link>
        </th>
      </tr>
    </thead>
    <tbody>
      {sortedUsers.map((user) => <tr key={user.id}> 
        <td>{user.name}</td>
        <td>{user.email}</td>
       </tr>)}
    </tbody>
  </table></div>
  )
}

export default UserTable