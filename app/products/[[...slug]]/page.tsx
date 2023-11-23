import React from 'react'

interface Props {
    params: { slug: string[] };
    searchParams: { sortOrder: string }  //for accessing a query string parameter
}

const ProductPage = ({ params: { slug }, searchParams: { sortOrder } }:Props) => {
  return (
    <div>ProductPage {slug} {sortOrder} </div>
  )
}

export default ProductPage