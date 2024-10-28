'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import NewTeamMemberForm from "@/components/Forms/TeamMember/newTeamMemberForm"


export function NewTeamMemberTabs() {


    return (
        <Tabs defaultValue="account" className="w-full grow">
            <TabsList className="grid grow grid-cols-1 ">
                <TabsTrigger value="account">Minha equipe</TabsTrigger>
                {/* <TabsTrigger value="password">Senha</TabsTrigger> */}

            </TabsList>
            <TabsContent value="account" className="grid lg:grid-cols-2 gap-[32px]">

                <NewTeamMemberForm />

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
