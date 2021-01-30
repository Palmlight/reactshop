import React from "react"
import { IProduct, products } from "./ProductsData"
import { Link, RouteComponentProps } from "react-router-dom"

interface IState {
  products: IProduct[]
  search: string
}

class ProductsPage extends React.Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      products: [],
      search: ""
    }
  }

  componentDidMount() {
    this.setState({ products })
  }

  static getDerivedStateFromProps(props: RouteComponentProps, state: IState) {
    const searchParams = new URLSearchParams(props.location.search)

    const search = searchParams.get("search") || ""

    return {
      products: state.products,
      search
    }
  }

  render() {
    return (
      <div className="page-container">
        <p>
          Welcome to React Shop where you can get all your tools for React JS!
        </p>
        <ul className="product-list">
          {this.state.products.map(product => {
            if (
              !this.state.search ||
              (this.state.search &&
                product.name
                  .toLowerCase()
                  .indexOf(this.state.search.toLowerCase()) > -1)
            ) {
              return (
                <li key={product.id} className="product-list-item">
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </li>
              )
            } else {
              return null
            }
          })}
        </ul>
      </div>
    )
  }
}

export default ProductsPage
