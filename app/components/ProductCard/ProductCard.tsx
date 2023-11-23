// 'use client';   //this is the client directive
import React from 'react'
import AddToCart from '../AddToCart';
// import styles from './ProductCard.module.css'; //styles is a js object and the classes that we define in the css module are the properties of that object

const productCard = () => {
  return (
    <div className='p-5 my-5 bg-cyan-400 text-white text-xl hover:bg-sky-500' >
        <h1>this is the product card</h1>
        <AddToCart />
    </div>
  )
}

export default productCard

// <div className={styles.cardContainer} > ...