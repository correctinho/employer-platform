import { fetchBusinessBenefits } from "@/app/lib/actions"
import { BenefitsTabs } from "@/components/Dashboard/Tabs/Benefits/benefitsTabs"

export default async function Dashboard() {

    const result = await fetchBusinessBenefits()
    return (
        
        <main>
            <BenefitsTabs benefits={result.data}/>
        </main>
    )
}