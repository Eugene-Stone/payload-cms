import type { GlobalConfig } from 'payload'
import { CKEditorField } from '../fields/CKEditorField'
// import { htmlEditorField } from '@/app_payload/plugins/htmlEditor/field'
import { htmlEditorField } from 'payload-html-editor'

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
		htmlEditorField({
			name: 'topTextHtml',
			label: 'Top text Html',
		}),
		CKEditorField('topTextCKEditor', 'Top text CKEditor'),
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
