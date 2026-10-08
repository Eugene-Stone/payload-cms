'use client'

import { useEffect } from 'react'

import { FieldLabel, useField } from '@payloadcms/ui'

import { EditorContent, useEditor } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { TableKit } from '@tiptap/extension-table'
import FileHandler from '@tiptap/extension-file-handler'

import { MediaImage } from '../extensions/MediaImage'
import { uploadMedia } from '../utils/uploadMedia'
import { buildSrcSet } from '../utils/buildSrcSet'

import { Toolbar } from './Toolbar'
import { HtmlSourceModal } from './HtmlSourceModal'

import './HtmlEditor.css'

type Props = {
	path: string
	field?: any
}

export default function HtmlEditor({ path, field }: Props) {
	const { value, setValue } = useField<string>({ path })

	const editor = useEditor({
		immediatelyRender: false,

		extensions: [
			StarterKit,

			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),

			TableKit.configure({
				table: {
					resizable: true,
				},
			}),

			MediaImage,

			FileHandler.configure({
				allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],

				onDrop: async (editor, files, pos) => {
					for (const file of files) {
						if (!file.type.startsWith('image/')) continue

						const media = await uploadMedia(file)
						const srcset = buildSrcSet(media)

						editor
							.chain()
							.focus()
							.insertContentAt(pos, {
								type: 'image',
								attrs: {
									src: media.url,
									alt: media.alt || file.name.replace(/\.[^/.]+$/, ''),
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
				},

				onPaste: async (editor, files) => {
					for (const file of files) {
						if (!file.type.startsWith('image/')) continue

						const media = await uploadMedia(file)
						const srcset = buildSrcSet(media)

						editor
							.chain()
							.focus()
							.insertContent({
								type: 'image',
								attrs: {
									src: media.url,
									alt: media.alt || file.name.replace(/\.[^/.]+$/, ''),
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
				},
			}),
		],

		content: value || '',

		onUpdate({ editor }) {
			setValue(editor.getHTML())
		},
	})

	useEffect(() => {
		if (!editor) return

		if (value !== editor.getHTML()) {
			editor.commands.setContent(value || '', {
				emitUpdate: false,
			})
		}
	}, [editor, value])

	if (!editor) {
		return null
	}

	return (
		<div className="payload-html-editor">
			<FieldLabel label={field?.label || field?.name} path={path} required={field?.required} />

			<Toolbar editor={editor} />

			<EditorContent editor={editor} />

			<HtmlSourceModal editor={editor} />
		</div>
	)
}
