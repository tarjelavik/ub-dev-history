import { groq } from 'next-sanity'
import { DataTable } from '@/components/data-table'
import { columns } from './table/columns'

export interface ProjectProps {
  id: string
  type: string
  label: string
  image: string
  shortDescription: string
  memberOf: string[]
  active: string
}

export const query = groq`*[_type in ['Project'] && !(_id in path("drafts.**"))] | order(timespan.beginOfTheBegin desc)  {
  "id": _id,
  "label": label,
  hasType[]-> {
    "id": _id,
    label
  },
  status,
  timespan,
  "description": pt::text(referredToBy[0].body),
  carriedOutBy[] {
    "id": assignedActor->._id,
    "label": assignedActor->.label
  },
  "funding": activityStream[]-> {
    _type == 'FundingActivity' =>  {
      "id": _id,
      "type": _type,
      label,
      "awarder": awarder->label,
      "amount": fundingAmount.value,
      "currency": fundingAmount.hasCurrency->label,
      "period": timespan.edtf,
    }
  },
  "active": "Aktiv",
    !defined(timespan) => {
      "active": "Ukjent" 
    },
    timespan.endOfTheEnd <= now() => {
      "active": "Avsluttet" 
    },
}`

const Projects = ({ data }: { data: ProjectProps[] }) => {
  return (
    <DataTable
      data={data}
      columns={columns}
      config={{
        labelSearch: true,
        activeFilter: true,
      }}
    />
  )
}

export default Projects