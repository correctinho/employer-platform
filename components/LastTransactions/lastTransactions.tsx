'use client'

import { TableDemo } from "../Dashboard/Graphs/table"
import { Button } from "../ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"

export default function LastTransactions() {
    return (
        <Card className="w-full min-h-[400px]">
            <CardHeader className="flex flex-row justify-between w-full">
                <div className="">
                    <CardTitle>Esta semana</CardTitle>
                    <CardDescription>Últimas transações</CardDescription>

                </div>
                <div>
                    <Button variant="link">Ver mais</Button>

                </div>
            </CardHeader>
            <div className="px-4">
                <TableDemo />
            </div>
        </Card>
    )
}