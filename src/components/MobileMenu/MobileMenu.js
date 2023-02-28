import Categories from "../Categories/Categories"

import "./MobileMenu.scss"

export default function MobileMenu({ isMobileOpen }) {
  return (
    <div className={`mobile-menu ${isMobileOpen ? "mobile-menu--active" : ""}`}>
      <div className="mobile-menu__inner-menu">
        <Categories />
      </div>
    </div>
  )
}
