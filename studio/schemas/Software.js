import { hasType, labelSingleton, link, programmedWith, referredToBy, shortDescription, uses } from "./props";

export default {
  name: 'Software',
  title: 'Software',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    {
      ...hasType,
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'SoftwareType' }] }
      ]
    },
    {
      name: 'maintainedBy',
      title: 'Eies av',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'Group' }] }]
    },
    {
      name: 'hasSoftwarePart',
      title: 'Has part',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'VolatileSoftware' }] }]
    },
    referredToBy,
    programmedWith,
    uses,
    link
  ]
}