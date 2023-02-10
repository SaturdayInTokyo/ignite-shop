import Image from "next/image";
import { Minus, Plus } from "phosphor-react";
import { CartContext, CartItem } from "../context/CartContext";
import { useContext } from 'react';



export function ProductOnCart({ id, imageURL, name, price, quantity, }: CartItem) {
  const { handleAddItemOnCart, setCartItems } = useContext(CartContext)

  const decreaseCartQuantity = () => {
    setCartItems(currentItem => {
      if (currentItem.find(item => item.name === name)?.quantity === 1) {
        return currentItem.filter(item => item.name !== name)
      } else {
        return currentItem.map(item => {
          if (item.name === name) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  const removeFromCart = () => {
    setCartItems(currentItem => {
      return currentItem.filter(item => item.name !== name)
    })
  }

  return (
    <div className="flex flex-row mb-6">
      <div
        className="flex justify-center w-24 h-24 mb-8 mr-2 rounded-lg box-border bg-gradient-to-b from-[#1ea483] to-[#7465d4]"
      >
        <Image src={imageURL} width={90} height={80} alt="" />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-lg pb-1">{name}</span>
        <span className="pb-2  font-bold text-lg">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price / 100)}
        </span>
        <span
          className="absolute ml-[-1.525rem] mt-[-0.6rem] bg-red-500 rounded-full px-2 "
        >
          {quantity}
        </span>
        <div className="flex gap-3">
          <button
            className="text-green500 hover:text-green300 duration-[0.2s]"
            onClick={() => handleAddItemOnCart(id, name, imageURL, price)}
          >
            <Plus size={17} />
          </button>
          <button
            className="text-green500 hover:text-green300 duration-[0.2s]"
            onClick={() => decreaseCartQuantity()}
          >
            <Minus size={17} />
          </button>
          <button
            className="text-green500 hover:text-green300 duration-[0.2s]"
            onClick={() => removeFromCart()}
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  )

}