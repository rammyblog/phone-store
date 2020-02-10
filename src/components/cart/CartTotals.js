import React from 'react';
import {Link} from 'react-router-dom';
import PaystackButton from 'react-paystack';

export default function CartTotals({value}) {
    const { cartSubTotal, cartTax, CartTotal, clearCart, callback, paystackClose, getReference,email, paystackKey, paystackAmount } = value;
    return (

        <React.Fragment>
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
                        callback={callback}
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
        </React.Fragment>
       
    )
}
