import { fetchSingleCompanyItem } from "@/app/lib/actions"
import { SingleBenefitsTabs } from "@/components/Dashboard/Tabs/SingleBenefit/singleBenefitTabs"

export default async function BusinessBenefit({ params }: {
  params: {
    id: string
  }
}) {
  const benefit = await fetchSingleCompanyItem(params.id)
  console.log({benefit})
  return(
    <main>
      <SingleBenefitsTabs {...benefit.data}/>
    </main>
  )
}
