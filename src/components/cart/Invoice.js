import React, { Component, Fragment } from 'react'
import { ProductConsumer } from '../../context';


export default class Invoice extends Component {
    render() {
        return (

            <section>
                <ProductConsumer>
                    { value => {
                        const {refNo, cart, payStackAmount, cartTax, CartTotal } = value
                        return (
                            <Fragment>
                                <div className="invoice-box">
        <table cellSpacing={0} cellPadding={0}>
          <tbody><tr className="top">
              <td colSpan={2}>
                <table>
                  <tbody><tr>
                      <td className="title">
                        <img src="https://www.sparksuite.com/images/logo.png" style={{width: '100%', maxWidth: '300px'}} />
                      </td>
                      <td>
                        Invoice #:{refNo}<br />
                        Created: {todayDate()} <br />
                        Due: {todayDate()}
                      </td>
                    </tr>
                  </tbody></table>
              </td>
            </tr>
            <tr className="information">
              <td colSpan={2}>
                <table>
                  <tbody><tr>
                      <td>
                        e Phone Store.<br />
                        Shop 22, Computer village<br />
                        Lagos State Nigeria.
                      </td>
                      <td>
                        Acme Corp.<br />
                        John Doe<br />
                        john@example.com
                      </td>
                    </tr>
                  </tbody></table>
              </td>
            </tr>
            <tr className="heading">
              <td>
                Payment Method
              </td>
              <td>
                Paystack #
              </td>
            </tr>
            <tr className="details">
              <td>
                Online Payment
              </td>
              <td>
                ₦ {payStackAmount}
              </td>
            </tr>
            <tr className="heading">
              <td>
                Item
              </td>
              <td>
                Price
              </td>
            </tr>

            {cart.map (item => {
                return (
                    <Fragment key={item.id}  >

                        <tr className="item">
                            <td>
                            {item.title}
                            </td>
                        
                            <td>
                            ${item.price}
                            </td>
                            </tr>

                        </Fragment>
                )
            }) }
     
            <tr className="total">
              <td />
              <td>
                  Tax: ${cartTax} <br/>
                Total: ${CartTotal}
              </td>
            </tr>
          </tbody></table>
      </div>
            </Fragment>
                    )} 

                    }
                </ProductConsumer>
                
        </section>
        )

    }
}

const todayDate = () => {

    let today = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[today.getMonth()] 

    return month + ' ,' + today.getDate() + ' ' + today.getFullYear()

}
