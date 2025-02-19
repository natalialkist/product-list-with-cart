import React from 'react';
import ProductCard from './components/ProductCard';
import ShoppingCart from './components/Cart';
import * as api from './services/api';
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      productsList: [],
      categories: [],
      cart: {},
    };
  }

  async componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const response = await api.getAllProducts();
      this.setState({ productsList: response, loading: false });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      this.setState({ loading: false });
    }
  }
  

  addCart = (product) => {
    const { cart } = this.state;
    const { id } = product;

    const newCart = cart[id] ? {
      ...cart,
      [id]: {
        ...cart[id],
        quantity: cart[id].quantity + 1,
      },
    } : {
      ...cart,
      [id]: {
        product,
        quantity: 1,
      },
    };

    this.setState({
      cart: newCart,
    });
  };

  removeFromCart = (product) => {
    const { cart } = this.state;
    const { id } = product;

    const updatedCart = {
      ...cart,
      [id]: {
        ...cart[id],
        quantity: cart[id].quantity - 1,
      },
    }

    if (updatedCart[id].quantity === 0) {
      delete updatedCart[id];
    }

    this.setState({
      cart: updatedCart,
    });
  }

  async fetchByCategory(categoryName) {
    const fetchList = await api.getProductsFromCategory(categoryName);
    this.setState({
      productsList: fetchList.results,
    });
  }

  render() {
    const { productsList } = this.state;
    
    return (
      <div className='bodyWrapper'>
        <h1>Products</h1>

        <div className='productsWrapper'>
          <div className='ProductsList'>
          {!this.state.loading ? (
            productsList.map((product) => (
              <div className='productCard'>
                <ProductCard
                  product={product}
                  addCart={this.addCart}
                  removeFromCart={this.removeFromCart}
                  cart={this.state.cart}
                />
              </div>
            ))
          ) : (
            <div className="loading-screen">
              <div className="spinner"></div>
            </div>
          )}
          </div>
          
          <div className='cartWrapper'>
            <ShoppingCart cart={this.state.cart} onCartChange={(updatedCart) => this.setState({ cart: updatedCart })} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;