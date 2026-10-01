import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
	slug: 'header',
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
			defaultValue: 'Header',
		},
		{
			name: 'logo',
			type: 'upload',
			relationTo: 'media',
		},
	],
}
