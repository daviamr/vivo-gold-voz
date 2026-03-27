import { Suspense } from 'react'
import CheckoutContent from '../../components/checkout-steps/CheckoutContent'

export default function Page() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Carregando…</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
