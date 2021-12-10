import { endpoint, labelSingleton, link, referredToBy, serviceDescription, shortDescription, timespanSingleton, uses } from "./props";

export default {
  name: 'Service',
  title: 'Service',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy,
    serviceDescription,
    link,
    endpoint,
    uses,
    timespanSingleton,
  ],
  preview: {
    select: {
      title: 'label',
      edtf: 'timespan.edtf',
    },
    prepare(selection) {
      const { title, edtf } = selection

      return {
        title: title,
        subtitle: edtf,
      }
    },
  },
}