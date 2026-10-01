import { CKEditorField } from '@/app_payload/fields/CKEditorField'
import type { Block } from 'payload'

export const About: Block = {
	slug: 'about',
	labels: {
		singular: 'About',
		plural: 'About',
	},
	fields: [
		{
			name: 'title',
			type: 'textarea',
		},
		{
			name: 'description',
			type: 'textarea',
		},
		// {
		// 	name: 'text',
		// 	type: 'richText',
		// },
		CKEditorField('text', 'Text'),
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
		},
		{
			name: 'id_anchor',
			type: 'text' as const,
		},
	],
}
