import { slugField, type CollectionConfig } from 'payload'

// import { slugField } from '@/app_payload/fields/slug'

export const Directions: CollectionConfig = {
	slug: 'directions',
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
