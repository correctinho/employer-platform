import { fetchAllBenefitGroups } from "@/app/lib/actions"
import { Groups, columns } from "@/components/Dashboard/Tables/Groups/columns"
import { DataTable } from "@/components/Dashboard/Tables/Groups/data-table"


export default async function GroupsPage(){
    const benefitGroups = await fetchAllBenefitGroups()
    const data = benefitGroups.data
    return(
        <>
            <DataTable columns={columns} data={data} />
        </>
    )
}
