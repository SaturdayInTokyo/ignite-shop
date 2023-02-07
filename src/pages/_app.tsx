import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import { Roboto } from '@next/font/google'
import logoImg from '../assets/logo.svg'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import { Handbag } from 'phosphor-react'
import { ShoppingCartModal } from '../components/ShoppingCartModal'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});


export default function MyApp({ Component, pageProps }: AppProps) {
  const itemCount = 1

  function showItemCount() {
    if (itemCount <= 0) {
      return (
        <div className='p-3 bg-gray800 rounded-lg cursor-pointer'>
          <Handbag size={24} />
        </div>
      )
    } else if (itemCount >= 1) {
      return (
        <div className='p-3 bg-gray800 rounded-lg cursor-pointer'>
          <Handbag size={24} />
          <span className='absolute ml-[1.3rem] mt-[-2.7rem] bg-green500 rounded-full px-2'>
            {itemCount}
          </span>
        </div>
      )
    }
  }

  return (
    <main className={`${roboto.variable} font-roboto`}>
      <div className='flex flex-col items-start content-center min-h-full'>
        <header className='flex justify-between mx-auto py-8 w-3/4 items-center'>
          <Link
            href='/'
          >
            <Image
              src={logoImg}
              alt=''
            />
          </Link>
          <Dialog.Root>
            <Dialog.Trigger asChild >
              {showItemCount()}
            </Dialog.Trigger>
            <ShoppingCartModal />
          </Dialog.Root>
        </header>
      </div>
      <Component {...pageProps} />
    </main>
  )
}