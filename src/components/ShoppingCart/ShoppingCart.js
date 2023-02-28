import "./ShoppingCart.scss"

import { useShoppingCart } from "../../context/ShoppingCartContext"
import { formatCurrency } from "../../utilities/formatCurrency"
import { Link } from "react-router-dom"
import { urlFor } from "../../lib/client"

const ShoppingCart = ({ isOpen }) => {
  const {
    closeCart,
    cartItems,
    removeAllCartItems,
    cartQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useShoppingCart()

  return (
    <div className={`cart ${isOpen ? "cart--active" : ""}`} onClick={closeCart}>
      <div className="cart__container" onClick={(e) => e.stopPropagation()}>
        <div className="cart__top">
          <h6 className="cart__header">CART ({cartQuantity})</h6>
          {cartItems.length > 0 && (
            <p className="cart__remove" onClick={() => removeAllCartItems()}>
              Remove all
            </p>
          )}
        </div>
        {cartItems.length == 0 && (
          <div className="cart__empty">
            <p>No items in your cart.</p>
          </div>
        )}
        {cartItems.map((item, i) => (
          <div className="cartItem" key={i}>
            <img
              src={urlFor(item.image)}
              alt={item.name}
              className="cartItem__image"
            />
            <div>
              <p className="cartItem__title">
                {item.name.replace("Mark", "Mk")}
              </p>
              <span className="cartItem__price">
                {formatCurrency(item.price)}
              </span>
            </div>
            <div className="cartItem__quantityContainer">
              <button onClick={() => increaseCartQuantity(item.id)}>
                <p>+</p>
              </button>
              <p className="cartItem__quantity">{item.quantity}</p>
              <button onClick={() => decreaseCartQuantity(item.id)}>
                <p>-</p>
              </button>
            </div>
          </div>
        ))}
        {cartItems.length > 0 && (
          <>
            <div className="cart__bottom">
              <p>TOTAL</p>
              <h6 className="cart__total">
                {formatCurrency(
                  cartItems.reduce((total, cartItem) => {
                    return total + (cartItem?.price || 0) * cartItem.quantity
                  }, 0)
                )}
              </h6>
            </div>
            <button className="button button--orange cart__button">
              CHECKOUT
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ShoppingCart
