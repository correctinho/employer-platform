'use client'

import { EmployeeContext } from "@/app/contexts/employeeContexts"
import { columns } from "@/components/Dashboard/Tables/Employees/columns"
import { DataTable } from "@/components/Dashboard/Tables/Employees/data-table"
import { useContext, useEffect } from "react"

export default function Employees() {
    const {employees, getEmployees} = useContext(EmployeeContext)
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={employees} />
        </div>
    )
}
