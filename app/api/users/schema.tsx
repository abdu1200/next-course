import { z } from 'zod';

const schema = z.object({       //we call the object methods by passing an object for defining the shape of our user object in the request body and it return a schema
    name: z.string().min(3),
    email: z.string().email(),   //a string of type email
    // age: z.number()
})

//using the above syntax, we define our validation rules

export default schema; //and we export the schema as a default object from this module