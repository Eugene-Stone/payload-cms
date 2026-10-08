export async function uploadMedia(file: File) {
	const formData = new FormData()

	formData.append('file', file)

	const response = await fetch('/api/media', {
		method: 'POST',
		body: formData,
		credentials: 'include',
	})

	if (!response.ok) {
		throw new Error(`Media upload failed: ${response.status}`)
	}

	const result = await response.json()

	return result.doc
}
