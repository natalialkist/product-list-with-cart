import React, { Component } from 'react';
import addCartIcon from  '../../assets/images/icon-add-to-cart.svg?url'

class CartBtn extends Component {
  render() {
    const { addCart } = this.props;
    return ( // botao que leva ao carrinho
      <button onClick={
        () => addCart({
        title: productDetails.title,
        price: productDetails.price,
        thumbnail: productDetails.thumbnail,
        id: productDetails.id,
        })
      }>
        <img src={addCartIcon} alt="Ícone do carrinho" />
        Adicionar ao Carrinho
      </button>
    );
  }
}

export default CartBtn;