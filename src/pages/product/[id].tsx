import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"

interface productProps {
  product: {
    id: string,
    name: string,
    imageURL: string,
    price: string,
    description: string,
  }
}

export default function Product({ product }: productProps) {

  const { isFallback } = useRouter()

  if (isFallback) {
    return (
      <h1 className="text-ignite-xl text-center">
        Carregando...
      </h1>
    )
  }

  return (
    <div className="grid grid-cols-2 w-3/4 mx-auto gap-24 mb-20">
      <div className="flex h-[35rem] justify-center rounded-lg box-border bg-gradient-to-b from-[#1ea483] to-[#7465d4]">
        <Image src={product.imageURL} alt="" width={520} height={480} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-ignite-2xl py-4 font-bold">{product.name}</h1>
        <span className="text-ignite-2xl text-green300 pb-10">{product.price}</span>
        <p className="text-ignite-md pb-6 ">{product.description}</p>
        <button className="py-5 bg-green500 rounded-lg mt-auto">Comprar Agora</button>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_NHMDmxMYH1jKjh' } } // optional
    ],
    fallback: true,
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
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}