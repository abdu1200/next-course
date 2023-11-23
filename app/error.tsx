'use client';
import React from 'react'

interface Props {
    error: Error,
    reset: () => void; 
}

const ErrorPage = ({error,reset}: Props) => { //next js automatically pass the error object and the reset function to this component
  console.log('Error', error)  //we are logging our error to the console so the user can see
  return (
    <>
        <div>An Unexpected error has occured</div>
        <button className="btn" onClick={() => reset()}>Retry</button>  {/*we use reset function for the user to try if the error is temporary*/}
    </>
    )
}
//this is a client comp b/c we are handling the click event for the Retry button
export default ErrorPage