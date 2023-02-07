import axios from "axios"
import { GetStaticProps } from "next"
import Image from "next/image"
import { useState } from "react"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import Head from "next/head"

interface productProps {
  product: {
    id: string,
    name: string,
    imageURL: string,
    price: string,
    description: string,
    defaultPriceId: string,
  }
}

export default function Product({ product }: productProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl;
    } catch (err) {
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)

      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} - Ignite Shop</title>
      </Head>

      <div className="grid grid-cols-2 w-3/4 mx-auto gap-24 mb-20">
        <div className="flex h-[35rem] justify-center rounded-lg box-border bg-gradient-to-b from-[#1ea483] to-[#7465d4]">
          <Image src={product.imageURL} alt="" width={520} height={480} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-ignite-2xl py-4 font-bold">{product.name}</h1>
          <span className="text-ignite-2xl text-green300 pb-10">{product.price}</span>
          <p className="text-ignite-md pb-6 ">{product.description}</p>
          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
            className="py-5 duration-[0.1s] bg-green500 rounded-lg mt-auto disabled:opacity-60 disabled:cursor-not-allowed hover:bg-green300 disabled:hover:bg-green500"
          >
            Colocar na Sacola
          </button>
        </div>
      </div>
    </>
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

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
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