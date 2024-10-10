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



export type Groups = {
  uuid: string,
  group_name: string,
  benefit: string,
  value: number,
  created_at: string
}

const handleDelete = async () => {
  alert("Produto deletado com sucesso")
}


// Função para formatar valores monetários
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export const columns: ColumnDef<Groups>[] = [

  {
    accessorKey: 'group_name',
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
  // {
  //     accessorKey:"benefit",
  //     header: ({ column }) => {
  //         return (
  //             <Button
  //                 variant="ghost"
  //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //             >
  //                 Beneficio
  //                 <ArrowUpDown className="ml-2 h-4 w-4" />
  //             </Button>
  //         )
  //     },
  // },
  {
    accessorKey: 'value',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue('value') as number
      const formattedValue = formatCurrency(value)
      return <div className="text-start font-medium">{formattedValue}</div>
    },
  },
  {
    accessorKey: 'created_at',
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
      const date = new Date(row.getValue('created_at'))
      const formatted = date.toLocaleDateString()
      return <div className="text-start font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const group = row.original

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
            <Link href={`/dashboard/colaboradores/grupos/${group.uuid}`}>
              <DropdownMenuItem>
                Ver grupo
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(group.uuid)}
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
