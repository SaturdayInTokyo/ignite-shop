import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from '@next/font/google'
import { CartProvider } from '../context/CartContext'
import { Header } from '../components/Header';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${roboto.variable} font-roboto`}>
      <CartProvider>
        <Header />
        <Component {...pageProps} />
      </CartProvider>
    </main>
  )
}