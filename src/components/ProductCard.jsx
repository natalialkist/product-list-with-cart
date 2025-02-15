import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CartBtn from './CartButton';

class ProductCard extends Component {
    constructor() {
        super()
    }

    render() {
        const { id, title, thumbnail, price, addCart } = this.props;

        return (
            <div>
            <h2 data-testid="product-detail-name">{ title }</h2>
            <img
              data-testid="product-detail-image"
              src={ thumbnail }
              alt={ title }
              style={{ width: '120px' }}
            />
            <h4 data-testid="product-detail-price">{ price }</h4>
            <CartBtn addCart={addCart} />
          </div>
        )
    }
}

export default ProductCard;