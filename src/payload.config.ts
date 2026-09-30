import { sqliteAdapter } from '@payloadcms/db-sqlite'
import {
	lexicalEditor,
	FixedToolbarFeature,
	EXPERIMENTAL_TableFeature,
} from '@payloadcms/richtext-lexical'

import { en } from '@payloadcms/translations/languages/en'
import { ru } from '@payloadcms/translations/languages/ru'

import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

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

	// Конфигурацияс верхней панелью
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
	plugins: [],
})
