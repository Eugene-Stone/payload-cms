import type { Editor } from '@tiptap/react'

import { buildSrcSet } from './buildSrcSet'

export type MediaDocument = {
	id: number | string
	url: string
	filename?: string | null
	alt?: string | null
	width?: number | null
	height?: number | null
	sizes?: Record<
		string,
		{
			url?: string
			width?: number
			height?: number
		}
	>
}

export function insertMedia(editor: Editor, media: MediaDocument, fallbackAlt = '') {
	const srcset = buildSrcSet(media)

	const alt =
		media.alt?.trim() || fallbackAlt.trim() || media.filename?.replace(/\.[^/.]+$/, '') || ''

	editor
		.chain()
		.focus()
		.insertContent({
			type: 'image',

			attrs: {
				src: media.url,
				alt,
				srcset,
				sizes: '100vw',
				width: media.width,
				height: media.height,
				loading: 'lazy',
				mediaId: media.id,
			},
		})
		.run()
}
