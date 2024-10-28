'use client'

import { EmployeeContext } from "@/app/contexts/employeeContexts"
import { DataTable } from "@/components/Dashboard/Tables/EmployeesWithBenefits/data-table"
import { columns } from "@/components/Dashboard/Tables/EmployeesWithBenefits/columns"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link"
import { useContext } from "react"

type SingleBenefitProps = {
  uuid: string,
  item_name: string,
  item_type: string
  item_uuid: string,
  business_info_uuid: string,
  cycle_start_day: string | null,
  cycle_end_day: string | null
  created_at: string
}
export function SingleBenefitsTabs(props: SingleBenefitProps) {
  const { benefits, employees } = useContext(EmployeeContext)

  return (
    <Tabs defaultValue="benefits" className="w-full flex flex-col">
      <TabsList className="grid grow lg:grid-cols-2 max-lg:mb-12 ">
        <TabsTrigger value="benefits">Gerenciar multibeneficio</TabsTrigger>
        <TabsTrigger value="allBenefits">Detalhes</TabsTrigger>
      </TabsList>
      <TabsContent value="benefits" className="grid lg:grid-cols-1 bg-slate-100 gap-[32px]">

        <Card className=" overflow-y-scroll w-full">
          <CardHeader>
            <CardTitle>{props.item_name}</CardTitle>
            <CardDescription>Defina os colabodores que receberão este benefício</CardDescription>
          </CardHeader>
          <div className="px-4">
            <DataTable columns={columns} data={employees} />
          </div>
        </Card>
      </TabsContent>

      {/* <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent> */}
    </Tabs>
  )
}
