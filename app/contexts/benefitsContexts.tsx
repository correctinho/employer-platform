'use client'

import { EmployeeResponse } from '@/utils/types/employee'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { fetchAllCompanyItems } from '../lib/actions'

type BenefitsContextData = {
  benefits: any[]
  getBenefits: () => Promise<void>
}

type EmployeeProviderProps = {
  children: ReactNode
}
export const BenefitsContext = createContext({} as BenefitsContextData)

export function EmployeesProvider({ children }: EmployeeProviderProps) {
  async function getBenefits() {
    const result = await fetchAllCompanyItems()
    setBenefits(result.data)
    console.log({result})
  }

  useEffect(() => {
    getBenefits()
  }, [])
  const [benefits, setBenefits] = useState<EmployeeResponse[]>([])


  return (
    <BenefitsContext.Provider value={{ benefits, getBenefits }}>
      {children}
    </BenefitsContext.Provider>
  )
}
