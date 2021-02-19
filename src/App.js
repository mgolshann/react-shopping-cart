import React from 'react';
import './index.css';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      products: data.products,
      cardItems: [],
      size: "",
      sort: ""
    }

  }

  removeFromCart = product => {
    const cardItems = this.state.cardItems.slice();
    let hasChange = false;
    cardItems.map((item) => {
      if (item._id === product._id) {
        if (item.count > 1) {
          item.count--;
        } else {
          hasChange = true;
        }
      }
    });
    
    (hasChange) 
      ? this.setState({ cardItems :  cardItems.filter(x=> x._id !== product._id)})
      : this.setState({ cardItems });
  }

  addToCart = product => {
    const cardItems = this.state.cardItems.slice();
    console.log(cardItems);
    let alreadyInCart = false;
    cardItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cardItems.push({ ...product, count: 1 })
    }
    this.setState({ cardItems });
  }

  sortProducts = event => {
    let sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) => (
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id < b._id
                ? 1
                : -1
        ))
    }))
  }

  filterProducts = event => {
    let size = event.target.value;
    if (size === "") {
      this.setState({
        size: size,
        products: data.products
      })
    } else {
      this.setState({
        size: size,
        products: data.products.filter((product) => product.availableSizes.indexOf(size) >= 0)
      });
    }
  }




  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <main className="main">
              <Filter
                size={this.state.size}
                sort={this.state.sort}
                count={this.state.products.length}
                sortProducts={this.sortProducts}
                filterProducts={this.filterProducts}
              ></Filter>
              <Products
                products={this.state.products}
                addToCart={this.addToCart}></Products>
            </main>
            <div className="sidebar">
              <Cart
                removeFromCart={this.removeFromCart}
                cardItems={this.state.cardItems}></Cart>
            </div>
          </div>
        </main>
        <footer>All right is reserved .</footer>
      </div>
    );
  }
}
export default App;
