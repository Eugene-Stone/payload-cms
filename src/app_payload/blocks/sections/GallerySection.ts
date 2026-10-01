import type { Block } from 'payload'

export const GallerySection: Block = {
	slug: 'gallery',
	labels: {
		singular: 'Gallery',
		plural: 'Galleries',
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
			name: 'gallery',
			type: 'relationship',
			relationTo: 'galleries',
			hasMany: false,
		},
		{
			name: 'id_anchor',
			type: 'text' as const,
		},
	],
}
