import type { GlobalConfig } from 'payload'

import { sectionBlocks } from '@/app_payload/blocks/Sections'
import { seoField } from '@/app_payload/fields/seo'

export const Homepage: GlobalConfig = {
	slug: 'homepage',
	versions: {
		drafts: true,
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
			name: 'sections',
			type: 'blocks',
			blocks: sectionBlocks,
		},
		seoField,
	],
}
