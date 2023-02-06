import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import { Roboto } from '@next/font/google'
import logoImg from '../assets/logo.svg'
import Link from 'next/link'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${roboto.variable} font-sans`}>
      <div className='flex flex-col items-start content-center min-h-full max-w-[1180px]'>
        <header className='py-8 items mx-auto justify-center'>
          <Link
            href='/'
          >
            <Image
              src={logoImg}
              alt=''
            />
          </Link>

        </header>
      </div>
      <Component {...pageProps} />
    </main>
  )
}