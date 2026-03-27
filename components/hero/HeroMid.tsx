'use client'

import { ChevronRight } from "lucide-react"

function Index() {

  const scrollParaDiv = () => {
    const elemento = document.getElementById('card-section')
    elemento?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="py-12 text-white bg-[url('/background-natal-vivo.webp')] bg-cover bg-no-repeat">
      <div className="container px-4 m-auto grid gap-40">
        <div>
          <p>VIVO FIBRA</p>
          <p className="text-4xl font-light mb-4">Só internet Vivo Fibra?</p>
          <p className="max-w-85">Pague 500 Mega e leve 600 Mega de internet com Wi-Fi grátis</p>
        </div>
        <p className="flex items-center gap-2 cursor-pointer" onClick={scrollParaDiv}>Conhecer Vivo Fibra <ChevronRight size={16} /></p>
      </div>
    </div>
  )
}

export default Index