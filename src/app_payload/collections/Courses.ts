import { slugField, type CollectionConfig } from 'payload'

import { seoField } from '@/app_payload/fields/seo'

export const Courses: CollectionConfig = {
	slug: 'courses',
	admin: {
		useAsTitle: 'title',
	},
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
		},
		slugField(),
		{
			name: 'description',
			type: 'textarea',
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
		},
		{
			name: 'text',
			type: 'richText',
		},
		{
			name: 'price',
			type: 'number',
		},
		{
			name: 'duration',
			type: 'text',
		},
		{
			name: 'direction',
			type: 'relationship',
			relationTo: 'directions',
			hasMany: false,
		},
		{
			name: 'level',
			type: 'relationship',
			relationTo: 'levels',
			hasMany: false,
		},
		{
			name: 'formats',
			type: 'relationship',
			relationTo: 'formats',
			hasMany: true,
		},
		seoField,
	],
}
