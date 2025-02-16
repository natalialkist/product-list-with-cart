import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CartButtons from './CartButtons';
import '../App.css'

class ProductCard extends Component {
    constructor() {
        super()
    }

    render() {
        const { product, addCart, cart, removeFromCart } = this.props;

        return (
            <div key={product.id}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <img
                    src={ product.image }
                    alt={ product.title }
                    style={{ width: '100%' }}
                    />
                    <CartButtons addCart={addCart} cart={cart} product={ product } removeFromCart={removeFromCart} />
                </div>
                <p>{ product.category }</p>
                <h4 className='productTitle'>{ product.title }</h4>
                <h4 data-testid="product-detail-price">${ product.price }</h4>
            </div>
        )
    }
}

export default ProductCard;