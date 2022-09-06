import {
  Routes,
  Route,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom"

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

import { useLayoutEffect } from "react"

import { ShoppingCartProvider } from "./context/ShoppingCartContext"

// components
import { Navbar } from "./components"
import Footer from "./components/Footer/Footer"

// styles
import "./main.scss"
import { Home, Category, Product } from "./pages"

import React from "react"

type WrapperProps = {
  children: any
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return children
}

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_STRAPI_URL}/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      Product: {
        keyFields: ["titleLineOne"],
      },

      Category: {
        keyFields: ["name"],
      },
    },
  }),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <ShoppingCartProvider>
        <div className="App">
          <Router>
            <Wrapper>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories/:category" element={<Category />} />
                <Route path="/products/:product" element={<Product />} />
              </Routes>
              <Footer />
            </Wrapper>
          </Router>
        </div>
      </ShoppingCartProvider>
    </ApolloProvider>
  )
}

export default App
