import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import Head from "next/head";

interface SuccessProps {
  customerName: string,
  product: {
    name: string,
    imageUrl: string,
  }
}

export default function Success({ customerName, product }: SuccessProps) {

  console.log(product)
  return (
    <>
      <Head>
        <title>Compra Efetuada - Ignite shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex flex-col items-center ">
        <h1 className="text-ignite-2xl font-bold mb-16">Compra efetuada</h1>
        <div className="flex justify-center w-32 h-32 mb-8 rounded-lg box-border bg-gradient-to-b from-[#1ea483] to-[#7465d4]">
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </div>
        <p className="text-ignite-xl mb-24 text-center w-[30rem]">Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho de sua casa.</p>
        <Link
          href='/'
          className="text-ignite-lg text-green500 cursor-pointer hover:text-green300 no-underline font-bold"
          prefetch={false}
        >
          Voltar ao catálogo
        </Link>
      </div>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name
  const product = session.line_items.data[0].price.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      }
    }
  }
}
