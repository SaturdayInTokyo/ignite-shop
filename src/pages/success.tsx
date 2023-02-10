import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { stripe } from "../lib/stripe";
import Head from "next/head";

export default function Success({ customerName, product }) {

  function showSuccessPurchaseItems() {
    if (product.length === 1) {
      return (
        <div className="flex flex-col items-center">
          <div className="flex justify-center w-40 h-40 mb-8 rounded-full box-border bg-gradient-to-b from-[#1ea483] to-[#7465d4]">
            <Image src={product[0].price.product.images[0]} width={150} height={110} alt="" />
          </div>
          <h1 className="text-ignite-2xl font-bold mb-16">Compra efetuada!</h1>
          <p className="text-ignite-xl mb-24 text-center w-[30rem]">Uhuul <strong>{customerName}</strong>, sua <strong>{product.description}</strong> já está a caminho de sua casa.</p>
        </div>
      )
    } else if (product.length >= 2) {
      return (
        <div className="flex flex-col items-center">
          <div className="flex ml-[3.5rem]">
            {product.map(product => {
              return (
                <div key={product.id} className="flex justify-center ml-[-3.5rem] shadow-[0_60px_40px_-10px_rgba(0,0,0,0.3)] w-40 h-40 mb-8 box-border rounded-full bg-gradient-to-b from-[#1ea483] to-[#7465d4]">
                  <Image src={product.price.product.images[0]} width={150} height={110} alt="" />
                </div>
              )
            })}
          </div>
          <h1 className="text-ignite-2xl font-bold mb-16">Compra efetuada</h1>
          <p className="text-ignite-xl mb-24 text-center w-[30rem]">Uhuul <strong>{customerName}</strong>, suas camisas já estão a caminho de sua casa.</p>
        </div>
      )
    }
  }

  return (
    <>
      <Head>
        <title>Compra Efetuada - Ignite shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex flex-col items-center mt-14 mb-14 ">
        {showSuccessPurchaseItems()}
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
  const product = session.line_items.data


  return {
    props: {
      customerName,
      product,
    }
  }
}
