"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { AlertDialogDemo } from "@/components/DialogAlertDemo/dialogAlert"
import Link from "next/link"


export type BusinessUser = {
    id: string
    img: string | null
    is_admin: boolean
    user_name: string
    document: string | null
    permissions: string[]
    email: string 
    function: string 
    status: string
    token: string
    createdAt: string
}

const handleDelete = async () => {
    alert("Produto deletado com sucesso")
}

export const columns: ColumnDef<BusinessUser>[] = [

    {
        accessorKey: 'user_name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nome
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'permissions',
        header: 'Permissões'
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    
    {
        accessorKey: 'createdAt',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Criado em
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('createdAt'))
            const formatted = date.toLocaleDateString()

            return <div className="text-start font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const businessUser = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <Link href={`/dashboard/minha-equipe/${businessUser.id}`}>
                            <DropdownMenuItem>
                                Ver usuário
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(businessUser.id)}
                        >
                            Copiar Id
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <AlertDialogDemo
                            buttonText="Deletar"
                            title="Está certo disto?"
                            description="Esta ação não poderá ser desfeita. Isto deleterá permanentemente o usuário dos dados do nosso servidor."
                            cancelButton="Cancelar"
                            confirmButton="Continuar"
                            onConfirm={handleDelete}
                        />

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]