import { slugField, type CollectionConfig } from 'payload'

// import { slugField } from '@/app_payload/fields/slug'

export const Levels: CollectionConfig = {
	slug: 'levels',
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
		slugField(),
	],
}
