//      import { PrismaClient } from "@prisma/client";

//      const prisma = new PrismaClient(); //here we create an instance of PrismaClient

// 'prisma.user' -  in this object, we have access to the models we have defined in our schenma
// and also we have a method for creating, updating, reading and deleting users
// 'prisma.user.create()' - to create a user
// anytime we change a model and creat a migration, prisma cli automatically regenerates PrismaClient to sync with our models
// for best practices, there should be a single instance of PrismaClient in our app 



//      export default prisma; 

//when we import this client module in another file for the first time, the PrismaClient instance will be created by executing the above code
//but if we import it also in another file, the above code will not be reexecuted b/c it was cached, so the alredy created cached instance will be reused
//in next js, we have fast refreshes, and b/c of that any time we change our source code, next js refreshes some of our modules and in that case we end up having too many PrismaClients 
//fast refresh only happens in development not production
//and to fix that, search the prisma documentation, search 'prisma nextjs prismaclient'

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton() //it is using this global namespace to store a single instance of prisma
//if there is a prisma object/prismaclient in the global space, it is used..otherwise a new prismaclient is created

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
