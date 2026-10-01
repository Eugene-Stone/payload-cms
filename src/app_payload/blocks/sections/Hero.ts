import { CKEditorField } from '@/app_payload/fields/CKEditorField'
import type { Block } from 'payload'

export const Hero: Block = {
	slug: 'hero',
	labels: {
		singular: 'Hero',
		plural: 'Heroes',
	},
	fields: [
		{
			name: 'title',
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
