"use client";

import Image from 'next/image'
import Link from 'next/link'  
import ProductCard from './components/ProductCard/ProductCard'
import { AuthOptions } from './api/auth/[...nextauth]/route'
// import { getServerSession } from 'next-auth'
import kma from '@/public/images/kman.jpg'
import { Metadata } from 'next'
// import HeavyComponent from './components/HeavyComponent' ...this was to import is statically
// import { useState } from 'react' 
// import dynamic from 'next/dynamic'   
//import _ from 'lodash'   :to import lodash library statically


// importing HeavyComponent dynamically
// const HeavyComponent = dynamic(  //we call it and we give it a loader function and in the loader func, we use the import func to import the heavy comp and this dynamic function call returns our component
//   () => import('./components/HeavyComponent'),
//   { 
//     loading: () => <p>Loading...</p>,
//     ssr: false 
//   }); 
//and now if you look at js bundle for this page(page.js) in the network(js filter) and in that file, go to the response and search MyHeavyComponent, you will not get it b/c it is not downloaded or loaded...it will be loaded or downloaded or served only when the user clicks the button or needs it
//and also when the user clicks the button, it will be another specific bundle request to the server to download the heavy component not in the page.js bundle...the specific request bundle for the heavy comp is named like '_app-pages-browser...'
//when loading components dynmaically, as a 2nd argument to the dynamic func, we pass an options object, and in there we pass a loading func for showing a loading indicator
//when importing server comps to client comps, by default they are rendered on the server and this can cause issues b/c if they access browser api's on the server, they'll end up getting errors b/c the browser api's are not available on the server...so we should disable prerendering on the server by setting ssr to false on options object

export default async function Home() {
  //here for the purpose of learning lazy loading with heavy component we made this comp a client comp but for server session, it must be a server comp and the comp(func) is async
  //  ..    const session = await getServerSession(authOptions); //we pass it our authentication options/configuration object
  //and the call returns a promise so we await it and get the session

  // const [isVisible, setVisible] = useState(false);//the state variable for showing the heavy component
  
  return (
    <main className='relative h-screen'>       
      {/* .. <h1 className='font-poppins'>Hello { session && <span>{session.user!.name}</span>}</h1> */}
      <Link href="/users">users</Link>  {/*we use Link component to remove unncessary reload*/}
      <ProductCard />  

      {/* for HeavyComponent
      <button onClick={() => setVisible(true)}>Show</button> to show the heavy comp(when the user clicks the button)
      {isVisible && <HeavyComponent />} */}

      <button onClick={async () => {
        // const x = import('lodash');  if we put the cursor on x, we can see that the import func returns a promise and if we await it, we get an object with properties(and that obj is a js module) .. so if we await it we get a module
        const _ = (await import('lodash')).default;  //we wrap it to access the properies of the module
        //and we are picking the 'default' object that is exported from the lodash module....and now lodash is not included in our page bundle...it is loaded after we click the 'show' button
        //when we click on the 'show' button, in the dev tools, we get a separate request send to the backend to load 'lodash'
        //the above 4 lines are for importing the 'lodash' library dynamically

        const users = [
          { name: 'c'},
          { name: 'b'},
          { name: 'a'}
        ];

        const sorted = _.orderBy(users, ['name']);   //as a 2nd arg we pass an array of string that determines the properties we wanna use for sorting
        console.log(sorted)
      }}>Show</button> {/*when the user clicks on this button, we wanna sort a list of users*/}

      
    </main>
  )
  
}

// overwriting the metadata in any page
// export const metadata: Metadata = { //we anotate this with the Metadata type defined in the 'next' module
//   title: '...',
// }   




// dynamically generating a metadata
// export async function generateMetadata(): Promise<Metadata>  {  //this function should return a promise of metadata
//   const product = await fetch(''); //here we fetch something from an api and await it to get the product or   //or using prisma we get the product from the database

//   return {  //we return a metadata object based on the product
//     title: 'product.title',
//     description: 'product.description'
//   }
// }



//normal note:
//the getServerSession function works on both pages and route handlers
//if we have an api that needs to access the current session, in that api, we can call this function 


        

 



      //using Image componet in next js

      // <Image src={kma} alt="kman pic" ></Image>   {/* kma is an object */}
      // <Image 
      // src="https://static01.nyt.com/images/2022/12/30/multimedia/30soccer-ronaldo-1-76fd/30soccer-ronaldo-1-76fd-jumbo.jpg?quality=75&auto=webp"
      // alt="the goat" 
      // fill 
      // style={{ objectFit: 'cover'}}
      // sizes='(max-width: 480px) 100vw, (max-width: 768px) 50vvw, 33vw'
      // quality={75}
      // priority />
      
      {/* this time we pass a string(for remote images)   */}
      {/* for the above string or the domain to work, we have to register it in our next configuration file and to see how, search  'next image' to img comp to search 'remote patterns'  */}
      {/* with remote images, we need to provide a dimension b/c next js doesn't know their size ahead of time but with local images, it automatically detects their size*/}
      {/* or to make the images responsive, we can pass the 'fill' prop and in this case, we don't need to explicitly give the dimensions*/}
      {/* to fit properly to the given screen, we give it a style, or tailwind style: className="object-cover" */}
      {/* the sizes prop determines how much of the width of the viewport the image is gonna take  */}
      {/*'to see the effect' on the responsiveness, add a grid with 3 columns(of image)...so the sizes prop doesn't impact the size of the image on the screen, it is only for next js to know how it should serve d/t images to d/t devices */}
      {/* for priority prop, by default, image comp uses lazy loading where our images are only retrieved or downloaded when they are visible on the viewport(or when we see them), they are downloaded when we see them but we set priority if we want our images to be visible right from the get go*/}
      {/* Correct, setting the priority prop in the next/image component does not change the order in which the images are presented to the user on the page. Instead, it influences the order in which the images are loaded by the browser. */}
  
      {/* if we make the 'main' element relative,  we should give a height to the parent element(to it) b/c by default it would be 0....h-screen means 100% of a height of the viewport*/}

      //when we use the Image comp, we are requesting the next js to give us an optimized image...check filter by img to headers in dev tools
      //when we use 'fill', the parent element should have a position of relative or absolute or ..