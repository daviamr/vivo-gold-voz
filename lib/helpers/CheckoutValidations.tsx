import { UseFormClearErrors, UseFormSetError } from "react-hook-form"

export const validateStep1 = (
  data: CheckoutFormData,
  setError: UseFormSetError<CheckoutFormData>,
  clearErrors: UseFormClearErrors<CheckoutFormData>,
): boolean => {
  let hasError = false

  if (!data.modality?.trim()) {
    setError('modality', { message: 'Informe a modalidade.' })
    hasError = true
  } else { clearErrors('modality') }

  if (!data.ddd?.trim()) {
    setError('ddd', { message: 'Informe o DDD.' })
    hasError = true
  } else { clearErrors('ddd') }

  if (!data.package?.trim()) {
    setError('package', { message: 'Informe o pacote.' })
    hasError = true
  } else { clearErrors('package') }

  if (!data.licenses?.trim()) {
    setError('licenses', { message: 'Informe a quantidade de licenças.' })
    hasError = true
  } else { clearErrors('licenses') }

  if (!data.unitValue?.trim()) {
    setError('unitValue', { message: 'Informe o valor unitário.' })
    hasError = true
  } else { clearErrors('unitValue') }

  return !hasError
}

export const validateStep2 = (
  data: CheckoutFormData,
  setError: UseFormSetError<CheckoutFormData>,
  clearErrors: UseFormClearErrors<CheckoutFormData>,
): boolean => {
  let hasError = false

  if (!data.fullName?.trim() || data.fullName.trim().length < 2) {
    setError('fullName', { message: 'Informe seu nome completo.' })
    hasError = true
  } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(data.fullName)) {
    setError('fullName', { message: 'O nome não pode conter números ou caracteres especiais' })
    hasError = true
  } else if (data.fullName.trim().split(/\s+/).length < 2) {
    setError('fullName', { message: 'Informe seu nome completo.' })
    hasError = true
  } else {
    clearErrors('fullName')
  }

  if (!data.tel?.trim() || data.tel.trim().length < 4) {
    setError('tel', { message: 'Informe número de celular válido.' })
    hasError = true
  } else if (!/^\(\d{2}\)\s\d\s\d{4}-\d{4}$/.test(data.tel)) {
    setError('tel', { message: 'Celular inválido. Use o formato 00 0 0000-0000' })
    hasError = true
  } else { clearErrors('tel') }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email?.trim()) {
    setError('email', { message: 'Informe um e-mail válido.' })
    hasError = true
  } else if (!emailRegex.test(data.email)) {
    setError('email', { message: 'Informe um e-mail válido.' })
    hasError = true
  } else { clearErrors('email') }

  if (!data.cpf?.trim() || data.cpf.replace(/\D/g, '').length !== 11) {
    setError('cpf', { message: 'Informe um CPF válido (000.000.000-00).' })
    hasError = true
  } else { clearErrors('cpf') }

  if (!data.cnpj?.trim() || data.cnpj.replace(/\D/g, '').length !== 14) {
    setError('cnpj', { message: 'Informe um CNPJ válido (00.000.000/0000-00).' })
    hasError = true
  } else { clearErrors('cnpj') }

  if (!data.companyName?.trim()) {
    setError('companyName', { message: 'Informe a Razão Social.' })
    hasError = true
  } else { clearErrors('companyName') }

  if (!data.legalAuthorization) {
    setError('legalAuthorization', { message: 'É necessário ter autorização legal da empresa.' })
    hasError = true
  } else { clearErrors('legalAuthorization') }

  return !hasError
}

