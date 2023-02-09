import Image from "next/image";
import { CartItem } from "../context/CartContext";



export function ProductOnCart({ imageURL, name, price, quantity }: CartItem) {
  return (
    <div className="flex flex-row mb-6">
      <div className="flex justify-center w-24 h-24 mb-8 mr-2 rounded-lg box-border bg-gradient-to-b from-[#1ea483] to-[#7465d4]">
        <Image src={imageURL} width={90} height={80} alt="" />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-lg pb-1">{name}</span>
        <span className="pb-2  font-bold text-lg">{price}</span>
        <span className="absolute ml-[-1.525rem] mt-[-0.6rem] bg-red-500 rounded-full px-2 ">{quantity}</span>
        <button className="text-green500 hover:text-green300 duration-[0.2s]">Remover</button>
      </div>
    </div>
  )

}