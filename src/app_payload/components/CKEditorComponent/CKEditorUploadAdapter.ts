export class CKEditorUploadAdapter {
	private loader: any

	constructor(loader: any) {
		this.loader = loader
	}

	async upload() {
		const file = await this.loader.file

		const formData = new FormData()
		formData.append('file', file)

		const response = await fetch('/api/media', {
			method: 'POST',
			body: formData,
			credentials: 'include',
		})

		if (!response.ok) {
			throw new Error(`Upload failed: ${response.status}`)
		}

		const data = await response.json()
		const media = data.doc

		if (!media?.url) {
			throw new Error('Payload did not return media URL')
		}

		const urls: Record<string, string> = {
			default: media.url,
		}

		if (media.sizes) {
			Object.values(media.sizes).forEach((size: any) => {
				if (size?.url && size?.width) {
					urls[String(size.width)] = size.url
				}
			})
		}

		return {
			width: media.width,
			height: media.height,

			alt: media.alt || file.name.replace(/\.[^/.]+$/, ''),

			urls,
		}
	}

	abort() {}
}

export function CKEditorUploadAdapterPlugin(editor: any) {
	editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
		return new CKEditorUploadAdapter(loader)
	}
}
