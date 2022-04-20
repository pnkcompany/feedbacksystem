import React from 'react'

const ProductRow = ({ image, name, price, id, getReviews }) => {
  function handleClick(e) {
    e.preventDefault()
    getReviews(id) // pass any argument to the callback
  }
  return (
    <div className='row product'>
      <div className='col-md-2'>
        <img src={image} alt={name} height='150' />
      </div>
      <div className='col-md-6 product-detail'>
        <h4>{name}</h4>
        <button onClick={handleClick}>Review</button>
      </div>
      <div className='col-md-2 product-price'>{price}</div>
    </div>
  )
}

export default ProductRow
