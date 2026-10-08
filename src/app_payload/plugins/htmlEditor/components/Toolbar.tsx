'use client'

import type { Editor } from '@tiptap/react'

import { useRef, useState } from 'react'

import { uploadMedia } from '../utils/uploadMedia'
import { insertMedia } from '../utils/insertMedia'

import { MediaLibraryModal } from './MediaLibraryModal'

type Props = {
	editor: Editor
}

export function Toolbar({ editor }: Props) {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false)

	const isTableActive = editor.isActive('table')

	return (
		<>
			<div className="html-editor-toolbar">
				{/* =========================
            Undo / Redo
        ========================= */}

				<button
					type="button"
					disabled={!editor.can().undo()}
					onClick={() => editor.chain().focus().undo().run()}
				>
					Undo
				</button>

				<button
					type="button"
					disabled={!editor.can().redo()}
					onClick={() => editor.chain().focus().redo().run()}
				>
					Redo
				</button>

				<span className="separator" />

				{/* =========================
            Heading
        ========================= */}

				<select
					value={
						editor.isActive('heading') ? String(editor.getAttributes('heading').level) : 'paragraph'
					}
					onChange={(event) => {
						const value = event.target.value

						if (value === 'paragraph') {
							editor.chain().focus().setParagraph().run()

							return
						}

						editor
							.chain()
							.focus()
							.setHeading({
								level: Number(value) as 1 | 2 | 3 | 4 | 5 | 6,
							})
							.run()
					}}
				>
					<option value="paragraph">Paragraph</option>

					<option value="1">Heading 1</option>
					<option value="2">Heading 2</option>
					<option value="3">Heading 3</option>
					<option value="4">Heading 4</option>
					<option value="5">Heading 5</option>
					<option value="6">Heading 6</option>
				</select>

				<span className="separator" />

				{/* =========================
            Formatting
        ========================= */}

				<button
					type="button"
					className={editor.isActive('bold') ? 'active' : ''}
					onClick={() => editor.chain().focus().toggleBold().run()}
				>
					<strong>B</strong>
				</button>

				<button
					type="button"
					className={editor.isActive('italic') ? 'active' : ''}
					onClick={() => editor.chain().focus().toggleItalic().run()}
				>
					<em>I</em>
				</button>

				<button
					type="button"
					className={editor.isActive('underline') ? 'active' : ''}
					onClick={() => editor.chain().focus().toggleUnderline().run()}
				>
					<u>U</u>
				</button>

				<button
					type="button"
					className={editor.isActive('strike') ? 'active' : ''}
					onClick={() => editor.chain().focus().toggleStrike().run()}
				>
					<s>S</s>
				</button>

				<span className="separator" />

				{/* =========================
            Alignment
        ========================= */}

				<button
					type="button"
					className={
						editor.isActive({
							textAlign: 'left',
						})
							? 'active'
							: ''
					}
					onClick={() => editor.chain().focus().setTextAlign('left').run()}
				>
					L
				</button>

				<button
					type="button"
					className={
						editor.isActive({
							textAlign: 'center',
						})
							? 'active'
							: ''
					}
					onClick={() => editor.chain().focus().setTextAlign('center').run()}
				>
					C
				</button>

				<button
					type="button"
					className={
						editor.isActive({
							textAlign: 'right',
						})
							? 'active'
							: ''
					}
					onClick={() => editor.chain().focus().setTextAlign('right').run()}
				>
					R
				</button>

				<button
					type="button"
					className={
						editor.isActive({
							textAlign: 'justify',
						})
							? 'active'
							: ''
					}
					onClick={() => editor.chain().focus().setTextAlign('justify').run()}
				>
					J
				</button>

				<span className="separator" />

				{/* =========================
            Lists
        ========================= */}

				<button
					type="button"
					className={editor.isActive('bulletList') ? 'active' : ''}
					onClick={() => editor.chain().focus().toggleBulletList().run()}
				>
					• List
				</button>

				<button
					type="button"
					className={editor.isActive('orderedList') ? 'active' : ''}
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
				>
					1. List
				</button>

				<button
					type="button"
					className={editor.isActive('blockquote') ? 'active' : ''}
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
				>
					❝
				</button>

				<span className="separator" />

				{/* =========================
            Link
        ========================= */}

				<button
					type="button"
					className={editor.isActive('link') ? 'active' : ''}
					onClick={() => {
						const url = window.prompt('URL', editor.getAttributes('link').href || '')

						if (url === null) return

						if (url === '') {
							editor.chain().focus().unsetLink().run()

							return
						}

						editor
							.chain()
							.focus()
							.setLink({
								href: url,
							})
							.run()
					}}
				>
					Link
				</button>

				<span className="separator" />

				{/* =========================
            Table
        ========================= */}

				<button
					type="button"
					onClick={() =>
						editor
							.chain()
							.focus()
							.insertTable({
								rows: 3,
								cols: 3,
								withHeaderRow: true,
							})
							.run()
					}
				>
					Table
				</button>

				{/* =========================
            Images
        ========================= */}

				<button type="button" onClick={() => fileInputRef.current?.click()}>
					Upload image
				</button>

				<button type="button" onClick={() => setMediaLibraryOpen(true)}>
					Media library
				</button>

				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					hidden
					onChange={async (event) => {
						const file = event.target.files?.[0]

						if (!file) return

						try {
							const media = await uploadMedia(file)

							insertMedia(editor, media, file.name.replace(/\.[^/.]+$/, ''))
						} catch (error) {
							console.error('Image upload failed:', error)
						}

						event.target.value = ''
					}}
				/>

				<span className="separator" />

				{/* =========================
            HTML Source
        ========================= */}

				<button
					type="button"
					className="source-button"
					onClick={() => {
						window.dispatchEvent(new CustomEvent('html-editor:source'))
					}}
				>
					&lt;/&gt;
				</button>
			</div>

			{/* ==================================
          TABLE TOOLBAR
      ================================== */}

			{isTableActive && (
				<div className="html-editor-table-toolbar">
					<strong>Table:</strong>

					<button type="button" onClick={() => editor.chain().focus().addColumnBefore().run()}>
						+ Column before
					</button>

					<button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()}>
						+ Column after
					</button>

					<button type="button" onClick={() => editor.chain().focus().deleteColumn().run()}>
						− Column
					</button>

					<span className="separator" />

					<button type="button" onClick={() => editor.chain().focus().addRowBefore().run()}>
						+ Row before
					</button>

					<button type="button" onClick={() => editor.chain().focus().addRowAfter().run()}>
						+ Row after
					</button>

					<button type="button" onClick={() => editor.chain().focus().deleteRow().run()}>
						− Row
					</button>

					<span className="separator" />

					<button type="button" onClick={() => editor.chain().focus().mergeCells().run()}>
						Merge
					</button>

					<button type="button" onClick={() => editor.chain().focus().splitCell().run()}>
						Split
					</button>

					<button type="button" onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
						Header row
					</button>

					<button type="button" onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
						Header column
					</button>

					<button type="button" onClick={() => editor.chain().focus().deleteTable().run()}>
						Delete table
					</button>
				</div>
			)}

			{/* ==================================
          MEDIA LIBRARY
      ================================== */}

			<MediaLibraryModal
				open={mediaLibraryOpen}
				onClose={() => setMediaLibraryOpen(false)}
				onSelect={(media) => {
					insertMedia(editor, media)
				}}
			/>
		</>
	)
}
