import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'rating',
      type: 'number',
    },
    {
      name: 'text',
      type: 'richText',
    },
    {
      name: 'isApproved',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
    },
  ],
}
