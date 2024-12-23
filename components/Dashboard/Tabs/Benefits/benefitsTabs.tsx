'use client'

import { EmployeeContext } from "@/app/contexts/employeeContexts"
import { fetchAllCompanyItems } from "@/app/lib/actions"
import { Button } from "@/components/ui/button"
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


export function BenefitsTabs() {
  const { benefits } = useContext(EmployeeContext)
  return (
    <Tabs defaultValue="benefits" className="w-full flex flex-col">
      <TabsList className="grid grow lg:grid-cols-3 max-lg:mb-12 ">
        <TabsTrigger value="benefits">Meus multibenefícios</TabsTrigger>
        <TabsTrigger value="allBenefits">Todos os multibenefícios</TabsTrigger>
        <TabsTrigger value="advantage">Clube de vantagens</TabsTrigger>
      </TabsList>
      <TabsContent value="benefits" className="grid lg:grid-cols-3 gap-[32px]">
        {benefits.map((benefit) => (
          <Card className="p-4 flex flex-col items-center gap-4 justify-between" key={benefit.id}>
            <CardTitle>{benefit.Item.name}</CardTitle>
            <CardDescription style={{ lineHeight: "1.5rem" }}>{benefit.Item.description}</CardDescription>
            <Link href={`/dashboard/multibeneficios/${benefit.uuid}`}>
              <Button variant="outline">Ver mais</Button>
            </Link>
          </Card>

        ))}
        {/* <Card className=" overflow-y-scroll w-fit">
                    <CardHeader>
                        <CardTitle>Esta semana</CardTitle>
                        <CardDescription>Resultados semanais</CardDescription>
                    </CardHeader>
                    <div className="px-4">
                        <DataTableDemo />
                    </div>
                </Card> */}
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
