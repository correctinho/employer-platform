'use server'

import { columns } from '@/components/Dashboard/Tables/MyTeam/columns'
import users from './my-team.json'
import { DataTable } from "@/components/Dashboard/Tables/MyTeam/data-table"
import { fetchTeam } from '@/app/lib/actions'


export default async function MyTeam(){
    //Alterar somente o setupAPIClient quando tiver backend

    const result = await fetchTeam()
    return(
        <main>
            <DataTable columns={columns} data={result.data}/>
        </main>
    )
}