import { Content, DialogClose, DialogPortal, DialogTitle, Overlay } from "@radix-ui/react-dialog";
import Image from "next/image";
import { X } from 'phosphor-react'

export function ShoppingCartModal() {
  const itemCount = 1

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

  return (
    <DialogPortal>
      <Overlay />
      <Content className="absolute py-6 px-12 top-0 ml-[70%] w-[30%] h-[100vh] items-end bg-gray800 overflow-y-auto">
        <DialogClose className="absolute right-6">
          <X size={24} className="cursor-pointer hover:text-green300 duration-[0.1s]" />
        </DialogClose>
        <header className="flex items-end h-20 mb-8">
          <DialogTitle className="font-bold text-ignite-lg">Sacola de Compras</DialogTitle>
        </header>

        <div className="flex flex-row mb-6">
          <div className="flex justify-center w-24 h-24 mb-8 mr-2 rounded-lg box-border bg-gradient-to-b from-[#1ea483] to-[#7465d4]">
            <Image src={""} width={90} height={80} alt="" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-lg pb-1">Camiseta X</span>
            <span className="pb-2  font-bold text-lg">R$ 79,90</span>
            <button className="text-green500 hover:text-green300 duration-[0.2s]">Remover</button>
          </div>
        </div>

        <div className="flex flex-row mb-6">
          <div className="flex justify-center w-24 h-24 mb-8 mr-2 rounded-lg box-border bg-gradient-to-b from-[#1ea483] to-[#7465d4]">
            <Image src={""} width={90} height={80} alt="" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-lg pb-1">Camiseta X</span>
            <span className="pb-2  font-bold text-lg">R$ 79,90</span>
            <button className="text-green500 hover:text-green300 duration-[0.2s]">Remover</button>
          </div>
        </div>

        <div className="flex flex-row mb-6">
          <div className="flex justify-center w-24 h-24 mb-8 mr-2 rounded-lg box-border bg-gradient-to-b from-[#1ea483] to-[#7465d4]">
            <Image src={""} width={90} height={80} alt="" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-lg pb-1">Camiseta X</span>
            <span className="pb-2 font-bold text-lg">R$ 79,90</span>
            <button className="text-green500 hover:text-green300 duration-[0.2s]">Remover</button>
          </div>
        </div>

        <div className="flex flex-col h-auto justify-end">
          <div className="flex justify-between">
            <span>quantidade</span>
            <span>{handleItemCount()}</span>
          </div>
          <div className="flex justify-between mb-14">
            <span className="font-bold text-lg">valor total</span>
            <span className="font-bold text-2xl">R$ 270,00</span>
          </div>
          <div className="flex justify-center rounded-lg bg-green500 hover:bg-green300 cursor-pointer duration-[0.1s] ">
            <button className="py-5">
              Finalizar Compra
            </button>
          </div>
        </div>

      </Content>
    </DialogPortal>
  )
}