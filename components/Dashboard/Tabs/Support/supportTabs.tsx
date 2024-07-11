'use client'

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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import Image from "next/image"
import Script from 'next/script'

export function SupportTabs() {

    return (
        <Tabs defaultValue="support" className="w-full flex flex-col">
            <Script src="https://app.aminos.ai/js/chat_form_plugin.js" data-bot-id="27177" strategy="beforeInteractive"></Script>

            <TabsList className="grid grow lg:grid-cols-1 max-lg:mb-12 ">
                <TabsTrigger value="support">Suporte</TabsTrigger>
                {/* <TabsTrigger value="allBenefits">Todos os multibenefícios</TabsTrigger>
                <TabsTrigger value="advantage">Clube de vantagens</TabsTrigger> */}
            </TabsList>
            <TabsContent value="support" className="grid lg:grid-cols-2 gap-[16px] justify-center items-center">
                <div className="w-full max-w-[400px]">

                    <div id="chat_form"></div>

                </div>
                <CardContent className="">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Image src="/correctinho/3.png" width={300} height={300} alt="Correctinho" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Tire dúvidas comigo sobre a plataforma</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardContent>
            </TabsContent>

        </Tabs>
    )
}
