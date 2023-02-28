import {
  Routes,
  Route,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom"

import { useLayoutEffect } from "react"

import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { SiteProvider } from "./context/SiteContext"

// components
import { Navbar } from "./components"
import Footer from "./components/Footer/Footer"

// styles
import "./main.scss"
import { Home, Category, Product } from "./pages"

const Wrapper = ({ children }) => {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return children
}

function App() {
  return (
    <div className="App">
      <Router>
        <Wrapper>
          <SiteProvider>
            <ShoppingCartProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories/:category" element={<Category />} />
                <Route path="/products/:product" element={<Product />} />
              </Routes>
              <Footer />
            </ShoppingCartProvider>
          </SiteProvider>
        </Wrapper>
      </Router>
    </div>
  )
}

export default App
