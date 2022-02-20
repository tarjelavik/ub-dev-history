import { hasType, labelSingleton, link, shortDescription } from "./props";

export default {
  name: 'AccessPoint',
  title: 'Endpoint',
  type: 'document',
  fields: [
    {
      ...labelSingleton,
      validation: Rule => Rule
    },
    {
      name: 'value',
      title: 'Adresse',
      type: 'string',
      validation: Rule => Rule.required()
    }, // Should be more generic? or some conditional?
    {
      ...hasType,
      type: 'reference',
      to: [
        { type: 'ProtocolType' }
      ],
      validation: Rule => Rule
    },
    shortDescription,
  ],
  preview: {
    select: {
      title: 'label',
      url: 'value',
      type: 'hasType.label'
    },
    prepare(selection) {
      const { title, url, type } = selection

      return {
        title: `${title ?? url}`,
        subtitle: type,
      }
    },
  },
}