import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import UserService from '../services/user.service'
import EventBus from '../common/EventBus'
import ProductRow from './ProductRow'

const Product = () => {
  const [content, setContent] = useState([])
  let navigate = useNavigate()
  useEffect(() => {
    UserService.getProducts().then(
      (response) => {
        setContent((old) => [...old, ...response.data])
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()

        setContent([..._content, `Entry ${_content.length}`])

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout')
        }
      }
    )
  }, [])
  let getReviews = (id) => {
    navigate('/review/' + id)
    window.location.reload()
  }

  return (
    <div className='container'>
      <div className='container main-content'>
        {content.map((prod) => {
          return [
            <ProductRow
              key={prod.id}
              id={prod.id}
              image={prod.photo}
              name={prod.name}
              price={prod.price}
              getReviews={getReviews}
            />,
          ]
        })}
      </div>
    </div>
  )
}

export default Product
