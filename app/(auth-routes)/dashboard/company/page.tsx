import { fetchCompanyData } from "@/app/lib/actions";
import { CompanyTabs } from "@/components/Dashboard/Tabs/Company/companyTabs";
import LoadingComp from "@/components/LoadingComponent/loadingComp";
import { Suspense } from "react";

enum BusinessStatus {
    pending_approval,
    pending_contract,
    active,
    inactive
}
enum BusinessTypeOptions {
    empregador,
    comercio,
    autonomo_comercio,
    empregador_comercio
}

type AddressProps = {
    uuid: string
    line1: string
    line2: string
    line3: string | null
    neighborhood: string
    postal_code: string
    city: string
    state: string
    country: string
}
type BusinessInfoResponse = {
    uuid: string;
    branch_info_uuid: string
    fantasy_name: string
    corporate_reason: string | null
    document: string
    classification: string
    colaborators_number: number
    status: BusinessStatus
    phone_1: string
    phone_2: string | null
    email: string
    business_type: BusinessTypeOptions
    address_uuid: string
    Address: AddressProps
}
export default async function MyCompany() {

    const businessInfo = await fetchCompanyData()
    const data = businessInfo.data as BusinessInfoResponse
    const requestStatus = businessInfo.status
    return (
        <>
            <Suspense fallback={<LoadingComp />}>

                <CompanyTabs
                    uuid={data.uuid}
                    address_uuid={data?.address_uuid}
                    branch_info_uuid={data?.branch_info_uuid}
                    availableData={requestStatus === 200 ? true : false}
                    fantasy_name={data?.fantasy_name}
                    corporate_reason={data?.corporate_reason}
                    status={data?.status}
                    email={data?.email}
                    business_type={data?.business_type}
                    document={data?.document}
                    classification={data?.classification}
                    colaborators_number={data?.colaborators_number}
                    phone_1={data?.phone_1}
                    phone_2={data?.phone_2}
                    line1={data?.Address?.line1}
                    line2={data?.Address?.line2}
                    line3={data?.Address?.line3}
                    neighborhood={data?.Address?.neighborhood}
                    postal_code={data?.Address?.postal_code}
                    city={data?.Address?.city}
                    state={data?.Address?.state}
                    country={data?.Address?.country}
                />
            </Suspense>

        </>
    )
}
