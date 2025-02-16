import PropTypes from 'prop-types';
import React, { Component } from 'react';
import emptyCardImg from '../../assets/images/illustration-empty-cart.svg?url'

class ShoppingCart extends Component {
    state = {
        quantity: 0
    }

    componentDidMount() {
        this.cartQuantity()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cart !== this.props.cart) {
            this.cartQuantity()
        }
    }
    
    cartQuantity = () => {
        const quantity = Object.values(this.props.cart).reduce((acc, item) => acc + item.quantity, 0);
        this.setState({ quantity });
    }

    render() {
    const { cart } = this.props;
    console.log({ quantity: this.state.quantity, cart })

    return (
      <>
        <h3>{`Your Cart (${this.state.quantity})`}</h3>
        <div className="shopping-cart">
            { Object.keys(cart).length > 0 ? (
            Object.values(cart).map((item) => (
                <div key={ item.product.title }>
                <p data-testid="shopping-cart-product-name">{ item.product.title }</p>
                <p>{ item.product.price }</p>
                <p data-testid="shopping-cart-product-quantity">{ item.quantity }</p>
                </div>
            ))
            ) : (
            <img src={emptyCardImg} alt='Empty card' />
            )}
        </div>
      </>
    );
  }
}

ShoppingCart.propTypes = {
  cart: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
};

export default ShoppingCart;