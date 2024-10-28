
import { columns } from '@/components/Dashboard/Tables/MyTeam/columns'
import users from './my-team.json'
import { DataTable } from "@/components/Dashboard/Tables/MyTeam/data-table"
import { auth } from '@/app/lib/auth'
import { fetchCompanyUsers } from '@/app/lib/actions'

export type CompanyUser = {
  uuid: string
  img: string | null
  is_admin: boolean
  user_name: string
  document: string | null
  permissions: string[]
  email: string | null
  function: string | null
  status: string
  token: string
}

export default async function MyTeam() {

  const session = await auth()

  const data = await fetchCompanyUsers(session!.user?.business_info_id);
  return (
    <main>
      <DataTable columns={columns} data={data} />
    </main>
  )
}
