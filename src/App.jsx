import React from 'react';
import ProductCard from './components/ProductCard';
import ShoppingCart from './components/Cart';
import * as api from './services/api';
import './App.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productsList: [],
      categories: [],
      cart: {},
    };
  }

  componentDidMount() {
    api.getAllProducts().then((response) => this.setState({ productsList: response}))
    api.getCategories()
      .then((response) => this.setState({ categories: response }));
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

    localStorage.setItem('cart', JSON.stringify(newCart));
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

    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
        <h1>Produtos</h1>

        <div className='productsWrapper'>
          <div className='ProductsList'>
          {productsList?.length > 0 ? (
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
            <p>Nenhum produto foi encontrado</p>
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