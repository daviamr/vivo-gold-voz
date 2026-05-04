import { ViaCepResponse } from "@/lib/ViaCEP"
import { IPlan } from "./Plan"

export interface Customer {
  address: Address,
  plan: IPlan,
  firstStepData?: FirstStepData,
  secondStepData?: SecondStepData,
  thirdStepData?: ThirdStepData,
  fourthStepData?: FourthStepData,
  /** ID retornado pelo POST inicial em pedido-telefonia-movel (checkout PJ). */
  orderId?: number,
}

type Address = ViaCepResponse & {
  cep: string,
  homeNumber: string,
  street?: string,
  district?: string,
  city?: string,
  liveIn?: string,
  hasBlockAndLot?: boolean,
  block?: string,
  lot?: string,
  TVPlan?: string,
  typeInstalation?: string,
  cnpj?: string,
  landmark?: string,
  floor?: string,
  complement?: string,
}

type FirstStepData = {
  modality: string,
  ddd: string,
  package: string,
  licenses: string,
  unitValue: string,
}

type SecondStepData = {
  fullName: string,
  tel: string,
  email: string,
  cnpj?: string,
  cpf?: string,
  companyName?: string,
  legalAuthorization?: boolean,
  contactAuthorization?: boolean,
  ddi?: string,
}

type ThirdStepData = {
  ura?: boolean,
  termsAndContracts?: boolean,
  primaryDate?: string,
  primaryPeriod?: string,
  secondaryDate?: string,
  secondaryPeriod?: string
}

type FourthStepData = {
  dueDay: string,
  /** Legado PF; checkout PJ não coleta esta etapa aqui. */
  bornDate?: string,
  /** CPF do gestor quando capturado na etapa 4 legada; PJ costuma usar `firstStepData.cpf`. */
  cpf?: string,
  motherName?: string,
  primaryTel?: string,
  secondaryTel?: string,
  termsOfUse?: boolean,
  acceptOffers?: boolean,
  url?: string,
  //
  portability?: boolean,
  portabilityNumber?: string,
  fixIp?: boolean
}