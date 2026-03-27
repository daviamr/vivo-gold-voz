import { Check, Smartphone } from "lucide-react"
import { Button } from "../ui/button"

export default function HeroTop() {
  return (
    <div className="border-b-2">
      <div className="py-12 text-white bg-default-purple lg:bg-[url('/background-vivo.jpg')] lg:bg-center">
        <div className="flex flex-col px-4 gap-4 container m-auto">
          <h1 className="text-2xl font-bold lg:text-3xl lg:font-light">
            Vivo Voz Negócio
          </h1>

          <div className="flex flex-col gap-2 text-1xl">
            <p className="flex items-center gap-2 text-2xl font-light lg:text-3xl lg:font-bold">
              PBAX Virtual:<br />Conecte sua empresa
            </p>
            <div className="flex">
              <p className="text-2xl font-light lg:text-4xl lg:font-bold">
                R$ 30,00
              </p>
              <p className="flex flex-col font-bold gap-0 pl-2 text-lg/tight">/mês <span className="font-normal text-sm/tight">por licença</span></p>
            </div>

            <div className="my-4">
              <p className="flex items-center gap-2 text-lg">
                <Check size={18} /> 1 ano de IA Perplexity Pro Grátis
              </p>
            </div>
          </div>

          <Button className="p-7 px-12 text-[18px] w-max lg:px-24" variant={'vivoPlans'}>Contratar plano</Button>
        </div>
      </div>
    </div>
  )
}