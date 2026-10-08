import type { Field } from 'payload'

export type HtmlEditorOptions = {
	name: string
	label?: string
}

export const htmlEditorField = ({ name, label }: HtmlEditorOptions): Field => ({
	name,
	type: 'textarea',
	label: label || name,

	admin: {
		components: {
			Field: '/app_payload/plugins/htmlEditor/components/HtmlEditor',
		},
	},
})
