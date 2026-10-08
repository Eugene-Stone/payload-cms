import type { GlobalConfig } from 'payload'
import { CKEditorField } from '../fields/CKEditorField'
import { htmlEditorField } from '@/app_payload/plugins/htmlEditor/field'

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
		CKEditorField('topText2', 'Top text 2'),
		htmlEditorField({
			name: 'topText3',
			label: 'Top text 3',
		}),
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
