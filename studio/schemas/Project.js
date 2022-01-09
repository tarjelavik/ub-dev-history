import { continued, continuedBy, hasFile, hadParticipant, image, labelSingleton, link, referredToBy, resultedIn, shortDescription, timespanSingleton } from "./props";

export default {
  name: 'Project',
  title: 'Project',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    link,
    resultedIn,
    referredToBy,
    timespanSingleton,
    hadParticipant,
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description:
        'En aktivitetsstrøm samler alle hendelser knyttet til denne aktøren. Fødsel og død er "inline" til personen, mens andre aktiviteter som ekteskap er egne dokument.',
      descriptionEN: 'Add all known events this smuck did',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'BeginningOfExistence' },
            { type: 'Activity' },
            { type: 'Event' },
            { type: 'Joining' },
            { type: 'Leaving' },
            { type: 'EndOfExistence' },
          ]
        },
      ],
      options: {
        editModal: 'fullscreen',
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
    continued,
    continuedBy,
    image,
    hasFile
  ],
  preview: {
    select: {
      title: 'label',
      media: "image.0",
      edtf: 'timespan.edtf',
    },
    prepare(selection) {
      const { title, media, edtf } = selection

      return {
        title: title,
        subtitle: edtf,
        media: media
      }
    },
  },
}