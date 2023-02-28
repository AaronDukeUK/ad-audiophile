// styles
import "./Navbar.scss"

// assets
import { MobileMenu, CartIcon } from ".."
import { useShoppingCart } from "../../context/ShoppingCartContext"
import { Link } from "react-router-dom"

export default function Navbar() {
  const {
    openCart,
    closeCart,
    isCartOpen,
    openMobileMenu,
    closeMobileMenu,
    isMobileOpen,
  } = useShoppingCart()

  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">
          <svg
            className="navbar__burger"
            width="16"
            height="15"
            xmlns="http://www.w3.org/2000/svg"
            onClick={!isMobileOpen ? openMobileMenu : closeMobileMenu}
          >
            <g fill="#FFF" fillRule="evenodd">
              <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z" />
            </g>
          </svg>
          <Link to="/" onClick={closeMobileMenu} className="logo">
            audiophile
          </Link>

          <div
            onClick={!isCartOpen ? openCart : closeCart}
            className="navbar__cart"
          >
            <CartIcon />
          </div>
        </div>
      </nav>
      <MobileMenu isMobileOpen={isMobileOpen} />
    </>
  )
}
