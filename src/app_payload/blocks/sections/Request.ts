import type { Block } from 'payload'

export const Request: Block = {
	slug: 'request',
	labels: {
		singular: 'Request',
		plural: 'Requests',
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
		{
			name: 'form',
			type: 'relationship',
			relationTo: 'forms',
			hasMany: false,
		},
		{
			name: 'id_anchor',
			type: 'text' as const,
		},
	],
}
