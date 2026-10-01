import type { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
	slug: 'comments',
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
			name: 'text',
			type: 'textarea',
		},
		{
			name: 'isApproved',
			type: 'checkbox',
		},
		{
			name: 'user',
			type: 'relationship',
			relationTo: 'users',
			hasMany: false,
		},
		{
			name: 'course',
			type: 'relationship',
			relationTo: 'courses',
			hasMany: false,
		},
	],
}
