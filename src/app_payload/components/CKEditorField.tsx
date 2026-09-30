'use client'

import { useEffect, useState } from 'react'
import { useField } from '@payloadcms/ui'

type Props = {
	path: string
}

export default function CKEditorField({ path }: Props) {
	const { value, setValue } = useField<string>({ path })

	const [Editor, setEditor] = useState<any>(null)
	const [editorConfig, setEditorConfig] = useState<any>(null)

	useEffect(() => {
		const loadEditor = async () => {
			const [{ CKEditor }, ckeditor] = await Promise.all([
				import('@ckeditor/ckeditor5-react'),
				import('ckeditor5'),
			])

			const {
				ClassicEditor,
				Essentials,
				Paragraph,
				Heading,
				Bold,
				Italic,
				Underline,
				Strikethrough,
				Link,
				List,
				BlockQuote,
				SourceEditing,
				GeneralHtmlSupport,
			} = ckeditor

			setEditor(() => CKEditor)

			setEditorConfig({
				editor: ClassicEditor,

				config: {
					licenseKey: 'GPL',

					plugins: [
						Essentials,
						Paragraph,
						Heading,
						Bold,
						Italic,
						Underline,
						Strikethrough,
						Link,
						List,
						BlockQuote,
						SourceEditing,
						GeneralHtmlSupport,
					],

					toolbar: [
						'undo',
						'redo',
						'|',
						'heading',
						'|',
						'bold',
						'italic',
						'underline',
						'strikethrough',
						'|',
						'link',
						'bulletedList',
						'numberedList',
						'blockQuote',
						'|',
						'sourceEditing',
					],

					htmlSupport: {
						allow: [
							{
								name: /.*/,
								attributes: true,
								classes: true,
								styles: true,
							},
						],
					},
				},
			})
		}

		loadEditor()
	}, [])

	if (!Editor || !editorConfig) {
		return <div>Загрузка редактора...</div>
	}

	return (
		<Editor
			editor={editorConfig.editor}
			config={editorConfig.config}
			data={value || ''}
			onChange={(_: unknown, editor: any) => {
				setValue(editor.getData())
			}}
		/>
	)
}
