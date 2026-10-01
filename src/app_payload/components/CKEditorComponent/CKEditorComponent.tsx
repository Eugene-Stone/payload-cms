'use client'

import { useEffect, useState } from 'react'
import { FieldLabel, useField } from '@payloadcms/ui'

import { CKEditorUploadAdapterPlugin } from './CKEditorUploadAdapter'

import './CKEditorComponent.css'

type Props = {
	path: string
	field?: any
}

export default function CKEditorComponent({ path, field }: Props) {
	const { value, setValue } = useField<string>({ path })

	const [Editor, setEditor] = useState<any>(null)
	const [editorConfig, setEditorConfig] = useState<any>(null)

	useEffect(() => {
		const loadEditor = async () => {
			const [{ CKEditor }, ckeditor] = await Promise.all([
				import('@ckeditor/ckeditor5-react'),
				import('ckeditor5'),
			])

			await import('ckeditor5/ckeditor5.css')

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
				Alignment,

				Image,
				ImageInsert,
				ImageToolbar,
				ImageCaption,
				ImageStyle,
				LinkImage,

				Table,
				TableToolbar,
				TableProperties,
				TableCellProperties,
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
						Alignment,

						Image,
						ImageInsert,
						ImageToolbar,
						ImageCaption,
						// ImageStyle,
						// LinkImage,

						Table,
						TableToolbar,
						TableProperties,
						TableCellProperties,

						CKEditorUploadAdapterPlugin,
					],

					heading: {
						options: [
							{
								model: 'paragraph',
								title: 'Paragraph',
								class: 'ck-heading_paragraph',
							},
							{
								model: 'heading1',
								view: 'h1',
								title: 'Heading 1',
								class: 'ck-heading_heading1',
							},
							{
								model: 'heading2',
								view: 'h2',
								title: 'Heading 2',
								class: 'ck-heading_heading2',
							},
							{
								model: 'heading3',
								view: 'h3',
								title: 'Heading 3',
								class: 'ck-heading_heading3',
							},
							{
								model: 'heading4',
								view: 'h4',
								title: 'Heading 4',
								class: 'ck-heading_heading4',
							},
							{
								model: 'heading5',
								view: 'h5',
								title: 'Heading 5',
								class: 'ck-heading_heading5',
							},
							{
								model: 'heading6',
								view: 'h6',
								title: 'Heading 6',
								class: 'ck-heading_heading6',
							},
						],
					},

					toolbar: [
						'undo',
						'redo',
						'|',
						'heading',
						'|',
						'alignment',
						'bold',
						'italic',
						'underline',
						'strikethrough',
						'|',
						'link',
						'bulletedList',
						'numberedList',
						'blockQuote',
						'insertTable',
						'|',
						'insertImage',

						// 'imageStyle:block',
						// 'imageStyle:side',
						// '|',
						'toggleImageCaption',
						'imageTextAlternative',
						// '|',
						'linkImage',

						'|',
						'sourceEditing',
					],
					table: {
						contentToolbar: [
							'tableProperties',
							'tableColumn',
							'tableRow',
							'mergeTableCells',
							// '|',
							// 'tableCellProperties',
						],
					},

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
		// return <div>Загрузка редактора...</div>
		return null
	}

	return (
		<div className="payload-ckeditor">
			<FieldLabel label={field?.label || field?.name} path={path} required={field?.required} />

			<Editor
				editor={editorConfig.editor}
				config={editorConfig.config}
				data={value || ''}

				onReady={(editor: any) => {
					const imageUploadEditing = editor.plugins.get('ImageUploadEditing')

					imageUploadEditing.on('uploadComplete', (_evt: any, { data, imageElement }: any) => {
						editor.model.change((writer: any) => {
							if (data.width) {
								writer.setAttribute('width', data.width, imageElement)
							}

							if (data.height) {
								writer.setAttribute('height', data.height, imageElement)
							}

							writer.setAttribute('loading', 'lazy', imageElement)

							writer.setAttribute('sizes', '100vw', imageElement)

							if (data.alt) {
								writer.setAttribute('alt', data.alt, imageElement)
							}
						})
					})
				}}

				onChange={(_: unknown, editor: any) => {
					setValue(editor.getData())
				}}
			/>
		</div>
	)
}
