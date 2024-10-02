export type EmployeeResponse = {
    uuid: string
    business_info_uuid: string | null
    address_uuid: string | null
    document: string
    document2: string | null
    document3: string | null
    full_name: string
    display_name: string | null
    internal_company_code: string | null
    gender: string | null
    email: string | null
    date_of_birth: string
    phone: string | null
    salary: string | null
    company_owner: boolean
    status: string
    function: string | null
    recommendation_code: string | null
    marital_status: string | null
    dependents_quantity: number
    created_at: string | null
    updated_at: string | null
    BusinessInfo: {
        fantasy_name: string
    } | null
    user_document_validation_uuid: string | null
    Address?: {
        uuid: string
        line1: string | null
        line2: string | null
        line3: string | null
        postal_code: string | null
        neighborhood: string | null
        city: string | null
        state: string | null
        country: string | null
    } | null
    UserValidation?: {
        uuid: string
        document_front_status: string
        document_back_status: string
        selfie_status: string
        document_selfie_status: string
        created_at: string | null
        updated_at: string | null


    } | null
    UserAuth?:{
        uuid: string
        document: string
        email: string
    } | null

}
