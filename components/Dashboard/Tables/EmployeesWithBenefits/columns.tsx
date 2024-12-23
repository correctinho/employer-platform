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
import { EmployeeResponse } from "@/utils/types/employee"
import { BenefitToggle } from "@/components/FormsInput/formsInput"


const handleDelete = async () => {
  alert("Usuário removido com sucesso")
}



export const columns: ColumnDef<EmployeeResponse>[] = [
  {
    accessorKey: 'full_name',
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
    accessorKey: 'internal_company_code',
    header: 'Código Interno'
  },
  {
    accessorKey: 'document',
    header: 'CPF'
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
    cell: ({ row, table }) => {
      const employee = row.original;
      const isActive = employee.status === 'active';
      const { handleToggle } = table.options.meta as { handleToggle: (employeeId: string, isActive: boolean) => void };

      return (
        <BenefitToggle
          employeeId={employee.uuid}
          initialState={isActive}
          onToggle={(employeeId, isActive) => handleToggle(employeeId, isActive)}
        />
      );
    },
  },
  // {
  //   accessorKey: 'gender',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Status
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => {
  //     console.log({ row })
  //     const status = row.getValue('status') as string // Fazendo a asserção de tipo
  //     const translatedStatus = statusMap[status] || status // Use o mapeamento ou o valor original se não houver mapeamento
  //     const textColor = status === 'pending' ? 'text-red-500' : 'text-black' // Define a cor do texto
  //     return <div className={`text-start font-medium ${textColor}`}>
  //       <BenefitToggle
  //         key={}
  //       /></div>
  //   },
  // },
  // {
  //   accessorKey: 'date_of_birth',
  //   header: "Data de nascimento"

  // },

  // {
  //     accessorKey: 'group',
  //     header: 'Grupo'
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original

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
            <Link href={`/dashboard/colaboradores/${employee.uuid}`}>
              <DropdownMenuItem>
                Ver colaborador
              </DropdownMenuItem>
            </Link>
            {/* <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(employee.uuid)}
                        >
                            Copiar Id
                        </DropdownMenuItem> */}
            <DropdownMenuSeparator />

            {/* <AlertDialogDemo
                            buttonText="Remover"
                            title="Está certo disto?"
                            description="Esta ação não poderá ser desfeita. Isto removerá a vinculação desta pessoa com a sua empresa!"
                            cancelButton="Cancelar"
                            confirmButton="Continuar"
                            onConfirm={handleDelete}
                        /> */}

          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
