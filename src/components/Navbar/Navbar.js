// styles
import "./Navbar.scss"

// assets
import { MobileMenu, CartIcon } from ".."
import { useShoppingCart } from "../../context/ShoppingCartContext"
import { useSite } from "../../context/SiteContext"
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

  const { categories } = useSite()
  if (categories) {
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
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="navbar__logo logo"
            >
              audiophile
            </Link>

            <Link to="/" className="navbar__link">
              HOME
            </Link>

            {categories.map((category) => (
              <Link
                to={`/categories/${category.slug.current}`}
                key={category._id}
                className="navbar__link"
              >
                {category.title}
              </Link>
            ))}

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
}
