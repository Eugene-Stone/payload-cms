'use client'

import { CKEditor } from '@ckeditor/ckeditor5-react'

import {
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
} from 'ckeditor5'

import 'ckeditor5/ckeditor5.css'

type Props = {
	value: string
	onChange: (value: string) => void
}

export default function CKEditorClient({ value, onChange }: Props) {
	return (
		<CKEditor
			editor={ClassicEditor}
			data={value}
			config={{
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
			}}
			onChange={(_, editor) => {
				onChange(editor.getData())
			}}
		/>
	)
}
