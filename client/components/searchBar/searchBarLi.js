import React from 'react'
import {Link} from 'react-router-dom'

const SearchBarResultCard = ({product, setText}) => {
  return (
    <div className="product-search-container" onClick={() => setText('')}>
      <Link to={`/products/${product.id}`}>
        <div className="product-search-subdiv">
          <img className="product-search-image" src={product.imageUrl} />

          <div className="product-search-name">
            {product.name
              .split(' ')
              .slice(0, 5)
              .join(' ')}
          </div>
        </div>
      </Link>
      <div className="product-search-category">{product.category.name}</div>
      <div className="product-search-rating">{product.rating}</div>
    </div>
  )
}

export {SearchBarResultCard}
