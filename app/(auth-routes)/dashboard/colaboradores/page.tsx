'use client'

import { BenefitsContext } from "@/app/contexts/benefitsContexts"
import { EmployeeContext } from "@/app/contexts/employeeContexts"
import { columns } from "@/components/Dashboard/Tables/Employees/columns"
import { DataTable } from "@/components/Dashboard/Tables/Employees/data-table"
import { useContext } from "react"

export default function Employees() {
    const {employees} = useContext(EmployeeContext)
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={employees} />
        </div>
    )
}
