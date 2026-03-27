'use client'

import { Label } from "../ui/label";
import { Controller, UseFormReturn } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { Customer } from "@/interface/Customer";
import { CircleAlert, Minus, Plus, Trash2 } from "lucide-react";

function Index({ customerData, form, step }: FirstStepProps) {
  const { formState: { errors }, setValue, control, register } = form

  const parseLicenseCount = (value: string | undefined) => {
    const n = parseInt(value || '1', 10)
    return Number.isFinite(n) && n >= 1 ? n : 1
  }

  useEffect(() => {
    if (step === 1) {
      setValue('modality', customerData?.firstStepData?.modality || '')
      setValue('ddd', customerData?.firstStepData?.ddd || '')
      setValue('package', customerData?.firstStepData?.package || '')
      setValue('licenses', customerData?.firstStepData?.licenses || '1')
      setValue('unitValue', customerData?.firstStepData?.unitValue || 'R$ 50,00/mês')
      setValue('contactAuthorization', customerData?.firstStepData?.contactAuthorization ?? false)
    }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row">

        <div>
          <Label className="text-1xl font-normal mb-1" htmlFor="modality">Modalidade</Label>
          <Input type="text" id="modality" placeholder="Nova linha" {...register('modality')} />
          {errors.modality && (
            <p className="text-red-500 text-sm mt-1">{String(errors.modality.message)}</p>)}
        </div>

        <div>
          <Label className="text-1xl font-normal mb-1" htmlFor="ddd">DDD</Label>
          <Input type="text" id="ddd" placeholder="Informe o DDD" {...register('ddd')} />
          {errors.ddd && (
            <p className="text-red-500 text-sm mt-1">{String(errors.ddd.message)}</p>)}
        </div>

        <div>
          <Label className="text-1xl font-normal mb-1" htmlFor="package">Pacote</Label>
          <Input type="text" id="package" placeholder="1 à 4 licenças" {...register('package')} />
          {errors.package && (
            <p className="text-red-500 text-sm mt-1">{String(errors.package.message)}</p>)}
        </div>

        <div className="max-w-30">
          <Label className="text-1xl font-normal mb-1" htmlFor="licenses">Licenças</Label>
          <Controller
            name="licenses"
            control={control}
            render={({ field }) => {
              const count = parseLicenseCount(field.value)
              return (
                <div className="flex items-stretch max-w-[180px]">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="shrink-0 rounded-r-none border-r-0 cursor-pointer border-default-orange bg-default-orange text-white hover:bg-default-orange/90 hover:text-white"
                    onClick={() => field.onChange(String(Math.max(1, count - 1)))}
                    disabled={count <= 1}
                    aria-label="Diminuir licenças">
                    <Minus className="size-4" />
                  </Button>
                  <Input
                    id="licenses"
                    type="text"
                    readOnly
                    tabIndex={-1}
                    className="rounded-none text-center font-medium pointer-events-none"
                    value={count}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="shrink-0 rounded-l-none border-l-0 cursor-pointer border-default-orange bg-default-orange text-white hover:bg-default-orange/90 hover:text-white"
                    onClick={() => field.onChange(String(count + 1))}
                    aria-label="Aumentar licenças">
                    <Plus className="size-4" />
                  </Button>
                </div>
              )
            }}
          />
          {errors.licenses && (
            <p className="text-red-500 text-sm mt-1">{String(errors.licenses.message)}</p>)}
        </div>

        <div>
          <Label className="text-1xl font-normal mb-1" htmlFor="unitValue">Valor unitário</Label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              id="unitValue"
              placeholder="Valor unitário"
              className="font-bold text-default-purple border-none bg-default-purple/10"
              value={`R$ 50,00/mês`}
              readOnly />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="bg-default-orange rounded-full cursor-pointer hover:bg-default-orange/40"
              aria-label="Diminuir licenças">
              <Trash2 color="white" className="size-4" />
            </Button>
          </div>
          {errors.unitValue && (
            <p className="text-red-500 text-sm mt-1">{String(errors.unitValue.message)}</p>)}
        </div>

      </div>

      <div className="flex justify-end">

        <Button
          type="button"
          className="cursor-pointer text-white rounded-2xl bg-default-orange hover:bg-default-orange/40"
          aria-label="Diminuir licenças">
          <Plus color="white" className="size-4" /> Adicionar
        </Button>
      </div>

      <div className="mt-8 mb-4">
        <Label htmlFor="contactAuthorization" className="flex items-start gap-2 font-normal text-sm cursor-pointer">
          <Controller
            name="contactAuthorization"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="contactAuthorization"
                className="mt-0.5"
                checked={field.value === true}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <span className="font-bold text-gray-500 text-xs">Autorizo ser contatado pelo telefone e e-mail preenchidos, para receber informações sobre o meu pedido.</span>
        </Label>
        {errors.contactAuthorization && (
          <p className="text-red-500 text-sm -mt-2">{String(errors.contactAuthorization.message)}</p>)}

        <span className="flex gap-2 text-xs text-default-orange bg-default-orange/20 mt-4 p-2 rounded-sm font-bold">
          <CircleAlert size={16} fill="#FFA500" color="white" />
          Seu número de celular é essencial para confirmarmos o pedido! Nossa equipe entrará em contato pelo Whatsapp +55 800 800 2019 para garantir o recebimento dos documentos.
        </span>
      </div>
    </div>
  )
}

export default Index

type FirstStepProps = {
  customerData: Customer | null,
  form: UseFormReturn<any>,
  step: number
}