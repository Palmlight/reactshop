import React, { Component } from "react"
import { RouteComponentProps, Prompt } from "react-router-dom"
import { IProduct, products } from "./ProductsData"

type Props = RouteComponentProps<{ id: string }>

interface IState {
  product?: IProduct
  added: boolean
}

export default class ProductPage extends Component<Props, IState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      added: false
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      const id: number = parseInt(this.props.match.params.id, 10)
      const product = products.filter(p => p.id === id)[0]
      this.setState({ product })
    }
  }

  private handleClick = () => {
    this.setState({ added: true })
  }

  private navAwayMessage = () =>
    "Are you sure you want to leave without buying this product?"

  render() {
    const product = this.state.product
    return (
      <div className="page-container">
        <Prompt when={!this.state.added} message={this.navAwayMessage} />
        {product ? (
          <React.Fragment>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p className="product-price">
              {new Intl.NumberFormat("en-US", {
                currency: "USD",
                style: "currency"
              }).format(product.price)}
            </p>
            {!this.state.added && (
              <button onClick={this.handleClick}>Add to Basket</button>
            )}
          </React.Fragment>
        ) : (
          <p>Product not found</p>
        )}
      </div>
    )
  }
}
