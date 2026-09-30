import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Header',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
