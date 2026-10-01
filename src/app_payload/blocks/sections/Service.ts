import { CKEditorField } from '@/app_payload/fields/CKEditorField'
import type { Block } from 'payload'

export const Service: Block = {
	slug: 'service',
	labels: {
		singular: 'Service',
		plural: 'Services',
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
			name: 'id_anchor',
			type: 'text' as const,
		},
	],
}
