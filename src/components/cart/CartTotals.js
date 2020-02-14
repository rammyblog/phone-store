import React, { Component } from "react"
import { Link } from "react-router-dom"
import PaystackButton from "react-paystack"

import { WithContext } from "../../withContext"
class CartTotals extends Component {
  state = {
    inRefNo: ""
  }

  componentDidMount() {
    const { refNo } = this.props.value
    this.setState({
      inRefNo: refNo
    })
  }
  componentDidUpdate(prevProps, prevState) {
    const { refNo } = this.props.value
    console.log(prevState)

    if (prevState.inRefNo !== refNo) {
      return this.props.history.push("/invoice")
    }
  }

  callbackFunction = response => {
    const { setRefenceCode } = this.props.value
    setRefenceCode(response.reference)
  }
  render() {
    const {
      cartSubTotal,
      cartTax,
      CartTotal,
      clearCart,
      paystackClose,
      getReference,
      email,
      paystackKey,
      paystackAmount
    } = this.props.value

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
              <Link to="/">
                <button
                  className="btn btn-outline-danger text-uppercase mb-3 px-5"
                  type="button"
                  onClick={() => clearCart()}
                >
                  Clear Cart
                </button>
              </Link>
              <h5>
                <span className="text-title">subtotal:</span>
                <strong>$ {cartSubTotal}</strong>
              </h5>
              <h5>
                <span className="text-title">tax:</span>
                <strong>$ {cartTax}</strong>
              </h5>
              <h5>
                <span className="text-title">total:</span>
                <strong>$ {CartTotal}</strong>
              </h5>

              <PaystackButton
                text="Make Payment"
                class="btn btn-outline-success"
                callback={this.callbackFunction}
                close={paystackClose}
                reference={getReference()}
                email={email}
                amount={paystackAmount}
                paystackkey={paystackKey}
                tag="button"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default WithContext(CartTotals)
