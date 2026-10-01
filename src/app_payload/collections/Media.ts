import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
	slug: 'media',
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'alt',
			type: 'text',
			// required: true,
		},
	],
	// upload: true,
	upload: {
		imageSizes: [
			{
				name: 'tiny',
				width: 200,
			},
			{
				name: 'thumbnail',
				width: 320,
			},
			{
				name: 'xsmall',
				width: 420,
			},
			{
				name: 'small',
				width: 700,
			},
			{
				name: 'medium',
				width: 1000,
			},
			{
				name: 'large',
				width: 1400,
			},
			{
				name: 'xlarge',
				width: 1920,
			},
		],
	},
}
