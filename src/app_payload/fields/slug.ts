import type { Field } from 'payload'

const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const slugField = (targetField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeValidate: [
      ({ data, value }) => {
        if (typeof value === 'string' && value.length > 0) {
          return formatSlug(value)
        }

        const targetValue = data?.[targetField]

        if (typeof targetValue === 'string') {
          return formatSlug(targetValue)
        }

        return value
      },
    ],
  },
})
