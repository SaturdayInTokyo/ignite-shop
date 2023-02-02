import Image from "next/image";

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import { GetStaticProps } from "next";
import Link from "next/link";

interface HomeProps {
  products: {
    id: string,
    name: string,
    imageURL: string,
    price: string,
  }[]
}

export default function home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: "auto",
      spacing: 48,
      origin: 'center'
    },
  })

  return (
    <div className="flex mx-auto justify-center items-start max-w-[calc(100vw_-_((100vw_-_full)_/_2))] min-h-[656px] keen-slider" ref={sliderRef}>
      {products.map(product => {
        return (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="flex items-end justify-center pb-1 bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-lg cursor-pointer relative group overflow-hidden keen-slider__slide"
            prefetch={false}
          >
            <Image src={product.imageURL} width={520} height={480} alt='' className="object-contain mb-8" />
            <footer className="flex absolute items-center justify-between w-[99%] p-4 rounded-md bg-[#00000099] transform translate-y-[110%] opacity-0 transition-all duration-[0.2s] ease-in-out group-hover:transform group-hover:translate-y-[0%] group-hover:opacity-100">
              <strong className="">{product.name}</strong>
              <span className="text-ignite-lg text-green300">{product.price}</span>
            </footer>
          </Link>

        )
      })}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageURL: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}

