'use server'

import { redirect } from "next/navigation"
import { setupAPIClient } from "../services/api"
import { auth } from "./auth"
import { userInfoSchema, userInfoSchemaFirstSignIn } from "./zod/userValidations"
import { dataSchemaZod } from "./zod/Company/validationDataSchema"


//Company Details
export const updateCompanyUserDetails = async (formData: FormData) => {
  const api = await setupAPIClient()
  const session = await auth()

  let { name, user_name, document, new_password, confirm_password } = Object.fromEntries(formData)

  if (session) {

    if (session.user.status === 'pending_password') {

      if (session.user.document) {
        document = session.user.document
      }

      const result = userInfoSchemaFirstSignIn.safeParse({
        name,
        user_name,
        document,
        new_password,
        confirm_password
      })
      if (!result.success) {
        return { error: result.error.issues }
      }


      try {

        const response = await api.patch(`/company-user?user_id=${session.user.uuid}`, {
          name: name,
          user_name: user_name,
          document: document,
          password: new_password,
          status: 'active'
        })


        return { status: response.status, data: response.data }

      } catch (err: any) {
        console.log({err})
        if (err.response) return { status: err.response.status, data: err.response.data }
        return { status: '', data: '' }

        console.log("Erro ao atualizar dados do usuário: ", err)
      }

    } else {
      const result = userInfoSchema.safeParse({
        name,
        user_name,
        document,
        new_password,
        confirm_password
      })


      if (!result.success) {
        return { error: result.error.issues }
      }

      try {
        const response = await api.patch(`/company-user?user_id=${session.user.uuid}`, {
          name: name,
          user_name: user_name,
          document: document,
          password: new_password,
        })


        return { status: response.status, data: response.data }

      } catch (err: any) {
        if (err.response.data) return err.response.data
        console.log("Erro ao atualizar dados: ", err)

      }
    }

  }
}

export const updateData = async (formData: FormData) => {
  const api = await setupAPIClient();
  console.log({formData})
  const {
    data_uuid,
    address_uuid,
    line1,
    line2,
    line3,
    postal_code,
    neighborhood,
    city,
    state,
    country,
    fantasy_name,
    document,
    classification,
    colaborators_number,
    phone_1,
    phone_2


  } = Object.fromEntries(formData)


  const result = dataSchemaZod.safeParse({
    line1,
    line2,
    line3,
    postal_code,
    neighborhood,
    city,
    state,
    country,
    fantasy_name,
    document,
    classification,
    colaborators_number,
    phone_1,
    phone_2
  })
  if (!result.success) {
    return { error: result.error.issues }
  }

  let colaborators_int = +colaborators_number


  try {
    const response = await api.patch(`/company-data?data_uuid=${data_uuid}&address_uuid=${address_uuid}`, {
      line1,
      line2,
      line3,
      postal_code,
      neighborhood,
      city,
      state,
      country,
      fantasy_name,
      document,
      classification,
      colaborators_number: colaborators_int,
      phone_1,
      phone_2
    })

    return { status: response.status, data: response.data }

  } catch (err: any) {
    if (err.response)  return { status: err.response.status, data: err.response.data }

    console.log("Unable to update data", err)

  }

  redirect('/dashboard/settings')
}

export async function fetchCompanyData() {
  const api = await setupAPIClient()
  const session = await auth()

  if(session){

    try {
      const response = await api.get(`/business/info?business_info_uuid=${session.user.business_info_id}`)
      return { status: response.status, data: response.data }
    } catch (err: any) {
      //console.log("erro data: ", err)
      if (err.response) return {data: err.response.data, status: err.response.data.error}

      return { status: '', data: ''}
      // return err.response.data.error
    }
  }
  return { status: '', data: ''}


}


export async function fetchEmployees(){
  const api = await setupAPIClient()
  const session = await auth()

  if(!session) return { status: 500, data: "Not logged in"}

  try{
    const response = await api.get('/business-admin/app-users/')
    return { status: response.status, data: response.data}
  }catch(err: any){
    if (err.response) return {data: err.response.data, status: err.response.data.error}

    return { status: '', data: ''}

  }
}

export async function fetchSingleEmployeeInfo(employeeId: string){
  const api = await setupAPIClient()
  const session = await auth()
  let address: any
  if(!session) return { status: 500, data: "Not logged in"}

  try{
    const response = await api.get(`/app-user/business-admin?employeeId=${employeeId}`)

    if(response.data.address_uuid){
      const address = await api.get('')
    }
    return { status: response.status, employeeInfo: response.data, employeeAddress: address }
  }catch(err: any){
    if (err.response) return {data: err.response.data, status: err.response.data.error}

    return { status: '', data: ''}

  }
}


//Company Items
export const fetchAllCompanyItems = async () => {
  const api = await setupAPIClient()

  try{
    const response = await api.get("/business/item/details")
    return { status: response.status, data: response.data}

  }catch(err: any){
    if (err.response) return {data: err.response.data, status: err.response.data.error}
    return { status: '', data: ''}

  }

}
