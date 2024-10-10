'use client'

import { EmployeeResponse } from '@/utils/types/employee'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { fetchAllCompanyItems, fetchEmployees } from '../lib/actions'

type EmployeeContextData = {
  employees: EmployeeResponse[]
  getEmployees: () => Promise<void>
  benefits: any[]

}

type EmployeeProviderProps = {
  children: ReactNode
}
export const EmployeeContext = createContext({} as EmployeeContextData)





export function EmployeesProvider({ children }: EmployeeProviderProps) {
  const [benefits, setBenefits] = useState<EmployeeResponse[]>([])

  async function getEmployees() {
    const result = await fetchEmployees()
    setEmployees(result.data)
  }

  async function getBenefits() {
    const result = await fetchAllCompanyItems()
    setBenefits(result.data)
  }


  useEffect(() => {
    getEmployees()
    getBenefits()

  }, [])
  const [employees, setEmployees] = useState<EmployeeResponse[]>([])


  return (
    <EmployeeContext.Provider value={{ employees, getEmployees, benefits }}>
      {children}
    </EmployeeContext.Provider>
  )
}
