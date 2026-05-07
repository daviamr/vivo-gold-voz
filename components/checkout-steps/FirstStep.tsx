'use client'

import { Label } from "../ui/label"
import { Controller, UseFormReturn, useWatch } from "react-hook-form"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useEffect, useMemo, useState } from "react"
import { Customer } from "@/interface/Customer"
import { CircleAlert, Minus, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { withMask } from "use-mask-input"
import {
  PABX_LICENSE_BANDS,
  PABX_LINE_ACTION,
  clampLicensesToPlanName,
  normalizeStoredLineModality,
  planNameForLicenseCount,
} from "@/lib/checkout/pabxPlanBands"

const FIXED_LINE_DDI_OPTIONS = [
  { label: "🇧🇷 +55", value: "+55", mask: "(99) 9 9999-9999" },
  { label: "🇺🇸 +1", value: "+1", mask: "(999) 999-9999" },
  { label: "🇬🇧 +44", value: "+44", mask: "99 9999 9999" },
  { label: "🇵🇹 +351", value: "+351", mask: "999 999 999" },
] as const

function Index({ customerData, form, step }: FirstStepProps) {
  const { formState: { errors }, setValue, control, register, getValues } = form

  const [fixedLineDdi, setFixedLineDdi] = useState("+55")

  const modality = useWatch({ control, name: "modality" })
  const isNewLine = modality === PABX_LINE_ACTION.NEW_LINE
  const isPortability = modality === PABX_LINE_ACTION.PORT

  const parseLicenseCount = (value: string | undefined) => {
    const n = parseInt(value || "1", 10)
    return Number.isFinite(n) && n >= 1 ? n : 1
  }

  const packageLabels = useMemo(
    () => PABX_LICENSE_BANDS.map((b) => b.planName),
    [],
  )

  useEffect(() => {
    if (step !== 1) return
    const normalized = normalizeStoredLineModality(customerData?.firstStepData?.modality)
    const licSaved = parseLicenseCount(customerData?.firstStepData?.licenses)
    const pkgSaved = customerData?.firstStepData?.package?.trim()
    let pkg =
      pkgSaved && packageLabels.includes(pkgSaved as (typeof packageLabels)[number])
        ? pkgSaved
        : planNameForLicenseCount(licSaved)

    setValue("modality", normalized || "")
    setValue(
      "ddd",
      (customerData?.firstStepData?.ddd ?? "").replace(/\D/g, "").slice(0, 2),
    )
    if (normalized === PABX_LINE_ACTION.PORT) {
      setValue("licenses", "1")
      setValue(
        "fixedLineNumber",
        customerData?.firstStepData?.fixedLineNumber ?? "",
      )
    } else {
      const count = normalized ? clampLicensesToPlanName(pkg, licSaved) : licSaved
      setValue("licenses", String(count))
      pkg = planNameForLicenseCount(count)
      setValue("package", pkg)
      setValue("fixedLineNumber", "")
    }
    setValue("unitValue", customerData?.firstStepData?.unitValue || "R$ 50,00/mês")
    setValue(
      "contactAuthorization",
      customerData?.firstStepData?.contactAuthorization ?? false,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hidratação inicial do passo
  }, [])

  useEffect(() => {
    if (!modality) return
    if (modality === PABX_LINE_ACTION.PORT) {
      setValue("licenses", "1")
      setValue("ddd", "")
      setValue("package", "")
      return
    }
    if (modality === PABX_LINE_ACTION.NEW_LINE) {
      setValue("fixedLineNumber", "")
      const n = parseLicenseCount(getValues("licenses"))
      setValue("package", planNameForLicenseCount(n))
    }
  }, [modality, setValue, getValues])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap">

        <div className="min-w-[200px]">
          <Label className="text-1xl font-normal mb-1" htmlFor="modality">Modalidade</Label>
          <Controller
            name="modality"
            control={control}
            render={({ field }) => (
              <Select value={field.value || ""} onValueChange={field.onChange}>
                <SelectTrigger id="modality" className="w-full min-w-[200px]">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PABX_LINE_ACTION.NEW_LINE}>Nova Linha</SelectItem>
                  <SelectItem value={PABX_LINE_ACTION.PORT}>Portabilidade</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.modality && (
            <p className="text-red-500 text-sm mt-1">{String(errors.modality.message)}</p>)}
        </div>

        {isNewLine && (
          <>
            <div className="w-full max-w-[120px]">
              <Label className="text-1xl font-normal mb-1" htmlFor="ddd">DDD</Label>
              <Controller
                name="ddd"
                control={control}
                render={({ field }) => (
                  <Input
                    id="ddd"
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    placeholder="00"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const d = e.target.value.replace(/\D/g, "").slice(0, 2)
                      field.onChange(d)
                    }}
                  />
                )}
              />
              {errors.ddd && (
                <p className="text-red-500 text-sm mt-1">{String(errors.ddd.message)}</p>)}
            </div>

            <div className="min-w-[220px]">
              <Label className="text-1xl font-normal mb-1" htmlFor="package">Pacote</Label>
              <Controller
                name="package"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={(v) => {
                      field.onChange(v)
                      const cur = parseLicenseCount(getValues("licenses"))
                      const next = clampLicensesToPlanName(v, cur)
                      setValue("licenses", String(next))
                    }}
                  >
                    <SelectTrigger id="package" className="w-full">
                      <SelectValue placeholder="Faixa de licenças" />
                    </SelectTrigger>
                    <SelectContent>
                      {packageLabels.map((label) => (
                        <SelectItem key={label} value={label}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
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
                        onClick={() => {
                          const next = Math.max(1, count - 1)
                          field.onChange(String(next))
                          setValue("package", planNameForLicenseCount(next))
                        }}
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
                        onClick={() => {
                          const next = count + 1
                          field.onChange(String(next))
                          setValue("package", planNameForLicenseCount(next))
                        }}
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
          </>
        )}

        {isPortability && (
          <div className="min-w-[260px] grow">
            <Label className="text-1xl font-normal mb-1" htmlFor="fixedLineNumber">Número fixo</Label>
            <div className="flex gap-2">
              <Select
                key={fixedLineDdi}
                value={fixedLineDdi}
                onValueChange={(val) => {
                  setFixedLineDdi(val)
                  setValue("fixedLineNumber", "")
                }}>
                <SelectTrigger className="w-[110px] shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FIXED_LINE_DDI_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Controller
                key={`fixedLineNumber-${fixedLineDdi}`}
                name="fixedLineNumber"
                control={control}
                render={({ field }) => {
                  const currentMask =
                    FIXED_LINE_DDI_OPTIONS.find((d) => d.value === fixedLineDdi)?.mask ??
                    "(99) 9 9999-9999"
                  return (
                    <Input
                      id="fixedLineNumber"
                      type="text"
                      className="min-w-0 flex-1"
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
            {errors.fixedLineNumber && (
              <p className="text-red-500 text-sm mt-1">{String(errors.fixedLineNumber.message)}</p>)}
          </div>
        )}

        {isNewLine && (
          <div>
            <Label className="text-1xl font-normal mb-1" htmlFor="unitValue">Valor unitário</Label>
            <Input
              type="text"
              id="unitValue"
              placeholder="Valor unitário"
              className="font-bold text-default-purple border-none bg-default-purple/10 max-w-[220px]"
              {...register("unitValue")}
              readOnly
            />
            {errors.unitValue && (
              <p className="text-red-500 text-sm mt-1">{String(errors.unitValue.message)}</p>)}
          </div>
        )}
      </div>

      {isNewLine && (
        <div className="flex justify-end">
          <Button
            type="button"
            className="cursor-pointer text-white rounded-2xl bg-default-orange hover:bg-default-orange/40"
            disabled
            title="Aguardando definição da API para múltiplos blocos"
            aria-disabled="true">
            <Plus color="white" className="size-4" /> Adicionar
          </Button>
        </div>
      )}

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
