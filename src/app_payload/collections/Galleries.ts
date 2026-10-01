import type { CollectionConfig } from 'payload'

export const Galleries: CollectionConfig = {
	slug: 'galleries',
	admin: {
		useAsTitle: 'title',
	},
	access: {
		read: () => true,
		// create: () => true,
		// update: () => true,
		// delete: () => true,
		// delete: hasRole(['superAdmin', 'admin', 'editor']),
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
