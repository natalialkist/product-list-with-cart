import PropTypes from 'prop-types';
import React, { Component } from 'react';
import emptyCartImg from '../../assets/images/empty-cart-icon.png'
import carbonNeutralIcon from '../../assets/images/icon-carbon-neutral.svg?url'
import removeItemIcon from '../../assets/images/icon-remove-item.svg?url'
import OrderConfirmationDialog from './OrderConfirmationDialog';
import "./Cart.css"

class ShoppingCart extends Component {
    state = {
        quantity: 0,
        total: 0,
        isDialogOpen: false,
    }

    componentDidMount() {
        this.cartQuantityAndTotal()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cart !== this.props.cart) {
            this.cartQuantityAndTotal()
        }
    }
    
    cartQuantityAndTotal = () => {
        const quantity = Object.values(this.props.cart).reduce((acc, item) => acc + item.quantity, 0);
        const total = Object.values(this.props.cart).reduce((acc, item) => acc + item.product.price * item.quantity, 0)
        this.setState({ quantity, total: total.toFixed(2) });
    }

    render() {
        const { cart, onCartChange } = this.props;

        return (
        <div className='cart'>
            <h2>{`Your Cart (${this.state.quantity})`}</h2>
            <div className='cartItemsWrapper'>
                { Object.keys(cart).length > 0 ? (
                    <>
                        { Object.values(cart).map((item) => (
                            <div key={ item.product.id } className="cartItem">
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <span className='cartItemTitle'>{ item.product.title }</span>
                                    <div className='cartItemDetails'>
                                        <span className='cartItemQuantity'>{ item.quantity }x</span>
                                        <span className='cartItemEachPrice'>${ item.product.price.toFixed(2) }</span>
                                        <span className='cartItemTotalPrice'>${(item.quantity * item.product.price).toFixed(2)}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        const updatedCart = { ...cart }
                                        delete updatedCart[item.product.id];
                                        onCartChange(updatedCart)
                                    }}
                                >
                                    <img src={removeItemIcon} alt='Remove item icon' width='18' height='18' />
                                </button>
                            </div>
                        ))}
                        <div className='orderTotalWrapper'>
                            <span>Order Total</span>
                            <span>${this.state.total}</span>
                        </div>
                        <div className='cartFooterItemsWrapper'>
                            <div className="carbonNeutral">
                                <img src={carbonNeutralIcon} alt="Carbon neutral icon" width="24" height="24" style={{ paddingRight: '5px'}} />
                                <p>This is a <strong>carbon-neutral</strong> delivery</p>
                            </div>
                        </div>
                    
                        <div className='cartFooterItemsWrapper'>
                            <button className='confirmOrderButton' onClick={() => this.setState({ isDialogOpen: true })}>Confirm Order</button>
                        </div>
                    </>
                ) : (
                    <div className='emptyCart'>
                        <img src={emptyCartImg} alt='Empty cart' className='emptyCartImg' />
                        <p>Your added items will appear here</p>
                    </div>
                )}
            </div>
            <OrderConfirmationDialog cart={cart} cleanCart={onCartChange} isOpen={this.state.isDialogOpen} onClose={() => this.setState({ isDialogOpen: false })} total={this.state.total} />
        </div>
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