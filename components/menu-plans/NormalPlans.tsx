'use client'

import { ArrowLeft, ArrowRight, Check, Loader } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { VivoFibraAPI } from "@/lib/VivoFibraAPI"
import type { IPlan } from "@/interface/Plan"

export default function NormalPlans() {
  const router = useRouter()
  const vivoFibraAPI = new VivoFibraAPI()
  const [plans, setPlans] = useState<IPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [checkoutPlanId, setCheckoutPlanId] = useState<number | null>(null)
  
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setLoadError(false)
      try {
        const api = new VivoFibraAPI()
        const list = await api.getPlans()
        const safe = Array.isArray(list) ? list : []
        const normalized = safe.map((plan: IPlan) => ({
          ...plan,
          extras: VivoFibraAPI.normalizePlanExtras(plan.extras),
        }))
        if (!cancelled) {
          setPlans(normalized)
          setLoadError(normalized.length === 0)
        }
      } catch {
        if (!cancelled) {
          setPlans([])
          setLoadError(true)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const handleCheckout = async (plan: IPlan) => {
    const customerData = localStorage.getItem('customer')
    const customer = customerData ? JSON.parse(customerData) : {}
    const dataToSave = { ...customer, plan }
    try {
      setCheckoutPlanId(plan.id)
      const res = await vivoFibraAPI.saveConsultOrder(
        plan
      )
      console.log(res)
      const orderId = VivoFibraAPI.extractOrderId(res)
      console.log(orderId)
      localStorage.setItem(
        'customer',
        JSON.stringify({ ...dataToSave, ...(orderId ? { orderId } : {}) }),
      )
    } catch (e) {
      console.error('Erro ao registrar consulta do plano:', e)
      localStorage.setItem('customer', JSON.stringify(dataToSave))
    } finally {
      setCheckoutPlanId(null)
    }
    router.push('/checkout?step=1')
  }

  if (loading) {
    return (
      <div id="card-section" className="flex justify-center items-center py-24">
        <Loader className="animate-spin text-default-purple" size={48} />
      </div>
    )
  }

  if (loadError || plans.length === 0) {
    return (
      <div id="card-section" className="text-center py-16 text-gray-600">
        <p>Não foi possível carregar os planos no momento.</p>
        <p className="text-sm mt-2">Atualize a página ou tente novamente mais tarde.</p>
      </div>
    )
  }

  const maxCardsPerPage = 4

  const getPaginatedPlans = () => {
    if (!plans || plans.length === 0) return []
    const startIndex = currentPage * maxCardsPerPage
    const endIndex = startIndex + maxCardsPerPage
    return plans.slice(startIndex, endIndex)
  }

  const handleNextPage = () => {
    if (!plans) return
    const totalPages = Math.ceil(plans.length / maxCardsPerPage)
    setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 >= 0 ? prev - 1 : prev))
  }

  const totalPages = plans ? Math.ceil(plans.length / maxCardsPerPage) : 0

  const paginatedPlans = getPaginatedPlans()

  return (
    <div id="card-section">
      <div className="grid gap-y-8 justify-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-full">
        {paginatedPlans.map((plan) => {
          const price = plan.pricing?.base_monthly ?? 0
          const badge =
            typeof plan.badge === "string" ? plan.badge.trim() : ""
          const headline =
            typeof plan.offer_subtitle === "string" && plan.offer_subtitle.trim() !== ""
              ? plan.offer_subtitle
              : plan.offer_title || plan.offer_subtitle
          const keyId = typeof plan.id === "number" ? plan.id : plan.name

          return (
            <div
              className="relative border rounded-sm shadow-xs max-w-75 mt-8 bg-white h-full"
              key={keyId}>
              {badge && (
                <span className="absolute left-0 -top-3 uppercase text-white text-[10px] bg-default-purple py-1 px-2 rounded-sm tracking-wide">
                  {badge}
                </span>
              )}
              <div className="flex flex-col justify-between h-full">
                <div className="p-4">
                  <p className="font-semibold">{plan.name}</p>

                  <div className="flex flex-col gap-4 mt-1 border-b pb-4">
                    <p className="text-3xl max-w-60">{headline}</p>
                    <p className="flex items-center gap-2 text-gray-500">
                      <Check /> Ligações ilimitadas para todo o Brasil
                    </p>
                  </div>

                  <div className="py-4 border-b">
                    <p className="font-semibold">URA como solução adicional &#185;</p>
                  </div>

                  <div className="flex justify-between items-center bg-[#f8f8f8] rounded-sm mt-4 p-4">
                    <p className="max-w-40">1 ano grátis de IA com Perplexity Pro</p>
                    <Image src={"/perplexity-logo.webp"} alt="Perplexity Pro" width={32} height={32} />
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-sm font-semibold">A partir de</p>
                  <p className="text-left text-2xl">
                    {price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: price % 1 === 0 ? 0 : 2,
                      maximumFractionDigits: 2,
                    })}
                    /mês
                  </p>
                  <p className="text-sm text-gray-500 pb-6">por licença</p>
                  <Button
                    variant={'vivoPlans'}
                    className="w-full rounded-sm p-6 text-white tracking-wider"
                    disabled={checkoutPlanId === plan.id}
                    onClick={() => void handleCheckout(plan)}>
                    {checkoutPlanId === plan.id ? 'Carregando…' : 'Assinar Plano'}
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
        {plans.length > maxCardsPerPage && (
          <div className="col-span-full flex items-center justify-center gap-4 mt-4">
            <Button
              variant="outline"
              type="button"
              className="rounded-full cursor-pointer border-none"
              onClick={handlePrevPage}
              disabled={currentPage === 0}>
              <ArrowLeft color="purple" />
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentPage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer ${currentPage === index
                      ? "bg-purple-600 scale-125"
                      : "bg-gray-300 hover:bg-purple-300"
                    }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              type="button"
              className="rounded-full cursor-pointer border-none"
              onClick={handleNextPage}
              disabled={currentPage + 1 >= totalPages}>
              <ArrowRight color="purple" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
