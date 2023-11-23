import { NextRequest, NextResponse } from "next/server";
import middleware from "next-auth/middleware";
// export function middleware(request: NextRequest) {
//     return NextResponse.redirect(new URL('/new-page', request.url ))  // the 2nd argument is the base url of our website
//  } this is to show how the implementation looks like but the middleware function is given to us by NextAuth, we just export it
// the above function gets executed on every request
//but we don't want it to be executed all the time(for all requests) but for some cases and to control that we use the 'config'


export default middleware;  // by default, it redirects to the login page
// to export it in one go at the top, export { default } from 'next-auth/middleware';
// with that we are exporting the default object that is imported by the module

export const config = {
    matcher: ['/dashboard/:path*']  // in this case, our middleware function will be executed only if we hit the '/users' endpoint
} // this is how we protect our routes

// ['/users/:id'] - id is a parameter
// ['/users/:id*'] -  '*' means 0 or more parameters
// ['/users/:id+'] - '+' means 1 or more parameters
// ['/users/:id?'] - '?' means 0 or 1 parameter