'use client'

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link"

let companyItemsArray: any[] = []

export function BenefitsTabs() {

  async function getCompanyItem(){
    const companyItems = await fetchAllCompanyItems()
    console.log({companyItems})
    companyItemsArray = companyItems.data
  }

  getCompanyItem()

    // const companyItems = [
    //     {
    //         id: '1',
    //         benefit_name: "Vale Alimentação",
    //         benefit_type: "pre_pago",
    //         short_description: "Com limite pré-definido, que possibilita atender as necessidades de compras do dia a dia do Beneficiado, em segmento(s) específico(s), determinado(s) pela Gestão, com desconto em folha de pagamento. Ex: Farmácias, Oficinas de Motos ou qualquer outro segmento, podendo ser de livre escolha."
    //     },
    //     {
    //         id: '2',
    //         benefit_name: "Adiantamento Salarial",
    //         benefit_type: "pos_pago",
    //         short_description: "Benefício específico para aquisição de gêneros alimentícios. Pode ser utilizado em supermercados, mercearias, açougues, padarias e similares. Facilitando as rotinas dos Empregadores na substituição das cestas básicas."
    //     },
    //     {
    //         id: '3',
    //         benefit_name: "Vale Refeição",
    //         benefit_type: "pre_pago",
    //         short_description: "Benefício específico para aquisição de refeições prontas. Pode ser utilizado em restaurantes, padarias, lanchonetes e similares. Facilitando a rotina dos Empregadores, quando da necessidade de ter que oferecer refeições, proporcionando mais qualidade de vida ao seus Colaboradores."

    //     }
    // ]
    return (
        <Tabs defaultValue="benefits" className="w-full flex flex-col">
            <TabsList className="grid grow lg:grid-cols-3 max-lg:mb-12 ">
                <TabsTrigger value="benefits">Meus multibenefícios</TabsTrigger>
                <TabsTrigger value="allBenefits">Todos os multibenefícios</TabsTrigger>
                <TabsTrigger value="advantage">Clube de vantagens</TabsTrigger>
            </TabsList>
            <TabsContent value="benefits" className="grid lg:grid-cols-3 gap-[32px]">
                {companyItemsArray.map((benefit) => (
                    <Card className="p-4 flex flex-col items-center gap-4 justify-between" key={benefit.id}>
                        <CardTitle>{benefit.Item.name}</CardTitle>
                        <CardDescription style={{lineHeight:"1.5rem"}}>{benefit.Item.description}</CardDescription>
                        <Link href="/">
                            <Button variant="link">Ver mais</Button>

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
