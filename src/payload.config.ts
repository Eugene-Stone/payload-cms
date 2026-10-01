// import { sqliteAdapter } from '@payloadcms/db-sqlite'
import {
	lexicalEditor,
	FixedToolbarFeature,
	EXPERIMENTAL_TableFeature,
} from '@payloadcms/richtext-lexical'

import { seoPlugin } from '@payloadcms/plugin-seo'

import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { en } from '@payloadcms/translations/languages/en'
import { ru } from '@payloadcms/translations/languages/ru'

import { Admins } from './app_payload/collections/Admins'
import { Users } from './app_payload/collections/Users'
import { Media } from './app_payload/collections/Media'
import { Comments } from './app_payload/collections/Comments'
import { Courses } from './app_payload/collections/Courses'
import { Directions } from './app_payload/collections/Directions'
import { FormRequests } from './app_payload/collections/FormRequests'
import { Forms } from './app_payload/collections/Forms'
import { Formats } from './app_payload/collections/Formats'
import { Galleries } from './app_payload/collections/Galleries'
import { Levels } from './app_payload/collections/Levels'
import { Pages } from './app_payload/collections/Pages'
import { Reviews } from './app_payload/collections/Reviews'
import { Footer } from './app_payload/globals/Footer'
import { Header } from './app_payload/globals/Header'
import { Homepage } from './app_payload/globals/Homepage'
import { postgresAdapter } from '@payloadcms/db-postgres'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	i18n: {
		fallbackLanguage: 'en', // default
		supportedLanguages: { ru, en },
	},
	admin: {
		user: Admins.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [
		Admins,
		Users,
		Media,
		Pages,
		Courses,
		Directions,
		Levels,
		Formats,
		Galleries,
		Forms,
		FormRequests,
		Reviews,
		Comments,
	],
	globals: [Header, Footer, Homepage],
	// editor: lexicalEditor(),

	// Конфигурация едитора с верхней панелью
	editor: lexicalEditor({
		features: ({ defaultFeatures }) => [
			...defaultFeatures,
			FixedToolbarFeature(),
			EXPERIMENTAL_TableFeature(),
		],
	}),

	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	// База SqLite
	// db: sqliteAdapter({
	// 	client: {
	// 		url: process.env.DATABASE_URL || '',
	// 	},
	// }),

	// База postgres
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URL,
		},
	}),

	sharp,
	plugins: [
		seoPlugin({
			collections: ['pages'],
			uploadsCollection: 'media',
			// tabbedUI: true,

			generateTitle: ({ doc }) => {
				return doc?.title ? `${doc.title} | Website` : 'Payload Website'
			},
			generateDescription: ({ doc }) => doc.description,
			generateURL: ({ doc }) => {
				// const url =
				// 	process.env.NEXT_PUBLIC_SERVER_URL ||
				// 	(process.env.VERCEL_PROJECT_PRODUCTION_URL
				// 		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
				// 		: 'http://localhost:3000')

				const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

				return doc?.slug ? `${url}/${doc.slug}` : url
			},

			fields: ({ defaultFields }) => [
				...defaultFields,

				{
					name: 'keywords',
					type: 'textarea',
					label: 'Keywords',
				},

				{
					name: 'canonicalUrl',
					type: 'text',
					label: 'Canonical URL',
				},

				{
					name: 'metaRobots',
					type: 'select',
					label: 'Robots',
					defaultValue: 'index,follow',
					options: [
						{
							label: 'Index, Follow',
							value: 'index,follow',
						},
						{
							label: 'Noindex, Follow',
							value: 'noindex,follow',
						},
						{
							label: 'Index, Nofollow',
							value: 'index,nofollow',
						},
						{
							label: 'Noindex, Nofollow',
							value: 'noindex,nofollow',
						},
					],
				},

				{
					name: 'ogTitle',
					type: 'text',
					label: 'OG Title',
				},

				{
					name: 'ogDescription',
					type: 'textarea',
					label: 'OG Description',
				},

				{
					name: 'ogImage',
					type: 'upload',
					relationTo: 'media',
					label: 'OG Image',
				},

				// {
				// 	name: 'ogUrl',
				// 	type: 'text',
				// 	label: 'OG URL',
				// },

				// {
				// 	name: 'ogType',
				// 	type: 'select',
				// 	label: 'OG Type',
				// 	defaultValue: 'website',
				// 	options: [
				// 		{
				// 			label: 'Website',
				// 			value: 'website',
				// 		},
				// 		{
				// 			label: 'Article',
				// 			value: 'article',
				// 		},
				// 	],
				// },

				{
					name: 'twitterCard',
					type: 'select',
					label: 'Twitter Card',
					defaultValue: 'summary_large_image',
					options: [
						{
							label: 'Summary',
							value: 'summary',
						},
						{
							label: 'Summary Large Image',
							value: 'summary_large_image',
						},
						{
							label: 'App',
							value: 'app',
						},
						{
							label: 'Player',
							value: 'player',
						},
					],
				},

				{
					name: 'twitterTitle',
					type: 'text',
					label: 'Twitter Title',
				},

				{
					name: 'twitterDescription',
					type: 'textarea',
					label: 'Twitter Description',
				},

				{
					name: 'twitterImage',
					type: 'upload',
					relationTo: 'media',
					label: 'Twitter Image',
				},

				{
					name: 'structuredData',
					type: 'textarea',
					label: 'Structured Data (JSON-LD)',
					admin: {
						description: 'JSON-LD structured data in JSON format',
					},
				},
			],
		}),
	],
})
