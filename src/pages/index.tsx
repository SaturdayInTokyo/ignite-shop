import Image from "next/image";

import camiseta1 from '../assets/shirts/1.png'
import camiseta2 from '../assets/shirts/2.png'
import camiseta3 from '../assets/shirts/3.png'

export default function home() {
  return (
    <div className="flex gap-12 justify-center items-start max-w-[calc(100vw - ((100vw - 1180px) / 2))] min-h-[656px]">
      <a href="" className="flex items-end justify-center bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-lg p-1 cursor-pointer relative group overflow-hidden">
        <Image src={camiseta1} width={520} height={480} alt='' className="object-contain mb-8" />
        <footer className="flex absolute items-center justify-between w-[99%] p-4 rounded-md bg-[#00000099] transform translate-y-[110%] opacity-0 transition-all duration-[0.2s] ease-in-out group-hover:transform group-hover:translate-y-[0%] group-hover:opacity-100">
          <strong className="text-ignite-lg">Camiseta X</strong>
          <span className="text-ignite-xl font-bold text-green300">R$ 79,90</span>
        </footer>
      </a>
      <a href="" className="flex items-end justify-center bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-lg p-1 cursor-pointer relative group overflow-hidden">
        <Image src={camiseta2} width={520} height={480} alt='' className="object-contain mb-8" />
        <footer className="flex absolute items-center justify-between w-[99%] p-4 rounded-md bg-[#00000099] transform translate-y-[110%] opacity-0 transition-all duration-[0.2s] ease-in-out group-hover:transform group-hover:translate-y-[0%] group-hover:opacity-100">
          <strong className="text-ignite-lg">Camiseta X</strong>
          <span className="text-ignite-xl font-bold text-green300">R$ 79,90</span>
        </footer>
      </a>
    </div>
  )
}

