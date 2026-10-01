import { CKEditorField } from '@/app_payload/fields/CKEditorField'
import type { Block } from 'payload'

export const Schedule: Block = {
	slug: 'schedule',
	labels: {
		singular: 'Schedule',
		plural: 'Schedules',
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
		// 	name: 'leftText',
		// 	type: 'richText',
		// },
		CKEditorField('leftText', 'Left Text'),
		// {
		// 	name: 'rightText',
		// 	type: 'richText',
		// },
		CKEditorField('rightText', 'Right Text'),
		{
			name: 'id_anchor',
			type: 'text' as const,
		},
	],
}
