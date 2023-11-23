'use client'; //this is the client directive
import React from 'react'


const AddToCart = () => {
  return (
    <div>
        <button className='btn btn-primary' onClick={()=> console.log('click')}>add to cart</button>
    </div>  )
} 

export default AddToCart