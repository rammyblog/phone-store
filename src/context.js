import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';
import {Redirect} from 'react-router-dom';


const ProductContext = React.createContext();

// Provider
// Consumer


class ProductProvider extends Component {
    state = {
        products : [],
        detailProduct : detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        CartTotal: 0,
        email: 'onasanyatunde67@gmail.com',
        payStackAmount: 0,
        paystackKey: "pk_test_66242613f73c8034560a3eecf9d248787f776bdb",
        refNo: ''

    };

    // To avoid mutating of data because the data is an array f object

    
    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        })
        this.setState(() => {
            return {products:tempProducts}
        })
    }

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) => {
       
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct:product}
        })
        
    }

   

    close = () => {
        console.log("Payment closed");
    }

    getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
        for( let i=0; i < 15; i++ ) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        }

        return text
        
            // this.setState( () => {
            //     return {
            //         refNo: text
            //     }
            // })
         
    }


    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index]
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(() => {
            return { 
                products:tempProducts, 
                cart:[...this.state.cart, product]
            }
        }, ()=> {
            this.addTotals()
        }
            )        
    }

    openModal = id => {
        console.log('jt');

        const product = this.getItem(id)
        this.setState(() => {
            return {modalProduct:product, modalOpen:true};
        })
    }
    
    closeModal = id => {
        this.setState(() => {
            return {modalOpen:false}
        })
    }

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]
        product.count += 1;
        product.total = product.count * product.price;
        this.setState(() => {
            return {cart: [...tempCart]}}, () => {this.addTotals()})
    }


    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]
        if (product.count !== 0) {
            product.count -= 1;
        }else{
            this.removeItem(id)
        }
        product.total = product.count * product.price;
        this.setState(() => {
            return {cart: [...tempCart]}}, () => {this.addTotals()})

    }

    removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart]
        tempCart = tempCart.filter(item => item.id !== id)
        const index = tempProducts.indexOf(this.getItem(id))
        let removedProduct = tempProducts[index]
        removedProduct.inCart = false
        removedProduct.count = 0
        removedProduct.total = 0

        this.setState(() => {
            return {
                cart:[...tempCart],
                products:[...tempProducts]
            }
        }, () => {
            this.addTotals()
        })
    }

    clearCart = () => {
       this.setState(() => {
           return {
               cart: []
           }
       }, () => {
           this.setProducts();
            this.addTotals()
       }
       )
        
    }

    addTotals = () => {
        let subtotal = 0;
        this.state.cart.map(item => (subtotal += item.total))
        const tempTax = subtotal * 0.1
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subtotal + tax
        const amount = parseInt(total * 363 * 100)

        this.setState( () => {
            return {
                cartSubTotal:subtotal,
                cartTax: tax,
                CartTotal:total,
                paystackAmount:amount
            }
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state, 
                handleDetail:this.handleDetail, 
                addToCart:this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                // callback : this.callback,
                paystackClose: this.close,
                getReference : this.getReference, 
            }}>

                {this.props.children}
                
            </ProductContext.Provider>
        )
    }
}


const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};