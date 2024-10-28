'use server'

import { redirect } from "next/navigation"
import { setupAPIClient } from "../services/api"
import { auth } from "./auth"
import { userInfoSchema, userInfoSchemaFirstSignIn } from "./zod/userValidations"
import { dataSchemaZod } from "./zod/Company/validationDataSchema"
import { registerEmployeedataSchemaZod } from "./zod/Employees/registerEmployeeValidationDataSchema"
import { CompanyUser } from "../(auth-routes)/dashboard/minha-equipe/page"
import { revalidatePath } from "next/cache"


//Company Details
export const updateCompanyUserDetails = async (formData: FormData) => {
  const api = await setupAPIClient()
  const session = await auth()
  let { name, user_name, document, new_password, confirm_password } = Object.fromEntries(formData)


  if (session) {

    if (session.user.status === 'pending_password') {
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

        const response = await api.put(`/company-admin`, {
          uuid: session.user.uuid,
          name: name ? name : null,
          user_name: user_name ? user_name : null,
          document: document,
          password: new_password,
          status: 'active'
        })


        return { status: response.status, data: response.data }

      } catch (err: any) {
        if (err.response) return { status: err.response.status, data: err.response.data }
        return { status: '', data: '' }

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
        const response = await api.put(`/company-admin`, {
          uuid: session.user.uuid,
          name: name ? name : null,
          user_name: user_name ? user_name : null,
          document: document,
          password: new_password,
        })


        return { status: response.status, data: response.data }

      } catch (err: any) {
        if (err.response) return { status: err.response.status, data: err.response.data }
        return { status: "", data: "" }

      }
    }

  }
}

export const updateData = async (formData: FormData) => {
  const api = await setupAPIClient();
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
    if (err.response) return { status: err.response.status, data: err.response.data }

    console.log("Unable to update data", err)

  }

  redirect('/dashboard/settings')
}

//Employees
export async function fetchCompanyData() {
  const api = await setupAPIClient()
  const session = await auth()

  if (session) {

    try {
      const response = await api.get(`/business/info?business_info_uuid=${session.user.business_info_id}`)
      return { status: response.status, data: response.data }
    } catch (err: any) {
      //console.log("erro data: ", err)
      if (err.response) return { data: err.response.data, status: err.response.data.error }

      return { status: '', data: '' }
      // return err.response.data.error
    }
  }
  return { status: '', data: '' }


}


export async function fetchEmployees() {
  const api = await setupAPIClient()
  const session = await auth()

  if (!session) return { status: 500, data: "Not logged in" }

  try {
    const response = await api.get('/business-admin/app-users')
    console.log("empregados", response.data)
    return { status: response.status, data: response.data }
  } catch (err: any) {
    if (err.response) return { data: err.response.data, status: err.response.data.error }
    console.log({ err })
    return { status: '', data: '' }

  }
}

export async function fetchSingleEmployeeInfo(employeeId: string) {
  const api = await setupAPIClient()
  const session = await auth()
  let address: any
  if (!session) return { status: 500, data: "Not logged in" }

  try {
    const response = await api.get(`/app-user/business-admin?employeeId=${employeeId}`)

    return { status: response.status, employeeInfo: response.data, employeeAddress: address }
  } catch (err: any) {
    if (err.response) return { data: err.response.data, status: err.response.data.error }

    return { status: '', data: '' }

  }
}

export async function registerSingleEmployee(formData: FormData) {
  const api = await setupAPIClient()
  try {
    const {
      full_name,
      internal_code,
      document,
      gender,
      date_of_birth,
      marital_status,
      job_function,
      salary,
      dependents_quantity
    } = Object.fromEntries(formData)

    let setDependents: number | undefined
    dependents_quantity === "" ? setDependents === undefined : setDependents = +dependents_quantity

    const result = registerEmployeedataSchemaZod.safeParse({
      full_name,
      internal_code,
      document,
      gender,
      date_of_birth,
      marital_status,
      job_function,
      salary: isNaN(Number(salary)) ? null : Number(salary),
      dependents_quantity: setDependents
    })
    console.log(result.error?.issues[0].message)
    if (!result.success) {
      console.log("aqui back")
      return { error: result.error.issues }
    }

    const response = await api.post("app-user/business-admin", {
      full_name,
      internal_company_code: internal_code,
      document,
      gender,
      date_of_birth,
      marital_status,
      function: job_function,
      salary: isNaN(Number(salary)) ? null : Number(salary),
      dependents_quantity: +dependents_quantity
    })

    console.log(response.data)
    return { status: response.status, data: response.data }

  } catch (err: any) {
    console.log({err})
    if (err.response) return { data: err.response.data.error, status: err.response.data.error }

    return { status: '', data: '' }

  }
}

