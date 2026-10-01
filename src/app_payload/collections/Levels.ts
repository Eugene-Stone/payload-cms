import { slugField, type CollectionConfig } from 'payload'

export const Levels: CollectionConfig = {
	slug: 'levels',
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
		slugField(),
	],
}
