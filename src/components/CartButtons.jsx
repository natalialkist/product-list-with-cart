import React, { Component } from 'react';
import addCartIcon from  '../../assets/images/icon-add-to-cart.svg?url'
import incrementQuantity from '../../assets/images/icon-increment-quantity.svg?url'
import decrementQuantity from '../../assets/images/icon-decrement-quantity.svg?url'
import "../App.css"

class CartButtons extends Component {
  render() {
    const { addCart, cart, product, removeFromCart } = this.props;
    return cart[product.id] && cart[product.id].quantity > 0 ? (
      <div className='cartButtonsWrapper'>
        <button className='cartButtons' onClick={() => removeFromCart(product)}>
          <img src={decrementQuantity} alt="Diminuir quantidade no carrinho" />
        </button>
        <p>{cart[product.id].quantity}</p>
        <button className='cartButtons' onClick={() => addCart(product)}>
          <img src={incrementQuantity} alt="Aumentar quantidade no carrinho" />
        </button>
      </div>
    ) : (
      <div className='cartButtonsWrapper'>      
        <button onClick={() => addCart(product)}>
          <img src={addCartIcon} alt="Ícone do carrinho" />
          Add to Cart
        </button>
      </div>
    );
  }
}

export default CartButtons;