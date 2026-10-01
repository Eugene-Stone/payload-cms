import { slugField, type CollectionConfig } from 'payload'

import { sectionBlocks } from '@/app_payload/blocks/Sections'
import { populatePublishedAt } from './hooks'

import { transliterateSlug } from '@/app_payload/utils/slugify'
import { generateSlug } from '@/app_payload/utils/generateSlug'
// import { seoField } from '@/app_payload/fields/seo'

const slugSourceField = 'name'
const collectionName = 'pages'

export const Pages: CollectionConfig = {
	slug: 'pages',
	// defaultPopulate определяет, какие поля выбирать, когда документ этой коллекции попадает в результат как связанный документ (relationship/upload population)
	defaultPopulate: {
		title: true,
		slug: true,
	},
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
		{
			name: 'name',
			type: 'text',
		},
		// slugField(),
		slugField({
			position: 'sidebar',
			fieldToUse: slugSourceField,
			slugify: ({ valueToSlugify }) => transliterateSlug(String(valueToSlugify ?? '')),
		}),
		{
			name: 'publishedAt',
			type: 'date',
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'description',
			type: 'textarea',
		},
		{
			name: 'sections',
			type: 'blocks',
			blocks: sectionBlocks,
		},
		// seoField,
	],
	hooks: {
		beforeValidate: [generateSlug(slugSourceField, collectionName)],
		beforeChange: [populatePublishedAt],
	},
}
