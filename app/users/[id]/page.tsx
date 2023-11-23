import React from 'react'   // React is a variable, it is the default export from the 'react' module
import {notFound} from 'next/navigation'  //notFound is a variable, it is a specific named export from the 'next/navigation' module
// deep down, React is an object and notFound is a function...react and next/navigation are modules

interface Props {
    params: { id: number}
}

const UserDetailPage = ({ params: { id } }: Props) => { //this is distructured
  if (id > 10) notFound();
  return (
    <div>UserDetailPage {id}</div>
  )
}

export default UserDetailPage