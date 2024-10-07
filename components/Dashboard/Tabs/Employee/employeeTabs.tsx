'use client'

import { Input } from "@/components/FormsInput/formsInput";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeResponse } from "@/utils/types/employee";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useContext } from "react";
import { EmployeeContext } from "@/app/contexts/employeeContexts";

type EmployeTabsType = {
  employeeId: string
}


export function EmployeeTabs(employeeId: EmployeTabsType) {
  const { employees } = useContext(EmployeeContext)

  let data = employees.find((employee) => {
    return employee.uuid === employeeId.employeeId
  })

  return (
    <Tabs defaultValue="employee-details" className="w-full grow flex flex-col gap-8">
      <TabsList className="grid grow md:grid-cols-2 gap-2">
        <TabsTrigger value="employee-details">Detalhes do colaborador</TabsTrigger>
        <TabsTrigger value="purchase-history">Histórico de compra</TabsTrigger>
      </TabsList>
      <TabsContent value="employee-details" className="grid lg:grid-cols-2 gap-[32px]">
        <Card className="border-hidden w-full flex flex-col items-center">
          <CardHeader className="">Informações gerais</CardHeader>
          <CardContent className="w-full flex flex-col gap-3">
            <div className="grid lg:grid-cols-2 gap-2">
              <div>
                <label htmlFor="">Nome</label>
                <Input value={data?.full_name} disabled />
              </div>
              <div>
                <label htmlFor="">CPF</label>
                <Input value={data?.document} disabled />
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              <div>
                <label htmlFor="">Data de Nascimento</label>
                <Input value={data?.date_of_birth ? data?.date_of_birth : ""} disabled />
              </div>
              <div>
                <label htmlFor="">Estado Civil</label>
                <Input value={data?.marital_status ? data?.marital_status : ""} disabled />
              </div>

            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              <div>
                <label htmlFor="">Email</label>
                <Input value={data?.email ? data?.email : ""} disabled />
              </div>
              <div>
                <label htmlFor="">Telefone</label>
                <Input value={data?.phone ? data?.phone : ""} disabled />
              </div>
            </div>


            <div className="grid lg:grid-cols-2 gap-2">
              <div>
                <label htmlFor="">Salário</label>
                <Input value={data?.salary ? +data?.salary / 100: ""} disabled />
              </div>
              <div>
                <label htmlFor="">Cargo</label>
                <Input value={data?.function ? data?.function : ""} disabled />
              </div>

            </div>
            <div>
              <label htmlFor="">Código Interno</label>
              <Input value={data?.internal_company_code ? data?.internal_company_code : ""} disabled />
            </div>


          </CardContent>
        </Card>

        <Card className="border-hidden w-full flex flex-col items-center">
          <CardHeader className="">Endereço</CardHeader>
          <CardContent className="w-full flex flex-col gap-3">
            <div>
              <label htmlFor="">CEP</label>
              <Input value={data?.Address?.postal_code ? data?.Address?.postal_code : ""} disabled />
            </div>
            <div className="grid lg:grid-cols-[4fr_1fr] gap-2">
              <div>
                <label htmlFor="">Rua</label>
                <Input value={data?.Address?.line1 ? data?.Address?.line1 : ''} disabled />
              </div>
              <div>
                <label htmlFor="">Número</label>
                <Input value={data?.Address?.line2 ? data?.Address?.line2 : ''} disabled />
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              <div>
                <label htmlFor="">Complemento</label>
                <Input value={data?.Address?.line3 ? data?.Address.line3 : ""} disabled />
              </div>
              <div>
                <label htmlFor="">Bairro</label>
                <Input value={data?.Address?.neighborhood ? data?.Address?.neighborhood : ""} disabled />
              </div>

            </div>

            <div>
              <label htmlFor="">Cidade</label>
              <Input value={data?.Address?.city ? data?.Address?.city : ""} disabled />
            </div>


            <div className="grid lg:grid-cols-2 gap-2">
              <div>
                <label htmlFor="">Estado</label>
                <Input value={data?.Address?.state ? data?.Address?.state : ""} disabled />
              </div>
              <div>
                <label htmlFor="">País</label>
                <Input value={data?.Address?.country ? data?.Address?.country : ""} disabled />
              </div>

            </div>



          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="purchase-history" className="grid lg:grid-cols-2 gap-[32px]">
        <div>
          <label htmlFor="">Nome</label>
          <p>{data?.full_name}</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
