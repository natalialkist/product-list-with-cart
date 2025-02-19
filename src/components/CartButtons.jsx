import React, { Component } from 'react';
import addCartIcon from  '../../assets/images/icon-add-to-cart.svg?url'
import incrementQuantity from '../../assets/images/icon-increment-quantity.svg?url'
import decrementQuantity from '../../assets/images/icon-decrement-quantity.svg?url'
import "./CartButtons.css"

class CartButtons extends Component {
  render() {
    const { addCart, cart, product, removeFromCart } = this.props;

    return cart[product.id] && cart[product.id].quantity > 0 ? (
      <div className='cartButtonsWrapper' style={{ backgroundColor: "#c83b0e" }}>
        <div className='cartQntBtns' onClick={() => removeFromCart(product)}>
          <img src={decrementQuantity} alt="Diminuir quantidade no carrinho" />
        </div>
        <p>{cart[product.id].quantity}</p>
        <div className='cartQntBtns' onClick={() => addCart(product)}>
          <img src={incrementQuantity} alt="Aumentar quantidade no carrinho" />
        </div>
      </div>
    ) : (
      <div className='cartButtonsWrapper'>      
        <button className='addToCartBtn' onClick={() => addCart(product)}>
          <img src={addCartIcon} alt="Ícone do carrinho" style={{ paddingRight: '5px' }}/>
          Add to Cart
        </button>
      </div>
    );
  }
}

export default CartButtons;