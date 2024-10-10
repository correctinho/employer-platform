import { auth } from "@/app/lib/auth";
import { ProfileTabs } from "@/components/Dashboard/Tabs/Profile/profileTabs";

export default async function Profile(){
    const session = await auth()
    return(
        <main>
            <ProfileTabs user_status={session?.user.status ? session?.user.status : ""}/>
        </main>
    )
}
