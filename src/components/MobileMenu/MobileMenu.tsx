import Categories from "../Categories/Categories"

import "./MobileMenu.scss"

type MobileMenuProps = {
  isMobileOpen: boolean
}

export default function MobileMenu({ isMobileOpen }: MobileMenuProps) {
  return (
    <div className={`mobile-menu ${isMobileOpen ? "mobile-menu--active" : ""}`}>
      <div className="mobile-menu__inner-menu">
        <Categories />
      </div>
    </div>
  )
}
