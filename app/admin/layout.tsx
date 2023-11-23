import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

//common ui or layout for all admin pages
const AdminLayout = ( {children}: Props) => {
  return (
    <div className='flex'>
        <aside className='bg-slate-200 p-5 mr-5'>Admin Sidebar</aside>
        <div>{children}</div> 
    </div>
  )
}
// {children} can be any of the admin pages

export default AdminLayout