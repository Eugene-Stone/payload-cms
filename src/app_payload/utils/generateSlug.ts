import type { CollectionBeforeValidateHook, CollectionSlug } from 'payload'

import { transliterateSlug } from '@/app_payload/utils/slugify'

export const generateSlug = (
	fieldToUse: string,
	collectionName: CollectionSlug,
): CollectionBeforeValidateHook => {
	return async ({ data, req, operation, originalDoc }) => {
		if (!data) return data

		// Если slug уже существует, сохраняем его
		if (operation === 'update' && originalDoc?.slug) {
			return data
		}

		const sourceValue = data[fieldToUse] ?? originalDoc?.[fieldToUse]

		if (!sourceValue) return data

		const baseSlug = transliterateSlug(String(sourceValue))

		// // При обновлении сохраняем slug, если исходное поле не менялось
		// if (operation === 'update' && data[fieldToUse] === undefined && data.slug === undefined) {
		// 	return data
		// }

		let slug = baseSlug
		let counter = 1

		while (true) {
			const existing = await req.payload.find({
				collection: collectionName,
				where: {
					and: [
						{ slug: { equals: slug } },
						...(originalDoc?.id ? [{ id: { not_equals: originalDoc.id } }] : []),
					],
				},
				limit: 1,
				depth: 0,
				overrideAccess: true,
			})

			if (existing.docs.length === 0) {
				break
			}

			slug = `${baseSlug}-${counter}`
			counter++
		}

		data.slug = slug

		return data
	}
}
