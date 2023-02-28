import { createContext, useContext, useState } from "react"
import { ShoppingCart } from "../components"
import { useLocalStorage } from "../hooks/useLocalStorage"

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage("shopping-cart", [])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const openMobileMenu = () => setIsMobileOpen(true)
  const closeMobileMenu = () => setIsMobileOpen(false)

  function getItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id) {
    setCartItems((currentItems) => {
      return currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 }
        } else {
          return item
        }
      })
    })
  }

  function decreaseCartQuantity(id) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id)
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function addToCart(data, quantity) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === data.id) == null) {
        return [
          ...currentItems,
          {
            id: data.id,
            quantity: quantity,
            name: data.title,
            price: data.price,
            image: data.imageUrl,
          },
        ]
      } else {
        return currentItems.map((item) => {
          if (item.id === data.id) {
            return { ...item, quantity: item.quantity + quantity }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id)
    })
  }

  function removeAllCartItems() {
    setCartItems([])
  }

  const mobileMenu = document.querySelector(".mobile-menu")

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        isCartOpen,
        openMobileMenu,
        closeMobileMenu,
        isMobileOpen,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        addToCart,
        removeFromCart,
        removeAllCartItems,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isCartOpen} />
    </ShoppingCartContext.Provider>
  )
}
