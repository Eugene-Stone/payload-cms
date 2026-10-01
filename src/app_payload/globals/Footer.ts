import type { GlobalConfig } from 'payload'
import { CKEditorField } from '../fields/CKEditorField'

export const Footer: GlobalConfig = {
	slug: 'footer',
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
			defaultValue: 'Footer',
		},
		{
			name: 'logo',
			type: 'upload',
			relationTo: 'media',
		},
		CKEditorField('topText2', 'Top text'),
		{
			name: 'topText',
			type: 'richText',
		},
		{
			name: 'bottomText',
			type: 'richText',
		},
		{
			name: 'copyright',
			type: 'textarea',
		},
	],
}
