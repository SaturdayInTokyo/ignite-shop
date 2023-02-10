import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react'

interface CartProviderProps {
  children: ReactNode
}

export interface CartItem {
  id: string,
  name: string,
  imageURL: string,
  price: number,
  quantity?: number,
  defaultPriceId?: string,
}

interface CartItemContext {
  cartItems: CartItem[],
  setCartItems: Dispatch<SetStateAction<CartItem[]>>,
  cartQuantity?: number,
  handleAddItemOnCart: (id: string, name: string, imageURL: String, price: number, defaultPriceId: string) => void,
}

export const CartContext = createContext({} as CartItemContext)

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity, 0
  )

  function handleAddItemOnCart(id: string, name: string, imageURL: String, price: number, defaultPriceId: string) {
    setCartItems(currentItem => {
      if (currentItem.find(item => item.name === name) == null) {
        return [...currentItem, { id, name, imageURL, price, defaultPriceId, quantity: 1 }]
      } else {
        return currentItem.map(item => {
          if (item.name === name) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartQuantity,
        handleAddItemOnCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}