import type { CollectionConfig } from 'payload'

import { formBlocks } from '@/app_payload/blocks/FormFields'

export const Forms: CollectionConfig = {
	slug: 'forms',
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
			name: 'description',
			type: 'textarea',
		},
		{
			name: 'submitUrl',
			type: 'text',
		},
		{
			name: 'successMessage',
			type: 'text',
		},
		{
			name: 'errorMessage',
			type: 'text',
		},
		{
			name: 'fields',
			type: 'blocks',
			blocks: formBlocks,
		},
	],
}
