// import axios from 'axios'
import { GetServerSideProps } from 'next'
import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'

interface CartProviderProps {
  children: ReactNode
}

export interface CartItem {
  id: string,
  name: string,
  imageURL: string,
  price: number,
  quantity?: number,
}

interface CartItemContext {
  cartItems: CartItem[],
  setCartItems: Dispatch<SetStateAction<CartItem[]>>
  cartQuantity?: number,
  handleAddItemOnCart: (id: string, name: string, imageURL: String, price: number) => void
}

export const CartContext = createContext({} as CartItemContext)

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function handleAddItemOnCart(id: string, name: string, imageURL: String, price: number) {
    setCartItems(currentItem => {
      if (currentItem.find(item => item.name === name) == null) {
        return [...currentItem, { id, name, imageURL, price, quantity: 1 }]
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
  // const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity, 0
  )

  // async function handleBuyProduct() {
  //   try {
  //     setIsCreatingCheckoutSession(true)

  //     const response = await axios.post('/api/checkout', {
  //       priceId: product.defaultPriceId
  //     })

  //     const { checkoutUrl } = response.data

  //     window.location.href = checkoutUrl;
  //   } catch (err) {
  //     // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)

  //     setIsCreatingCheckoutSession(false)

  //     alert('Falha ao redirecionar ao checkout')
  //   }
  // }

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

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageURL: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}