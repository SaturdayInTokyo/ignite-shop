import Image from 'next/image'
import logoImg from '../assets/logo.svg'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import { Handbag } from 'phosphor-react'
import { ShoppingCartModal } from '../components/ShoppingCartModal'
import { CartContext } from '../context/CartContext'
import { useContext } from 'react'

export function Header() {
  const {  cartQuantity } = useContext(CartContext)

  function showItemCount() {
    if (cartQuantity >= 1) {
      return (
        <div className='p-3 bg-gray800 rounded-lg cursor-pointer'>
          <Handbag size={24} />
          <span className='absolute ml-[1.3rem] mt-[-2.7rem] bg-green500 rounded-full px-2'>
            {cartQuantity}
          </span>
        </div>
      )
    } else {
      return (
        <div className='p-3 bg-gray800 rounded-lg cursor-pointer'>
          <Handbag size={24} />
        </div>
      )
    }
  }
  return (
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
  )
}