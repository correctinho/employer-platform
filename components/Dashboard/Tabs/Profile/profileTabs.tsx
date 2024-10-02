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

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import ProfileForm from "@/components/Forms/Profile/profileForm"
import { useSession } from "next-auth/react"
import Image from "next/image"

type ProfileTabsProps = {
    user_status: string
}
export function ProfileTabs(props: ProfileTabsProps) {

    const session = useSession()
    return (
        <Tabs defaultValue="account" className="w-full grow">
            <TabsList className="grid grow grid-cols-1 ">
                <TabsTrigger value="account">Meus dados</TabsTrigger>
                {/* <TabsTrigger value="password">Senha</TabsTrigger> */}

            </TabsList>
            <TabsContent value="account" className="grid lg:grid-cols-2 gap-[32px]">

                <ProfileForm
                    uuid={session.data?.user.uuid ? session.data.user.uuid : ''}
                    is_admin={session.data?.user.is_admin ? session.data.user.is_admin : false}
                    document={session.data?.user.document ? session.data.user.document : null}
                    name={session.data?.user.name ? session.data?.user.name : null}
                    email={session.data?.user.email ? session.data?.user.email : null}
                    user_name={session.data?.user.user_name ? session.data?.user.user_name : null}
                    function={session.data?.user.function ? session.data?.user.function : null}
                    permissions={session.data?.user.permissions || []}
                    status={session.data?.user.status ? session.data?.user.status : null}
                />

                <Card className="border-hidden">
                    <CardHeader>
                        {props.user_status === 'pending_password' ? (
                            <>
                                <CardTitle>Altere a sua senha e atualize seus dados</CardTitle>
                                <CardDescription>
                                    Precisamos que você altere a sua senha.
                                </CardDescription>
                            </>
                        )
                            :
                            <>
                                <>
                                    <CardTitle>Altere aqui os seus dados e a sua senha</CardTitle>

                                </>
                            </>
                        }
                    </CardHeader>
                    <CardContent className="">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Image src="/correctinho/3.png" width={300} height={300} alt="Correctinho" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    {props.user_status === 'pending_password' ?
                                        <p>Atualize os seus dados</p>
                                        :
                                        <p>Altere a sua senha se desejar</p>
                                    }
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
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
