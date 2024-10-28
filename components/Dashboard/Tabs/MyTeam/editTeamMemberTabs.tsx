'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import EditTeamMemberForm from "@/components/Forms/TeamMember/editTeamMemberForm"
import { BusinessUser } from "../../Tables/MyTeam/columns"
import { Input } from "@/components/FormsInput/formsInput"
import { ButtonComp } from "@/components/FormsInput/Button/button"


export function EditTeamMemberTabs(data: { user: BusinessUser }) {


    return (
        <Tabs defaultValue="team-member-data" className="w-full grow flex flex-col max-md:gap-8">
            <TabsList className="grid grow md:grid-cols-2 gap-2">
                <TabsTrigger value="team-member-data">Minha equipe</TabsTrigger>
                <TabsTrigger value="password">Alterar Senha</TabsTrigger>

            </TabsList>
            <TabsContent value="team-member-data" className="grid lg:grid-cols-2 gap-[32px]">

                <EditTeamMemberForm {...data.user} />

                <Card className="border-hidden">
                    <CardHeader>
                        Acesso de Permissões
                    </CardHeader>
                    <CardContent className="flex gap-2">
                        {/* <div className="bg-slate-300">
                            <span>Vendas</span>
                            <ul>
                                <li>PDV</li>

                            </ul>
                        </div>
                        <div>
                            <span>Finanças</span>
                            <ul>
                                <li>PDV</li>

                            </ul>
                        </div> */}
                    </CardContent>

                </Card>
            </TabsContent>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Altere a senha</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        <form action="" className="flex flex-col gap-3">
                            <div>
                                <label htmlFor="">Digite a sua senha de administrador</label>
                                <Input type="password"></Input>
                            </div>
                            <div>
                                <label htmlFor="">Digite a nova senha do usuário</label>
                                <Input type="password"></Input>
                            </div>
                            <div>
                                <label htmlFor="">Confirmar senha</label>
                                <Input type="password"></Input>
                            </div>
                            <ButtonComp>Alterar senha</ButtonComp>
                        </form>
                    </CardContent>
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
