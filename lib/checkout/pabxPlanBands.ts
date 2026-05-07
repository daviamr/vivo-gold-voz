/** Faixas de licenças — rótulo exibido = `plan_name` na API. */
export const PABX_LICENSE_BANDS = [
  { planName: "1 a 4 licenças", min: 1, max: 4 },
  { planName: "5 a 8 licenças", min: 5, max: 8 },
  { planName: "9 a 20 licenças", min: 9, max: 20 },
  { planName: "21 a 30 licenças", min: 21, max: 30 },
  { planName: "Acima de 30 licenças", min: 31, max: Number.POSITIVE_INFINITY },
] as const

export type PabxLineAction = "new_line" | "port_in_to_vivo"

export const PABX_LINE_ACTION = {
  NEW_LINE: "new_line" satisfies PabxLineAction,
  PORT: "port_in_to_vivo" satisfies PabxLineAction,
} as const

export const URA_ADDITIONAL = {
  extra_id: "ura",
  price: 50,
  value: 1,
} as const

export function planNameForLicenseCount(count: number): string {
  const n = Number.isFinite(count) ? Math.max(1, Math.floor(count)) : 1
  for (const b of PABX_LICENSE_BANDS) {
    if (n >= b.min && n <= b.max) return b.planName
  }
  return PABX_LICENSE_BANDS[PABX_LICENSE_BANDS.length - 1]!.planName
}

export function clampLicensesToPlanName(planName: string, count: number): number {
  const band = PABX_LICENSE_BANDS.find((b) => b.planName === planName)
  if (!band) return Math.max(1, Math.floor(count))
  const n = Math.floor(count)
  if (n < band.min) return band.min
  if (n > band.max) return band.max === Number.POSITIVE_INFINITY ? Math.max(band.min, n) : band.max
  return n
}

/** Compatível com valores antigos salvos como texto livre ("Nova linha"). */
export function normalizeStoredLineModality(raw: string | undefined): string {
  if (!raw?.trim()) return ""
  const t = raw.trim().toLowerCase()
  if (t === PABX_LINE_ACTION.NEW_LINE || t === PABX_LINE_ACTION.PORT) return t
  if (t.includes("port")) return PABX_LINE_ACTION.PORT
  return PABX_LINE_ACTION.NEW_LINE
}
