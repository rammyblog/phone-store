import React, { Component, Fragment } from "react"
import { WithContext } from "../../withContext"

class Invoice extends Component {
  render() {
    const { refNo, cart, paystackAmount, cartTax, CartTotal } = this.props.value

    return (
      <section>
        {refNo.length > 0 ? (
          <Fragment>
            <div className="invoice-box">
              <table cellSpacing={0} cellPadding={0} className="tableClass">
                <tbody>
                  <tr className="top">
                    <td colSpan={2}>
                      <table>
                        <tbody>
                          <tr>
                            <td className="title">
                              <img
                                src="https://res.cloudinary.com/rammy/image/upload/v1581629667/cooltext349242969324288.png"
                                style={{ width: "90%", maxWidth: "300px" }}
                                alt='site logo'
                              />
                            </td>
                            <td>
                              Ref No:{refNo}
                              <br />
                              Created: {todayDate()} <br />
                              Due: {todayDate()}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr className="information">
                    <td colSpan={2}>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              e Phone Store.
                              <br />
                              Shop 22, Computer village
                              <br />
                              Lagos State Nigeria.
                            </td>
                            <td>
                              Acme Corp.
                              <br />
                              John Doe
                              <br />
                              john@example.com
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr className="heading">
                    <td>Payment Method</td>
                    <td>Paystack #</td>
                  </tr>
                  <tr className="details">
                    <td>Online Payment</td>
                    <td>₦ {paystackAmount}</td>
                  </tr>
                  <tr className="heading">
                    <td>Item</td>
                    <td>Price</td>
                  </tr>

                  {cart.map(item => {
                    return (
                      <Fragment key={item.id}>
                        <tr className="item">
                          <td>{item.title}</td>

                          <td>${item.price}</td>
                        </tr>
                      </Fragment>
                    )
                  })}

                  <tr className="total">
                    <td />
                    <td>
                      Tax: ${cartTax} <br />
                      Total: ${CartTotal}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Fragment>
        ) : (
          null
        )}
      </section>
    )
  }
}

const todayDate = () => {
  let today = new Date()
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  let month = months[today.getMonth()]

  return month + ", " + today.getDate() + " " + today.getFullYear()
}

export default WithContext(Invoice)
