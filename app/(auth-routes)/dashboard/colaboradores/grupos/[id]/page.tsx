import EditGroup, { EditGroupProps } from "@/components/groups/edit-group-form"
import { fetchOneBenefitGroup } from "@/app/lib/actions"


export default async function GroupDetails({ params }: {
    params: {
        id: string
    }
}) {

    const findGroup = await fetchOneBenefitGroup(params.id)

    const data = findGroup.data as EditGroupProps
    return (
        <>
            {findGroup ?

                <EditGroup {...data} />

                : 'Nenhum grupo encontrado'}
        </>
    )
}
