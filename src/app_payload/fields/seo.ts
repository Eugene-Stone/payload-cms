import type { Field } from 'payload'

export const seoField: Field = {
  name: 'seo',
  type: 'group',
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      maxLength: 60,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 160,
    },
    {
      name: 'keywords',
      type: 'textarea',
    },
    {
      name: 'canonicalUrl',
      type: 'text',
    },
    {
      name: 'metaRobots',
      type: 'select',
      defaultValue: 'index,follow',
      options: ['index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow'],
    },
    {
      name: 'preventIndexing',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'metaViewport',
      type: 'text',
    },
    {
      name: 'ogTitle',
      type: 'text',
    },
    {
      name: 'ogDescription',
      type: 'textarea',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ogUrl',
      type: 'text',
    },
    {
      name: 'ogType',
      type: 'text',
      defaultValue: 'website',
    },
    {
      name: 'twitterCard',
      type: 'select',
      defaultValue: 'summary_large_image',
      options: ['summary', 'summary_large_image', 'app', 'player'],
    },
    {
      name: 'twitterTitle',
      type: 'text',
    },
    {
      name: 'twitterDescription',
      type: 'textarea',
    },
    {
      name: 'twitterImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'structuredData',
      type: 'textarea',
    },
  ],
}
