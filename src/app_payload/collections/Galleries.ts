import type { CollectionConfig } from 'payload'

export const Galleries: CollectionConfig = {
	slug: 'galleries',
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
			name: 'images',
			type: 'upload',
			relationTo: 'media',
			hasMany: true,
		},
	],
}
