"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export type Queries = Array<{
  type: string
  value: string | number | Array<string | number>
  condition?: () => boolean
}>

export const useSearchParamEffect = (queries: Queries) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  return () => {
    const params = new URLSearchParams(searchParams)

    for (const query of queries) {
      if (query?.condition && !query.condition()) {
        params.delete(query.type)
        continue
      }

      if (Array.isArray(query.value)) {
        if (query.value.length === 0) {
          params.delete(query.type)
          continue
        }

        for (const value of query.value) {
          params.append(query.type, value.toString())
        }
      } else {
        if (query.value) {
          params.set(query.type, query.value.toString())
        } else {
          params.delete(query.type)
        }
      }
    }

    replace(`${pathname}?${params.toString()}`)
  }
}
