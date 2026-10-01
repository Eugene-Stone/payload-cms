import type { Block } from 'payload'

export const ReviewsSection: Block = {
	slug: 'reviews',
	labels: {
		singular: 'Reviews',
		plural: 'Reviews',
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
		{
			name: 'id_anchor',
			type: 'text' as const,
		},
	],
}
