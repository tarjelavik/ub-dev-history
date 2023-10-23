"use client"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { PersonListProps } from '../persons'
import Link from "next/link"
import { Button } from '@/components/ui/button'
import { EditIntentButton } from '@/components/edit-intent-button'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<PersonListProps>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Navn
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='w-[200px]'>
        <Link href={`/persons/${row.getValue('id')}`} className='font-bold'>
          {row.getValue('label')}
        </Link>
      </div>
    )
  },
  {
    header: "Medlem av",
    accessorKey: "memberOf",
    cell: ({ row }) => (
      <div className='flex flex-wrap gap-2'>
        {(row.getValue('memberOf') as string[]).map((t: string, i: number) => (
          <Badge variant="secondary" className='grow-0' key={i}>
            {t}
          </Badge>
        ))}
      </div>
    )
  },
  {
    header: "Periode",
    accessorKey: "period",
  },
  {
    header: "Status",
    accessorKey: "active",
  },
  {
    header: "Kort beskrivelse",
    accessorKey: "shortDescription",
  },
  {
    header: "",
    accessorKey: "id",
    cell: ({ row }) => (
      <EditIntentButton size="sm" variant={'secondary'} id={(row.getValue('id') as string)} />
    )
  },
]