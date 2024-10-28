import EditTeamMemberForm from "@/components/Forms/TeamMember/editTeamMemberForm"
import users from '../my-team.json'
import { BusinessUser } from "@/components/Dashboard/Tables/MyTeam/columns"
import { EditTeamMemberTabs } from "@/components/Dashboard/Tabs/MyTeam/editTeamMemberTabs"
import { CompanyUser } from "../page"
import { fetchSingleUser } from "@/app/lib/actions"


export default async function MyTeamMemberDetails({ params }: {
  params: {
    id: string
  }
}) {

  const { id } = params
  const response = await fetchSingleUser(id);
  const user = response?.data as BusinessUser

  return (
    <main>

      <EditTeamMemberTabs user={user} />
    </main>
  )
}
