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
import Link from "next/link"

type BusinessBenefit = {
    id: string;
    benefit_name: string;
    benefit_type: string;
    short_description: string;
};

type BenefitsTabsProps = {
    benefits: BusinessBenefit[];
};
export function BenefitsTabs({ benefits }: BenefitsTabsProps) {
    
    return (
        <Tabs defaultValue="benefits" className="w-full flex flex-col">
            <TabsList className="grid grow lg:grid-cols-3 max-lg:mb-12">
                <TabsTrigger value="benefits">Meus multibenefícios</TabsTrigger>
                <TabsTrigger value="allBenefits">Todos os multibenefícios</TabsTrigger>
                <TabsTrigger value="advantage">Clube de vantagens</TabsTrigger>
            </TabsList>
            <TabsContent value="benefits" className="grid lg:grid-cols-3 gap-[32px]">
                {benefits.length > 0 && benefits.map((benefit) => (
                    <Card className="p-4 flex flex-col items-center gap-4 justify-between" key={benefit.id}>
                        <CardTitle>{benefit.benefit_name}</CardTitle>
                        <CardDescription style={{ lineHeight: "1.5rem" }}>{benefit.short_description}</CardDescription>
                        <Link href="/">
                            <Button variant="link">Ver mais</Button>
                        </Link>
                    </Card>
                ))}
            </TabsContent>
        </Tabs>
    );
}
