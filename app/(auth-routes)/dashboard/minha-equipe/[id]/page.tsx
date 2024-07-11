import EditTeamMemberForm from "@/components/Forms/TeamMember/editTeamMemberForm"
import users from '../my-team.json'
import { BusinessUser } from "@/components/Dashboard/Tables/MyTeam/columns"
import { EditTeamMemberTabs } from "@/components/Dashboard/Tabs/MyTeam/editTeamMemberTabs"
import { fetchSingleTeamMember } from "@/app/lib/actions"


export default async function MyTeamMemberDetails({ params }: {params: {
    id: string
}}){

    const result = await fetchSingleTeamMember(params.id)

    return (
        <main>
            
            <EditTeamMemberTabs {...result.data}/>
        </main>
    )
}