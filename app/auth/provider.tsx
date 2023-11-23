'use client';

import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'


const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default AuthProvider

//this a separate client component to wrap the session provider, b/c we can only use react context in client component