'use client'

import { useEffect, useState } from "react"
import CheckoutSteps from '../../components/checkout-steps/CheckoutSteps'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { withMask } from "use-mask-input"
import { Button } from "@/components/ui/button"
import { Loader, Wifi } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Customer } from "@/interface/Customer"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import FirstStep from '../../components/checkout-steps/FirstStep'
import ThirdStep from '../../components/checkout-steps/ThirdStep'
import FourthStep from '../../components/checkout-steps/FourthStep'
import { validateStep1, validateStep2, validateStep3, validateStep4 } from "@/lib/helpers/CheckoutValidations"
import { setStepQuery } from "@/lib/helpers/push"
import { useRouter, useSearchParams } from "next/navigation"
import { VivoFibraAPI } from "@/lib/VivoFibraAPI"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import {
  normalizeStoredLineModality,
  planNameForLicenseCount,
  PABX_LINE_ACTION,
} from "@/lib/checkout/pabxPlanBands"

export const checkoutPFPJSchema = z.object({
  //step 1
  modality: z.string().optional(),
  fixedLineNumber: z.string().optional(),
  ddd: z.string().optional(),
  package: z.string().optional(),
  licenses: z.string().optional(),
  unitValue: z.string().optional(),
  //
  fullName: z.string().optional(),
  tel: z.string().optional(),
  email: z.string().optional(),
  cnpj: z.string().optional(),
  companyName: z.string().optional(),
  legalAuthorization: z.boolean().optional(),
  contactAuthorization: z.boolean().optional(),
  ddi: z.string().optional(),
  // step 2
  cep: z.string().optional(),
  homeNumber: z.string().optional(),
  street: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  uf: z.string().optional(),
  liveIn: z.string().optional(),
  complement: z.string().optional(),
  landmark: z.string().optional(),
  floor: z.string().optional(),
  hasBlockAndLot: z.boolean().optional(),
  block: z.string().optional(),
  lot: z.string().optional(),
  // step 3
  dueDay: z.string().optional(),
  ura: z.boolean().optional(),
  termsAndContracts: z.boolean().optional(),
  // step 4
  cpf: z.string().optional(),
  primaryTel: z.string().optional(),
  secondaryTel: z.string().optional(),
  termsOfUse: z.boolean().optional(),
  acceptOffers: z.boolean().optional(),
})

export type CheckoutFormData = z.infer<typeof checkoutPFPJSchema>

