// import axios from 'axios'
import { GetServerSideProps, GetStaticProps } from 'next'
import { createContext, ReactNode, useState, useEffect, Dispatch, SetStateAction } from 'react'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import { ProductProps } from '../pages/product/[id]'

interface CartProviderProps {
  children: ReactNode
}

export interface CartItem {
  id: string,
  name: string,
  imageURL: string,
  price: string,
  quantity?: number,
}

interface CartItemContext {
  cartItems: CartItem[],
  setCartItems: Dispatch<SetStateAction<CartItem[]>>
  cartQuantity?: number,
}

export const CartContext = createContext({} as CartItemContext)

export function CartProvider({ children }: CartProviderProps, { product }: ProductProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
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
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_NHMDmxMYH1jKjh' } } // optional
    ],
    fallback: 'blocking',
  }
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