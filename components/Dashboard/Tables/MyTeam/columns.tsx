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
import { deleteUser } from "@/app/lib/actions"


export type BusinessUser = {
  uuid: string
  img: string | null
  is_admin: boolean
  user_name: string
  document: string | null
  permissions: string[]
  email: string
  function: string
  status: string
  token: string
  created_at: string
}

const handleDelete = async (id: string) => {
   await deleteUser(id)
}

// Mapeamento dos valores de status
const statusMap: { [key: string]: string } = {
  pending: "Pendente",
  active: "Ativo",
  inactive: "Inativo",
}

const permissionsMap: { [key: string]: string } = {
  sales: "Vendas",
  marketing: "Marketing",
  finances: "Finanças",
  // Adicione outros mapeamentos conforme necessário
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
    header: 'Permissões',
    cell: ({ row }) => {
      const permissions = row.getValue('permissions') as string[]; // Asserção de tipo para array de strings
      const translatedPermissions = permissions.map(permission => permissionsMap[permission] || permission); // Tradução das permissões
      return (
        <div className="text-start font-medium">
          {translatedPermissions.map((permission, index) => (
            <div key={index}>{permission}</div> // Exibir cada permissão em uma linha separada
          ))}
        </div>
      );
    },
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
    cell: ({ row }) => {
      const status = row.getValue('status') as string // Fazendo a asserção de tipo
      const translatedStatus = statusMap[status] || status // Use o mapeamento ou o valor original se não houver mapeamento
      const textColor = status === 'pending' ? 'text-red-500' : 'text-black' // Define a cor do texto
      return <div className={`text-start font-medium ${textColor}`}>{translatedStatus}</div>
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          Ações
        </Button>
      )
    },
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
            <Link href={`/dashboard/minha-equipe/${businessUser.uuid}`}>
              <DropdownMenuItem>
                Ver usuário
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(businessUser.uuid)}
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
              onConfirm={() => handleDelete(businessUser.uuid)}
            />

          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