function Index() {
  const vivoFibraAPI = new VivoFibraAPI()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState<number>(1)
  const [customerData, setCustomerData] = useState<Customer | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const STEPS = {
    1: {
      title: 'Olá! vamos iniciar sua compra online :)',
      subtitle: ''
    },
    2: {
      title: 'Agora, você precisa completar o endereço',
      subtitle: 'Endereço de Instalação de Fibra'
    },
    3: {
      title: '',
      subtitle: ''
    },
    4: {
      title: 'Informe seus dados pessoais',
      subtitle: 'Dados pessoais'
    }
  } as const
  const dueDate = ['01', '10', '17', '21', '26']
  const form = useForm<CheckoutFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(checkoutPFPJSchema),
    defaultValues: {
      modality: normalizeStoredLineModality(customerData?.firstStepData?.modality) || '',
      fixedLineNumber: customerData?.firstStepData?.fixedLineNumber || '',
      ddd: (customerData?.firstStepData?.ddd || '').replace(/\D/g, '').slice(0, 2),
      package:
        customerData?.firstStepData?.package?.trim() ||
        planNameForLicenseCount(
          parseInt(customerData?.firstStepData?.licenses || '1', 10) || 1,
        ),
      licenses: customerData?.firstStepData?.licenses || '1',
      unitValue: customerData?.firstStepData?.unitValue || 'R$ 50,00/mês',
      //
      fullName: customerData?.secondStepData?.fullName || '',
      tel: customerData?.secondStepData?.tel || '',
      email: customerData?.secondStepData?.email || '',
      cnpj: customerData?.secondStepData?.cnpj || '',
      companyName: customerData?.secondStepData?.companyName || '',
      legalAuthorization: customerData?.secondStepData?.legalAuthorization ?? false,
      contactAuthorization: customerData?.firstStepData?.contactAuthorization ?? false,
      ddi: customerData?.secondStepData?.ddi || '+55',
      //
      cep: customerData?.address?.cep || '',
      homeNumber: customerData?.address?.homeNumber || '',
      street: customerData?.address?.street || '',
      district: customerData?.address?.district || '',
      city: customerData?.address?.city || '',
      uf: customerData?.address?.uf || '',
      liveIn: customerData?.address?.liveIn || '',
      hasBlockAndLot: customerData?.address?.hasBlockAndLot || false,
      block: customerData?.address?.block || '',
      lot: customerData?.address?.lot || '',
      //
      ura: customerData?.thirdStepData?.ura ?? false,
      termsAndContracts: customerData?.thirdStepData?.termsAndContracts ?? false,
      //
      dueDay: customerData?.fourthStepData?.dueDay || '',
      cpf: customerData?.fourthStepData?.cpf || '',
      primaryTel: customerData?.fourthStepData?.primaryTel || '',
      secondaryTel: customerData?.fourthStepData?.secondaryTel || '',
      termsOfUse: customerData?.fourthStepData?.termsOfUse || false,
      acceptOffers: customerData?.fourthStepData?.acceptOffers || false,
    },
  })
  const { formState: { errors }, setValue, control, register } = form
  const DDI_OPTIONS = [
    { label: '🇧🇷 +55', value: '+55', mask: '(99) 9 9999-9999' },  // ← sem +55
    { label: '🇺🇸 +1', value: '+1', mask: '(999) 999-9999' },    // ← sem +1
    { label: '🇬🇧 +44', value: '+44', mask: '99 9999 9999' },       // ← sem +44
    { label: '🇵🇹 +351', value: '+351', mask: '999 999 999' },        // ← sem +351
  ];

  useEffect(() => {
    const customer = localStorage.getItem('customer')
    if (customer) {
      setCustomerData(JSON.parse(customer))
    }
    setIsLoaded(true)
  }, [step])

  useEffect(() => {
    const customer = localStorage.getItem('customer')
    if (customer) {
      setCustomerData(JSON.parse(customer))
    }

    const urlStep = searchParams.get('step')
    if (urlStep) {
      const stepNumber = parseInt(urlStep)
      if (stepNumber >= 1 && stepNumber <= 4) {
        setStep(stepNumber)
      }
    }

    setIsLoaded(true)
  }, [searchParams])

  useEffect(() => {
    if (!customerData) return

    // Step 1
    if (step === 1) {
      setValue('modality', normalizeStoredLineModality(customerData?.firstStepData?.modality) || '')
      setValue('fixedLineNumber', customerData?.firstStepData?.fixedLineNumber || '')
      setValue('ddd', (customerData?.firstStepData?.ddd || '').replace(/\D/g, '').slice(0, 2))
      const lic = parseInt(customerData?.firstStepData?.licenses || '1', 10) || 1
      setValue(
        'package',
        customerData?.firstStepData?.package?.trim() || planNameForLicenseCount(lic),
      )
      setValue('licenses', customerData?.firstStepData?.licenses || '1')
      setValue('unitValue', customerData?.firstStepData?.unitValue || 'R$ 50,00/mês')
    }

    // Step 2
    if (step === 2) {
      setValue('fullName', customerData?.secondStepData?.fullName || '')
      setValue('tel', customerData?.secondStepData?.tel || '')
      setValue('email', customerData?.secondStepData?.email || '')
      setValue('cnpj', customerData?.secondStepData?.cnpj || '')
      setValue('companyName', customerData?.secondStepData?.companyName || '')
      setValue('legalAuthorization', customerData?.secondStepData?.legalAuthorization ?? false)
      setValue('contactAuthorization', customerData?.secondStepData?.contactAuthorization ?? false)
      setValue('cpf', customerData?.secondStepData?.cpf || '')
      setValue('ddi', customerData?.secondStepData?.ddi || '+55')
    }

    // Step 3
    if (step === 3) {
      setValue('ura', customerData?.thirdStepData?.ura ?? false)
      setValue('termsAndContracts', customerData?.thirdStepData?.termsAndContracts ?? false)
    }

    // Step 4
    if (step === 4) {
      setValue('dueDay', customerData?.fourthStepData?.dueDay || '')
      const gestorCpf = customerData?.secondStepData?.cpf || customerData?.fourthStepData?.cpf || ''
      setValue('cpf', gestorCpf)
      setValue('primaryTel', customerData?.fourthStepData?.primaryTel || customerData?.secondStepData?.tel || '')
      setValue('secondaryTel', customerData?.fourthStepData?.secondaryTel || '')
      setValue('termsOfUse', customerData?.fourthStepData?.termsOfUse || false)
      setValue('acceptOffers', customerData?.fourthStepData?.acceptOffers || false)
    }
  }, [step, customerData, setValue])

  const onSubmit = async (data: CheckoutFormData) => {
    let dataToSave: Customer | null = null

    if (step === 1) {
      const firstStepData = {
        modality: data.modality,
        ddd: data.ddd,
        package: data.package,
        licenses: data.modality === PABX_LINE_ACTION.PORT ? '1' : data.licenses,
        unitValue: data.unitValue || 'R$ 50,00/mês',
        fixedLineNumber: data.fixedLineNumber?.trim(),
        contactAuthorization: data.contactAuthorization ?? customerData?.firstStepData?.contactAuthorization ?? false,
      }

      const isValid = validateStep1(data, form.setError, form.clearErrors)
      if (!isValid) return
      dataToSave = {
        ...customerData,
        firstStepData: {
          ...customerData?.firstStepData,
          ...firstStepData,
        }
      } as Customer
    }

    if (step === 2) {
      const secondStepData = {
        fullName: data.fullName,
        tel: data.tel,
        email: data.email,
        cnpj: data.cnpj,
        companyName: data.companyName,
        legalAuthorization: data.legalAuthorization,
        contactAuthorization: data.contactAuthorization,
        cpf: data.cpf
      }
      const isValid = await validateStep2(data, form.setError, form.clearErrors)
      if (!isValid) return
      dataToSave = {
        ...customerData,
        secondStepData: {
          ...customerData?.secondStepData,
          ...secondStepData,
        }
      } as Customer
    }

    if (step === 3) {
      const thirdStepData = {
        ura: data.ura ?? false,
        termsAndContracts: data.termsAndContracts ?? false,
      }
      const isValid = validateStep3(data, form.setError, form.clearErrors)
      if (!isValid) return
      dataToSave = { ...customerData, thirdStepData } as Customer
    }

    if (step === 4) {
      const gestorCpf = data.cpf?.trim()
        ? data.cpf
        : customerData?.secondStepData?.cpf ?? ''
      const fourthStepData = {
        dueDay: data.dueDay ?? '',
        cpf: gestorCpf,
        primaryTel: data.primaryTel,
        secondaryTel: data.secondaryTel,
        termsOfUse: data.termsOfUse,
        acceptOffers: data.acceptOffers,
        url: window.location.href
      }
      const isValid = validateStep4(data, form.setError, form.clearErrors)
      if (!isValid) return
      dataToSave = { ...customerData, fourthStepData } as Customer
    }

    if (!dataToSave) return

    setIsSubmitting(true)
    try {
      if (step === 1) {
        const step1Fields = {
          modality: data.modality,
          ddd: data.ddd,
          package: data.package,
          licenses: data.modality === PABX_LINE_ACTION.PORT ? '1' : data.licenses,
          unitValue: data.unitValue ?? dataToSave.firstStepData?.unitValue,
          fixedLineNumber: data.fixedLineNumber,
        }
        type CustomerWithLegacyOrderId = Customer & { orderId?: number }
        let orderId = customerData?.orderId ?? (customerData as CustomerWithLegacyOrderId | null)?.orderId

        if (!orderId) {
          orderId = 2
          // throw new Error(
          //   "Pedido não encontrado. Volte à seleção do plano e tente novamente.",
          // )
        }

        await vivoFibraAPI.updateOrderProgress(
          orderId,
          vivoFibraAPI.buildPjCheckoutStep1Partial(step1Fields),
        )
        dataToSave = { ...dataToSave, orderId }
      } else if (step === 2) {
        const id = customerData?.orderId
        if (!id) throw new Error("Pedido não encontrado. Volte à etapa 1.")
        await vivoFibraAPI.updateOrderProgress(
          id,
          vivoFibraAPI.buildPjCheckoutStep2Partial(dataToSave),
        )
      } else if (step === 3) {
        const id = customerData?.orderId
        if (!id) throw new Error("Pedido não encontrado. Volte à etapa 1.")
        await vivoFibraAPI.updateOrderProgress(
          id,
          vivoFibraAPI.buildPjCheckoutStep3Partial(dataToSave.thirdStepData),
        )
      } else if (step === 4) {
        const id = customerData?.orderId
        if (!id) throw new Error("Pedido não encontrado. Volte à etapa 1.")
        if (!dataToSave.fourthStepData) throw new Error("Dados da etapa 4 incompletos.")
        const gestorCpfDigits = (
          dataToSave.secondStepData?.cpf ??
          dataToSave.fourthStepData.cpf ??
          ""
        ).replace(/\D/g, "")
        const orderNumber = VivoFibraAPI.generateClientOrderNumber()
        const response = await vivoFibraAPI.updateOrderProgress(
          id,
          vivoFibraAPI.buildPjCheckoutStep4Partial({
            fourth: dataToSave.fourthStepData,
            gestorCpfDigits,
            orderNumber,
          }),
        )

        localStorage.setItem("customer", JSON.stringify(dataToSave))
        setCustomerData(dataToSave)

        if (response.disponibilidade === false) {
          router.push(`/unavailable`)
          return
        }
        router.push(`/available`)
        return
      }
    } catch (e) {
      console.error("Checkout API:", e)
      return
    } finally {
      setIsSubmitting(false)
    }

    localStorage.setItem('customer', JSON.stringify(dataToSave))
    setCustomerData(dataToSave)

    const nextStep = step + 1
    if (step < 4) {
      setStep(nextStep)
      setStepQuery(nextStep)
    }
  }

  if (!isLoaded) return <div className="h-[calc(100vh-76px)] flex justify-center items-center"><Loader className="animate-spin" size={48} color="purple" /></div>

  return (
    <div className="container m-auto px-4 my-12">
      <div className="relative grid gap-4 lg:grid-cols-3">
        <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-2">
          <CheckoutSteps step={step} />
          {(step === 4) && (
            <div className="bg-white p-4 mt-12 rounded-sm shadow-xs">
              <p className="font-light mb-4">Fatura e Instalação</p>
              <p className="text-2xl font-semibold text-gray-800">Qual é o dia de vencimento que melhor se adequa a sua necessidade?</p>

              <Controller
                name="dueDay"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    className="flex items-center justify-center my-2 border rounded-sm"
                    onValueChange={field.onChange}
                    value={field.value}>
                    {dueDate.map((date, i) => (
                      <div className="flex items-center justify-center border-x gap-2 grow p-2" key={i}>
                        <RadioGroupItem value={date} id={date} />
                        <Label htmlFor={date} className="text-2xl font-normal">{date}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )} />
              {errors.dueDay && (
                <p className="text-red-500 text-sm mt-1">{errors.dueDay.message}</p>)}
              <p className="font-light mt-2 mb-4 text-sm">*Sua fatura é digital e será enviada por e-mail.</p>
            </div>
          )}
          <div className={`bg-white p-4 rounded-sm shadow-xs mt-12`}>
            <div>
              <p className={`font-light mb-4 ${(step === 3) && 'hidden'}`}>
                {STEPS[step as keyof typeof STEPS].subtitle}</p>
              <p className={`text-2xl font-semibold ${step === 1 ? 'text-default-purple' : 'text-gray-800'}`}>
                {STEPS[step as keyof typeof STEPS].title}</p>
              {step === 1 && (
                <div>
                  <p className="text-lg font-bold text-gray-500 my-4">
                    Defina seu plano de PABX na Nuvem</p>

                  <FirstStep
                    form={form}
                    step={step}
                    customerData={customerData} />

                </div>
              )}
            </div>

            {(step === 2) && (
              <div className="mt-8">
                <p className={`text-2xl font-semibold text-gray-800`}>1. Dados da Empresa</p>
                <div className="grid gap-4 my-4">

                  <div>
                    <Label className="text-1xl font-normal mb-1" htmlFor="cnpj">CNPJ</Label>
                    <Controller
                      name="cnpj"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="cnpj"
                          type="text"
                          value={field.value}
                          onChange={field.onChange}
                          ref={withMask('99.999.999/9999-99', {
                            placeholder: '_',
                            showMaskOnHover: false,
                            showMaskOnFocus: false
                          })} />
                      )} />
                    {errors.cnpj && (
                      <p className="text-red-500 text-sm mt-1">{errors.cnpj.message}</p>)}
                  </div>

                  <div>
                    <Label className="text-1xl font-normal mb-1" htmlFor="companyName">Razão Social</Label>
                    <Input id="companyName" type="text" {...register('companyName')} />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>)}
                  </div>

                  <p className={`text-2xl font-semibold text-gray-800`}>2. Dados do Gestor</p>

                </div>

                <div
                  className={`grid gap-4 grid-cols-1 lg:grid-cols-2`}>

                  <div className={'col-span-2'}>
                    <Label className="text-1xl font-normal mb-1">Nome Completo</Label>
                    <Controller
                      name="fullName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          value={field.value}
                          onChange={field.onChange} />
                      )}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>)}
                  </div>

                  <div className="col-span-2">
                    <Label className="text-1xl font-normal mb-1">Celular</Label>
                    <div className="flex gap-2">

                      {/* Controller do DDI */}
                      <Controller
                        name="ddi"
                        control={control}
                        render={({ field }) => {
                          const currentMask = DDI_OPTIONS.find(d => d.value === field.value)?.mask ?? '(99) 9 9999-9999';

                          return (
                            <>
                              <Select
                                key={field.value}
                                value={field.value}
                                onValueChange={(val) => {
                                  field.onChange(val);
                                  setValue('tel', '');
                                }}>
                                <SelectTrigger className="w-[110px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {DDI_OPTIONS.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              {/* Controller do Tel usando a máscara do DDI atual */}
                              <Controller
                                name="tel"
                                control={control}
                                render={({ field: telField }) => (
                                  <Input
                                    type="text"
                                    value={telField.value ?? ''}
                                    onChange={(e) => telField.onChange(e.target.value)}
                                    onBlur={telField.onBlur}
                                    ref={withMask(currentMask, {
                                      placeholder: '',
                                      showMaskOnHover: false,
                                      showMaskOnFocus: false,
                                    })}
                                  />
                                )}
                              />
                            </>
                          );
                        }}
                      />

                    </div>
                    {errors.tel && <p className="text-red-500 text-sm mt-1">{errors.tel.message}</p>}
                  </div>

                  <Label htmlFor="legalAuthorization" className="flex items-center gap-2 font-normal text-sm lg:col-span-2">
                    <Controller
                      name="legalAuthorization"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="legalAuthorization"
                          checked={field.value}
                          onCheckedChange={field.onChange} />
                      )} />
                    Tenho autorização legal para contratar em nome da empresa.
                  </Label>
                  {errors.legalAuthorization && (
                    <p className="text-red-500 text-sm mt-1">{errors.legalAuthorization.message}</p>)}

                  <div className="lg:col-span-2">
                    <Label className="text-1xl font-normal mb-1">E-mail</Label>
                    <Input type="email" {...register('email')} />
                    <span className="opacity-75 text-sm font-light">E-mail para envio da fatura digital.</span>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}
                  </div>

                  <div className="col-span-2">
                    <Label className="text-1xl font-normal mb-1" htmlFor="cpf">CPF</Label>
                    <Controller
                      name="cpf"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="cpf"
                          type="text"
                          value={field.value}
                          onChange={field.onChange}
                          ref={withMask('999.999.999-99', {
                            placeholder: '_',
                            showMaskOnHover: false,
                            showMaskOnFocus: false
                          })} />
                      )} />
                    {errors.cpf && (
                      <p className="text-red-500 text-sm mt-1">{errors.cpf.message}</p>)}
                  </div>

                </div>
              </div>
            )}

            {(step === 3) && (<ThirdStep form={form} />)}

            {(step === 4) && (<FourthStep form={form} />)}

            <Button
              variant={'vivo'}
              className="w-full py-7 rounded-sm text-1xl text-white mt-4"
              type="submit"
              disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader className="inline animate-spin mr-2" size={20} />
                  Enviando…
                </>
              ) : (
                'Avançar'
              )}
            </Button>
          </div>
        </form>

        <div className="bg-white p-4 rounded-sm py-8 h-max shadow-xs">
          <p className="text-2xl font-semibold text-gray-800 mb-4">Meu plano</p>

          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 font-light"> <Wifi size={18} /> {customerData?.plan?.name}</p>

            <p className="font-light">
              {customerData?.plan?.pricing?.base_monthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}/mês</p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="flex items-center gap-2 font-light">Total</p>

            <p className="font-light">
              {customerData?.plan?.pricing?.base_monthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}/mês</p>
          </div>
        </div>

      </div>

    </div >
  )
}

export default Index