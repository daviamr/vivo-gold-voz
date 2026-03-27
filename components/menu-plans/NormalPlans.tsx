'use client'

import { Check, Smartphone } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Switch } from "../ui/switch"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export default function NormalPlans() {
  const mockedPlans = [
    {
      plan: 'Pacote  PABX Virtual',
      licence: 'Acima de 30 licenças',
      pos: '6',
      posText: 'Plano Pós 5G',
      portability: '+15 GB Na Portabilidade',
      cta: 'Mais vendido',
      price: 39
    },
    {
      plan: 'Pacote  PABX Virtual',
      licence: 'De 21 a 30 licenças',
      pos: '6',
      posText: 'Plano Pós 5G',
      portability: '+15 GB Na Portabilidade',
      mdm: true,
      chipLock: true,
      price: 44
    },
    {
      plan: 'Pacote  PABX Virtual',
      licence: 'De 9 a 20 licenças',
      pos: '15',
      portability: '+15 GB Na Portabilidade',
      cta: 'Oferta mais vendida',
      price: 54
    },
    {
      plan: 'Pacote  PABX Virtual',
      licence: 'De 5 a 8 licenças',
      pos: '100',
      portability: '+15 GB Na Portabilidade',
      cta: 'Melhor custo benefício',
      price: 99
    },
  ]
  const [plans, setPlans] = useState(mockedPlans)
  const router = useRouter()

  const handleCheckout = (plan: typeof mockedPlans[0]) => {
    const customerData = localStorage.getItem('customer')
    const customer = customerData ? JSON.parse(customerData) : {}
    const dataToSave = { ...customer, plan }
    localStorage.setItem('customer', JSON.stringify(dataToSave))
    router.push(`/checkout?step=1`)
  }

  return (
    <div id="card-section">
      <div className="grid gap-y-8 justify-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-full">
        {plans.map((plan, i) => (
          <div className="relative border rounded-sm shadow-xs max-w-75 mt-8 bg-white h-full" key={i}>
            {plan.cta && (
              <span className="absolute left-0 -top-3 uppercase text-white text-[10px] bg-default-purple py-1 px-2 rounded-sm tracking-wide">{plan.cta}</span>
            )}
            <div className="flex flex-col justify-between h-full">
              <div className="p-4">

                <p className="font-semibold">{plan.plan}</p>

                <div className="flex flex-col gap-4 mt-1 border-b pb-4">
                  <p className="text-3xl max-w-60">
                    {plan.licence}
                  </p>
                  <p className="flex items-center gap-2 text-gray-500">
                    <Check /> Ligações ilimitadas para todo o Brasil
                  </p>
                </div>

                <div className="py-4 border-b">
                  <p className="font-semibold">URA como solução adicional &#185;</p>
                </div>

                <div className="flex justify-between items-center bg-[#f8f8f8] rounded-sm mt-4 p-4">
                  <p className="max-w-40">1 ano grátis de IA com Perplexity Pro</p>
                  <Image src={'/perplexity-logo.webp'} alt="Perplexity Pro" width={32} height={32} />
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm font-semibold">A partir de</p>
                <p className="text-left text-2xl">
                  {plan.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: plan.price % 1 === 0 ? 0 : 2,
                    maximumFractionDigits: 2,
                  })}/mês</p>
                <p className="text-sm text-gray-500 pb-6">por licença</p>
                <Button
                  variant={'vivoPlans'}
                  className="text-white font-normal w-full p-6 rounded-xs"
                  onClick={() => handleCheckout(plan)}>Assinar Plano</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}