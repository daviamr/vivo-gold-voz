import { Flame, Rocket } from "lucide-react"
import { useEffect, useState } from "react"
import { Label } from "../ui/label"
import { Controller, UseFormReturn } from "react-hook-form"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"

function Index({ form }: ThirdStepProps) {
  const { formState: { errors }, control, setValue } = form
  const [secondsLeft, setSecondsLeft] = useState(10 * 60)

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const formattedTimer = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

  return (
    <div>
      <div
        className="bg-default-orange p-4">
        <p className="flex gap-4 items-center justify-center text-white">
          <Flame fill="white" color="white" size={18} /> Essa oferta termina em {formattedTimer}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center my-12">
        <p className="flex items-center gap-2 text-lg font-semibold"><Rocket size={18} /> Que tal turbinar seu pedido incluindo URA, atendimento inteligente para sua empresa?</p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">

          <div className="text-xs font-semibold bg-default-purple/10 p-4">
            <p>Faça sua própria programação da URA.</p>
          </div>
          <div className="text-xs font-semibold bg-default-purple/10 p-4">
            <p>Grave chamadas e armazene por até 3 meses.</p>
          </div>
          <div className="text-xs font-semibold bg-default-purple/10 p-4">
            <p>Realize chamadas pelo Microsoft Teams.</p>
          </div>

        </div>
      </div>

      <div
        className="relative bg-gray-300/10 border-default-purple border-3 rounded-2xl w-full max-w-90 m-auto p-4">
        <div className="absolute -top-[35px] right-6 bg-default-orange rounded-t-sm">
          <p className="px-8 py-1 text-white">Aproveite</p>
        </div>
        <Label htmlFor="ura" className="flex items-start gap-2 font-normal text-sm cursor-pointer">
          <Controller
            name="ura"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="ura"
                className="mt-0.5 rounded-full w-6 h-6"
                checked={field.value === true}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <span className="font-bold text-gray-500 text-2xl">URA</span>
        </Label>
        <div className="text-center">
          <p className="font-semibold text-[20px] my-2 text-default-orange">Valor R$ 50,00/URA</p>
          <p className="text-gray-500 text-sm font-semibold w-80 m-auto">Experiência mais ágil, organizada e eficiente para seus clientes, sem depender de infraestrutura física.</p>

          <p className="py-3 border-2 max-w-60 m-auto rounded-sm my-4">
            1
          </p>

          <Button
            className="w-full max-w-70 bg-gray-500 rounded-full">
            Remover
          </Button>
        </div>
      </div>

      <div className="w-max m-auto mt-6">
        <Label htmlFor="termsAndContracts" className="flex items-center gap-2 text-sm cursor-pointer text-gray-500 font-semibold">
          <Controller
            name="termsAndContracts"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="termsAndContracts"
                className="w-6 h-6"
                checked={field.value === true}
                onCheckedChange={field.onChange}
              />
            )}
          />
          Aceito e concordo com os
          <a href="#" className="underline text-default-orange">termos e contratos.</a>
        </Label>
        {errors.termsAndContracts && (
          <p className="text-red-500 text-sm mt-1">{errors.termsAndContracts.message as string}</p>
        )}
      </div>

      <div className="flex items-center justify-center gap-8 mt-6 mb-8">
        <button
          type="submit"
          onClick={() => setValue('ura', false)}
          className="cursor-pointer font-semibold text-gray-500">
          Não tenho interesse
        </button>
        <Button
          type="submit"
          className="rounded-full bg-green-600 hover:bg-green-600/80 cursor-pointer p-6 text-lg">
          Finalizar pedido R$ 50,00/mês
        </Button>
      </div>
    </div>
  )
}

type ThirdStepProps = {
  form: UseFormReturn<any>,
}

export default Index