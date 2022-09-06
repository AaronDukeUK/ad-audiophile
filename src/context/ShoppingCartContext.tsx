import { createContext, ReactNode, useContext, useState } from "react"
import { ShoppingCart } from "../components"
import { useLocalStorage } from "../hooks/useLocalStorage"

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
  name: string
  price: number
  image: string
}

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  openMobileMenu: () => void
  closeMobileMenu: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  addToCart: (data: any, quantity: number) => void
  removeFromCart: (id: number) => void
  removeAllCartItems: () => void
  cartQuantity: number
  cartItems: CartItem[]
  isCartOpen: boolean
  isMobileOpen: boolean
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  )
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

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id: number) {
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

  function decreaseCartQuantity(id: number) {
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

  function addToCart(data: any, quantity: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === data.id) == null) {
        return [
          ...currentItems,
          {
            id: data.id,
            quantity: quantity,
            name: data.attributes.titleLineOne,
            price: data.attributes.price,
            image: data.attributes.mainImage.data.attributes.url,
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

  function removeFromCart(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id)
    })
  }

  function removeAllCartItems() {
    setCartItems([])
  }

  const mobileMenu = document.querySelector(".mobile-menu") as HTMLDivElement

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
