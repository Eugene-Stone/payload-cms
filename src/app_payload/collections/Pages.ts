import { slugField, type CollectionConfig } from 'payload'

import { sectionBlocks } from '@/app_payload/blocks/Sections'
import { seoField } from '@/app_payload/fields/seo'
// import { slugField } from '@/app_payload/fields/slug'

export const Pages: CollectionConfig = {
	slug: 'pages',
	admin: {
		useAsTitle: 'title',
	},
	access: {
		read: () => true,
	},
	versions: {
		drafts: true,
	},
	fields: [
		{
			name: 'title',
			type: 'text',
		},
		slugField(),
		{
			name: 'description',
			type: 'textarea',
		},
		{
			name: 'sections',
			type: 'blocks',
			blocks: sectionBlocks,
		},
		seoField,
	],
}
