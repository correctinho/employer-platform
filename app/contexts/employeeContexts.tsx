'use client'

import { EmployeeResponse } from '@/utils/types/employee'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { fetchEmployees } from '../lib/actions'

type EmployeeContextData = {
    employees: EmployeeResponse[]
    getEmployees: () => Promise<void>
}

type EmployeeProviderProps = {
    children: ReactNode
}
export const EmployeeContext = createContext({} as EmployeeContextData)

export function EmployeesProvider({ children }: EmployeeProviderProps) {
    async function getEmployees() {
        const result = await fetchEmployees()
        setEmployees(result.data)
    }


    useEffect(() => {
        getEmployees()
    }, [])
    const [employees, setEmployees] = useState<EmployeeResponse[]>([])


    return (
        <EmployeeContext.Provider value={{ employees, getEmployees }}>
            {children}
        </EmployeeContext.Provider>
    )
}
