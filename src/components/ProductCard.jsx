import React, { Component } from 'react';
import CartButtons from './CartButtons';
import './ProductCard.css'

class ProductCard extends Component {
    constructor() {
        super()
    }

    render() {
        const { product, addCart, cart, removeFromCart } = this.props;

        return (
            <div key={product.id} className='productCardWrapper'>
                <div className='imageButtonsWrapper'>
                    <img
                    src={ product.image }
                    alt={ product.title }
                    className={`productCardImage ${cart[product.id]?.quantity > 0 ? 'selected' : ''}`}
                    />
                    <CartButtons addCart={addCart} cart={cart} product={ product } removeFromCart={removeFromCart} />
                </div>
                <div className='cardInfoWrapper'>
                    <span>{ product.category }</span>
                    <h4 className='productTitle'>{ product.title }</h4>
                    <h4>${ product.price.toFixed(2) }</h4>
                </div>
            </div>
        )
    }
}

export default ProductCard;