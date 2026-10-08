type MediaSize = {
	url?: string
	width?: number
}

type Media = {
	url?: string
	sizes?: Record<string, MediaSize>
}

export function buildSrcSet(media: Media) {
	if (!media.sizes) return undefined

	return Object.values(media.sizes)
		.filter((size) => size.url && size.width)
		.map((size) => `${size.url} ${size.width}w`)
		.join(', ')
}
