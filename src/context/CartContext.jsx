import React, { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (item, portion = 'full', quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        cartItem => cartItem.id === item.id && cartItem.portion === portion
      )

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += quantity
        return updatedCart
      } else {
        return [...prevCart, { ...item, portion, quantity }]
      }
    })
  }

  const updateQuantity = (itemId, portion, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, portion)
      return
    }

    setCart(prevCart => 
      prevCart.map(item =>
        item.id === itemId && item.portion === portion
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const removeFromCart = (itemId, portion) => {
    setCart(prevCart => 
      prevCart.filter(item => !(item.id === itemId && item.portion === portion))
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.portion === 'half' && item.halfPrice ? item.halfPrice : item.price
      return total + (price * item.quantity)
    }, 0)
  }

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}