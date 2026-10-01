import { CKEditorField } from '@/app_payload/fields/CKEditorField'
import type { Block } from 'payload'

export const TextSection: Block = {
	slug: 'textSection',
	labels: {
		singular: 'Text Section',
		plural: 'Text Sections',
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
		// {
		// 	name: 'text',
		// 	type: 'richText',
		// },
		CKEditorField('text', 'Text'),
		{
			name: 'id_anchor',
			type: 'text' as const,
		},
	],
}
