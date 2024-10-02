import { fetchSingleEmployeeInfo } from "@/app/lib/actions"
import { EmployeeTabs } from "@/components/Dashboard/Tabs/Employee/employeeTabs"
import { EmployeeResponse } from "@/utils/types/employee"


export default async function EmployeeDetails({ params }: {params: {
    id: string
}}){

    // const result = await fetchSingleEmployeeInfo(params.id)
    // const data: EmployeeResponse = result.employeeInfo
    return(
        <main>
            <EmployeeTabs employeeId={params.id}/>
        </main>
    )
}