export const validateStep = (
  data: CheckoutFormData,
  setError: UseFormSetError<CheckoutFormData>,
  clearErrors: UseFormClearErrors<CheckoutFormData>,
): boolean => {
  let hasError = false

  if (!data.cep || !/^\d{5}-?\d{3}$/.test(data.cep)) {
    setError('cep', { message: 'CEP inválido. Use o formato 00000-000' })
    hasError = true
  } else { clearErrors('cep') }

  if (!data.homeNumber?.trim()) {
    setError('homeNumber', { message: 'Informe o número da residência.' })
    hasError = true
  } else { clearErrors('homeNumber') }

  if (!data.street?.trim()) {
    setError('street', { message: 'Informe a rua da residência.' })
    hasError = true
  } else { clearErrors('street') }

  if (!data.district?.trim()) {
    setError('district', { message: 'Informe seu bairro.' })
    hasError = true
  } else { clearErrors('district') }

  if (!data.city?.trim()) {
    setError('city', { message: 'Informe sua cidade.' })
    hasError = true
  } else { clearErrors('city') }

  if (!data.uf || data.uf.length < 2) {
    setError('uf', { message: 'Informe seu estado.' })
    hasError = true
  } else { clearErrors('uf') }

  if (!data.liveIn) {
    setError('liveIn', { message: 'Informe onde você mora.' })
    hasError = true
  } else { clearErrors('liveIn') }

  if (data.hasBlockAndLot) {
    if (!data.block?.trim()) {
      setError('block', { message: 'Informe a quadra.' })
      hasError = true
    } else { clearErrors('block') }

    if (!data.lot?.trim()) {
      setError('lot', { message: 'Informe o lote.' })
      hasError = true
    } else { clearErrors('lot') }
  }

  if (data.liveIn === 'building') {
    if (!data.complement) {
      setError('complement', { message: 'Informe um complemento válido.' })
      hasError = true
    } else { clearErrors('complement') }

    if (!data.floor) {
      setError('floor', { message: 'Informe o andar.' })
      hasError = true
    } else { clearErrors('floor') }
  }

  return !hasError
}

export const validateStep3 = (
  data: CheckoutFormData,
  setError: UseFormSetError<CheckoutFormData>,
  clearErrors: UseFormClearErrors<CheckoutFormData>
): boolean => {
  let hasError = false

  if (!data.termsAndContracts) {
    setError('termsAndContracts', { message: 'Você precisa aceitar os termos e contratos para continuar.' })
    hasError = true
  } else { clearErrors('termsAndContracts') }

  return !hasError
}

export const validateStep4 = (
  data: CheckoutFormData,
  setError: UseFormSetError<CheckoutFormData>,
  clearErrors: UseFormClearErrors<CheckoutFormData>,
): boolean => {
  let hasError = false

  if (!data.dueDay?.trim()) {
    setError('dueDay', { message: 'Selecione o dia do vencimento.' })
    hasError = true
  } else { clearErrors('dueDay') }

  if (!data.primaryTel?.trim() || data.primaryTel.replace(/\D/g, '').length < 10) {
    setError('primaryTel', { message: 'Informe um número de celular válido.' })
    hasError = true
  } else { clearErrors('primaryTel') }

  if (!data.termsOfUse) {
    setError('termsOfUse', { message: 'Você precisa aceitar os termos para continuar.' })
    hasError = true
  } else { clearErrors('termsOfUse') }

  return !hasError
}

export type CheckoutFormData = {
  modality?: string,
  ddd?: string,
  package?: string,
  licenses?: string,
  unitValue?: string,
  //
  fullName?: string,
  tel?: string,
  email?: string,
  //pj
  cnpj?: string,
  companyName?: string,
  legalAuthorization?: boolean,
  //
  cep?: string
  homeNumber?: string
  street?: string
  district?: string
  city?: string
  uf?: string
  liveIn?: string,
  complement?: string,
  landmark?: string,
  floor?: string,
  hasBlockAndLot?: boolean,
  block?: string,
  lot?: string,
  //
  dueDay?: string,
  ura?: boolean,
  termsAndContracts?: boolean,
  //
  cpf?: string,
  primaryTel?: string,
  secondaryTel?: string,
  termsOfUse?: boolean,
  acceptOffers?: boolean
}