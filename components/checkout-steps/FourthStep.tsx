'use client'

import { useEffect, useState } from "react";
import { withMask } from "use-mask-input";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Controller, UseFormReturn } from "react-hook-form";

const DDI_OPTIONS = [
  { label: "🇧🇷 +55", value: "+55", mask: "(99) 9 9999-9999" },
  { label: "🇺🇸 +1", value: "+1", mask: "(999) 999-9999" },
  { label: "🇬🇧 +44", value: "+44", mask: "99 9999 9999" },
  { label: "🇵🇹 +351", value: "+351", mask: "999 999 999" },
] as const;

function Index({ form }: SecondStepProps) {
  const { formState: { errors }, control, setValue, getValues } = form

  const [primaryDdi, setPrimaryDdi] = useState("+55")
  const [secondaryDdi, setSecondaryDdi] = useState("+55")

  useEffect(() => {
    const step2Ddi = getValues("ddi")
    if (step2Ddi && typeof step2Ddi === "string") {
      setPrimaryDdi(step2Ddi)
    }
  }, [getValues])

  return (
    <div className="mt-8">

      <div className="grid gap-4 lg:grid-cols-2">

        <div className="lg:col-span-2">
          <p className="text-2xl font-semibold text-gray-800 mb-4">Confirmação via SMS</p>
          <p className="font-light text-[13px]"><span className="font-bold text-red-700">IMPORTANTE!</span> O SMS para realização da biometria será enviado ao número informado abaixo:</p>
        </div>

        <div className="lg:col-span-2">
          <Label className="text-1xl font-normal mb-1" htmlFor="primaryTel">Telefone Principal</Label>
          <div className="flex gap-2">
            <Select
              key={primaryDdi}
              value={primaryDdi}
              onValueChange={(val) => {
                setPrimaryDdi(val)
                setValue("primaryTel", "")
              }}>
              <SelectTrigger className="w-[110px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DDI_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Controller
              key={`primaryTel-${primaryDdi}`}
              name="primaryTel"
              control={control}
              render={({ field }) => {
                const currentMask =
                  DDI_OPTIONS.find((d) => d.value === primaryDdi)?.mask ?? "(99) 9 9999-9999"
                return (
                  <Input
                    id="primaryTel"
                    type="text"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                    ref={withMask(currentMask, {
                      placeholder: "",
                      showMaskOnHover: false,
                      showMaskOnFocus: false,
                    })}
                  />
                )
              }}
            />
          </div>
          {errors.primaryTel && (
            <p className="text-red-500 text-sm mt-1">{String(errors.primaryTel.message)}</p>)}
        </div>
        <span className="text-[13px] font-light lg:col-span-2">Se desejar, adicione um segundo número de contato para garantir o recebimento da mensagem.</span>

        <div className="lg:col-span-2">
          <Label className="text-1xl font-normal mb-1" htmlFor="secondaryTel">Segundo número de contato (opcional)</Label>
          <div className="flex gap-2">
            <Select
              key={secondaryDdi}
              value={secondaryDdi}
              onValueChange={(val) => {
                setSecondaryDdi(val)
                setValue("secondaryTel", "")
              }}>
              <SelectTrigger className="w-[110px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DDI_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Controller
              key={`secondaryTel-${secondaryDdi}`}
              name="secondaryTel"
              control={control}
              render={({ field }) => {
                const currentMask =
                  DDI_OPTIONS.find((d) => d.value === secondaryDdi)?.mask ?? "(99) 9 9999-9999"
                return (
                  <Input
                    id="secondaryTel"
                    type="text"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                    ref={withMask(currentMask, {
                      placeholder: "",
                      showMaskOnHover: false,
                      showMaskOnFocus: false,
                    })}
                  />
                )
              }}
            />
          </div>
          {errors.secondaryTel && (
            <p className="text-red-500 text-sm mt-1">{String(errors.secondaryTel.message)}</p>)}
        </div>

        <div className="grid gap-2 px-2 mb-2 lg:col-span-2">
          <div className="flex items-center gap-2 mt-4">
            <Controller
              name="termsOfUse"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="termsOfUse"
                  checked={field.value}
                  onCheckedChange={field.onChange} />
              )} />
            <label htmlFor="termsOfUse" className={`text-sm ${errors.termsOfUse ? 'text-red-500 underline' : ''}`}>Aceito os <span className="underline">Termos e Condições de Uso.</span></label>
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="acceptOffers"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="acceptOffers"
                  checked={field.value === true}
                  onCheckedChange={field.onChange} />
              )} />
            <label
              htmlFor="acceptOffers"
              className="text-sm">
              Aceito receber comunicações e ofertas da Vivo e Parceiros.</label>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Index

type SecondStepProps = {
  form: UseFormReturn<any>,
}