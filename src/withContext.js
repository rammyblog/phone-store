import React from "react"
import { ProductConsumer } from "./context"

export const WithContext = Component => {
  return props => (
    <ProductConsumer>
      {value => <Component {...props} value={value} />}
    </ProductConsumer>
  )
}
