import { Content, DialogClose, DialogPortal, DialogTitle, Overlay } from "@radix-ui/react-dialog";
import { X } from 'phosphor-react'
import { useContext, useState } from 'react'
import { CartContext } from "../context/CartContext";
import ProductOnCart from "./ProductOnCard";

export function ShoppingCartModal() {
  const { cartQuantity, cartItems } = useContext(CartContext)

  const itemCount = cartQuantity

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)


  async function handleCheckout() {

    setIsCreatingCheckoutSession(true)

    const lineItems = cartItems?.map(item => {
      return {
        price: item.defaultPriceId,
        quantity: item.quantity,
      }
    })

    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ lineItems: lineItems })
    })

    const checkout = await res.json()
    window.location.href = checkout.session.url

  }

  const enableBuyButton = () => {
    if (cartQuantity >= 1) {
      return (
        <button
          className="flex justify-center py-5 rounded-lg bg-green500 hover:bg-green300 cursor-pointer duration-[0.1s] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green500 "
          disabled={isCreatingCheckoutSession}
          onClick={() => handleCheckout()}
        >
          Finalizar Compra
        </button>
      )
    } else {
      return (
        <div className="flex justify-center rounded-lg bg-green500 opacity-50 cursor-not-allowed">
          <button
            className="py-5 cursor-not-allowed"
          >
            Finalizar Compra
          </button>
        </div>
      )
    }
  }

  const handleItemCount = () => {
    if (itemCount === 1) {
      return (
        <span>{itemCount} item</span>
      )
    } else if (itemCount >= 2) {
      return (
        <span>{itemCount} itens</span>
      )
    } else {
      return (
        <span></span>
      )
    }
  }

  const getTotalPrice = () => {
    return (
      cartItems.reduce((total, cartItem) => {
        const item = cartItems.find(item => item.name === cartItem.name)
        return total + ((item?.price) || 0) * cartItem.quantity
      }, 0)
    )
  }

  return (
    <DialogPortal>
      <Overlay />
      <Content className="absolute py-6 px-8 top-0 ml-[60%] w-[40%] h-[100vh] items-end bg-gray800 overflow-y-auto">
        <DialogClose className="absolute right-6">
          <X size={24} className="cursor-pointer hover:text-green300 duration-[0.1s]" />
        </DialogClose>
        <header className="flex items-end h-20 mb-8">
          <DialogTitle className="font-bold text-ignite-lg">Sacola de Compras</DialogTitle>
        </header>
        {cartItems.map(item => (
          <ProductOnCart key={item.id} {...item} />
        ))}

        <div className="flex flex-col h-auto justify-end">
          <div className="flex justify-between">
            <span>quantidade</span>
            <span>{handleItemCount()}</span>
          </div>
          <div className="flex justify-between mb-14">
            <span className="font-bold text-lg">valor total</span>
            <span className="font-bold text-2xl">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(getTotalPrice() / 100)}
            </span>
          </div>
          {enableBuyButton()}
        </div>
      </Content>
    </DialogPortal>
  )
}