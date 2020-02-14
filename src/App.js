import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/cart/Cart';
import Default from './components/Default';
import Modal from './components/Modal';
import Invoice from './components/cart/Invoice';

export class App extends Component {
  render() {
    return (
        <React.Fragment>
          <Navbar/>  
            <Switch>
              <Route exact path='/' component={ProductList}/>
              <Route exact path='/details' component={Details}/>
              <Route exact path='/cart' component={Cart}/>
              <Route exact path='/invoice' component={Invoice}/>
              <Route component={Default}/>
            </Switch>

          <Modal />
        </React.Fragment>
    
    )
  }
}

export default App
