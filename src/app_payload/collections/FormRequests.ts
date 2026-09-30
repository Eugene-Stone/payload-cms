import type { CollectionConfig } from 'payload'

export const FormRequests: CollectionConfig = {
  slug: 'form-requests',
  admin: {
    useAsTitle: 'formTitle',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'formTitle',
      type: 'text',
    },
    {
      name: 'formData',
      type: 'json',
    },
  ],
}
