import type { Block } from 'payload'

const anchorField = {
  name: 'anchor',
  type: 'text' as const,
}

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'title',
      type: 'textarea',
    },
    {
      name: 'text',
      type: 'richText',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    anchorField,
  ],
}

export const TextSection: Block = {
  slug: 'textSection',
  labels: {
    singular: 'Text Section',
    plural: 'Text Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'text',
      type: 'richText',
    },
    anchorField,
  ],
}

export const Service: Block = {
  slug: 'service',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  fields: [
    {
      name: 'title',
      type: 'textarea',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'text',
      type: 'richText',
    },
    anchorField,
  ],
}

export const Schedule: Block = {
  slug: 'schedule',
  labels: {
    singular: 'Schedule',
    plural: 'Schedules',
  },
  fields: [
    {
      name: 'title',
      type: 'textarea',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'leftText',
      type: 'richText',
    },
    {
      name: 'rightText',
      type: 'richText',
    },
    anchorField,
  ],
}

export const ReviewsSection: Block = {
  slug: 'reviews',
  labels: {
    singular: 'Reviews',
    plural: 'Reviews',
  },
  fields: [
    {
      name: 'title',
      type: 'textarea',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    anchorField,
  ],
}

export const Request: Block = {
  slug: 'request',
  labels: {
    singular: 'Request',
    plural: 'Requests',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      hasMany: false,
    },
    anchorField,
  ],
}

export const GallerySection: Block = {
  slug: 'gallery',
  labels: {
    singular: 'Gallery',
    plural: 'Galleries',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'gallery',
      type: 'relationship',
      relationTo: 'galleries',
      hasMany: false,
    },
    anchorField,
  ],
}

export const About: Block = {
  slug: 'about',
  labels: {
    singular: 'About',
    plural: 'About',
  },
  fields: [
    {
      name: 'title',
      type: 'textarea',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'text',
      type: 'richText',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    anchorField,
  ],
}

export const sectionBlocks = [
  Hero,
  TextSection,
  Service,
  Schedule,
  ReviewsSection,
  Request,
  GallerySection,
  About,
]
