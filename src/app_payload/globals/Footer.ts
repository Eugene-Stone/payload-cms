import type { GlobalConfig } from 'payload'
// import { CKEditorField } from '../fields/CKEditorField'

export const Footer: GlobalConfig = {
	slug: 'footer',
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
		// CKEditorField('topText'),
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
