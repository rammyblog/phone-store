import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import PaystackButton from 'react-paystack';
import { ProductConsumer } from '../../context';

export default class CartTotals extends Component {


    state = {
        refNo : ''
    }


    componentDidMount(){
        console.log(this.props);

        
        // const { history } = this.props;
        // console.log(history);
    }
    

    componentDidUpdate(prevProps, prevState) {
        const { history } = this.props;
        console.log(history);
        if (prevState.refNo !== this.state.refNo) {
            console.log('we got here');

            return this.props.history.push('/invoice')

            // return <Redirect to="/invoice" />;
        }
      }
      
    
    callbackFunction = (response) => {

        this.setState({
            refNo : response.reference
        })
        console.log(response);
        
    }
    render() {
        // console.log(this.values);
        
        // const { match, location, history } = this.props

        
    return (        
        <React.Fragment>
            <ProductConsumer>
                {
                    value => {


                        const { cartSubTotal, cartTax, CartTotal, clearCart, paystackClose, getReference,email, paystackKey, paystackAmount } = value;

                        return (
                        <div className='container'>
                            <div className='row'>
                                <div className='col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right'>
                                    <Link to='/'>
                                        <button className='btn btn-outline-danger text-uppercase mb-3 px-5' 
                                            type='button'
                                            onClick={() => clearCart()}>

                                            Clear Cart
                                        </button>
                                    </Link>
                                    <h5>
                                        <span className='text-title'>subtotal:</span>
                                        <strong>$ {cartSubTotal}</strong>
                                    </h5>
                                    <h5>
                                        <span className='text-title'>tax:</span>
                                        <strong>$ {cartTax}</strong>
                                    </h5>
                                    <h5>
                                        <span className='text-title'>total:</span>
                                        <strong>$ {CartTotal}</strong>
                                    </h5>

                            

                                    <PaystackButton
                                    text="Make Payment"
                                    class="btn btn-outline-success"
                                    callback={this.callbackFunction}
                                    close={paystackClose}
                                    reference={getReference()}
                                    email={email}
                                    amount= {paystackAmount}
                                    paystackkey={paystackKey}
                                    tag="button"
                                />

                                </div>
                            
                            
                            </div>
                        </div>

                        )
                    }
                }

            </ProductConsumer>
        </React.Fragment>
       
    )
    }
}