//Company Items
export const fetchAllCompanyItems = async () => {
  const api = await setupAPIClient()

  try {
    const response = await api.get("/business/item/details")
    return { status: response.status, data: response.data }

  } catch (err: any) {
    if (err.response) return { data: err.response.data, status: err.response.data.error }
    return { status: '', data: '' }

  }

}

export const fetchSingleCompanyItem = async (id: string) => {
  const api = await setupAPIClient()
  try {
    const response = await api.get(`/business/item/details/${id}/employer`)
    return { status: response.status, data: response.data }

  } catch (err: any) {
    if (err.response) return { data: err.response.data, status: err.response.data.error }
    return { status: '', data: '' }

  }
}

//Company Users
export const fetchCompanyUsers = async (business_info_uuid: string) => {
  const api = await setupAPIClient();

  try {
    const response = await api.get(`/company-users?business_info_uuid=${business_info_uuid}`);
    const users = response.data

    return  users
  } catch (err: any) {
    if (err.response) return err.response.data

  }
};

export const addUser = async (formData: FormData) => {
  const api = await setupAPIClient();
  const { user_name, password, permissions } = Object.fromEntries(formData)
  const parsedPermissions = typeof permissions === 'string' ? JSON.parse(permissions) : [];
  try {
    const response = await api.post("/business/admin/register/user", {
      password,
      user_name,
      permissions: parsedPermissions
    })

    return {status: response.status, data: response.data}

  } catch (err: any) {
    if (err.response) return {data: err.response.data.error, status: err.response.status}
    console.log("Erro ao criar usuário", err)
  }
}

export const fetchSingleUser = async (user_uuid: string) => {

  const api = await setupAPIClient();

  try {
    const response = await api.get(`/business/admin/details/user?user_uuid=${user_uuid}`);

    return {status: response.status, data: response.data}

  } catch (err: any) {
    if (err.response) return {data: err.response.data.error, status: err.response.status}
    console.log({ err });
  }
};

export const editUser = async (formData: FormData) => {
  const api = await setupAPIClient()

  const { user_id, password, permissions, is_active, user_name } = Object.fromEntries(formData)
  const parsedPermissions = typeof permissions === 'string' ? JSON.parse(permissions) : [];

  try {
    await api.patch(`/company-user?user_id=${user_id}`, {
      password,
      user_name,
      permissions: parsedPermissions,
      status: is_active
    })


  } catch (err: any) {
    console.log({err})
    if (err.response) return {data: err.response.data.error, status: err.response.status}
    return {data: '', status: ''}
  }
  revalidatePath('/dashboard/minha-equipe')
  redirect('/dashboard/minha-equipe')
}

export const deleteUser = async (id: string) => {
  const api = await setupAPIClient()

  try {
    await api.patch(`/company-user/delete?user_id=${id}`)

  } catch (err: any) {
    console.log("Erro ao deletar usuário: ", err)


  }
  revalidatePath('/dashboard/minha-equipe')
}
//Groups
export const createNewGroup = async (formData: FormData) => {
  const api = await setupAPIClient()

  try {
    const {
      group_name,
      employerItemDetails_uuids,
      value,
      user_info_uuids
    } = Object.fromEntries(formData)


    const parsedEmployerItemDetailsUuids = JSON.parse(employerItemDetails_uuids as string);
    const parsedUserInfoUuids = JSON.parse(user_info_uuids as string);
    const response = await api.post("/business-admin/group", {
      group_name,
      employerItemDetails_uuids: parsedEmployerItemDetailsUuids,
      value: +value,
      user_info_uuids: parsedUserInfoUuids,
    })

    return { status: response.status, data: response.data }

  } catch (err: any) {
    if (err.response) return { data: err.response.data, status: err.response.data.error }
    return { status: '', data: '' }

  }
}

export const fetchAllBenefitGroups = async () => {
  const api = await setupAPIClient()

  try {
    const response = await api.get("/business-admin/groups")

    return { status: response.status, data: response.data }

  } catch (err: any) {
    if (err.response) return { data: err.response.data, status: err.response.data.error }
    return { status: '', data: '' }

  }

}

export const fetchOneBenefitGroup = async (id: string) => {
  const api = await setupAPIClient()

  try {
   const response = await api.get(`/business-admin/group?uuid=${id}`)

    return { status: response.status, data: response.data }

  } catch (err: any) {
    if (err.response) return { data: err.response.data, status: err.response.data.error }
    return { status: '', data: '' }

  }

}
