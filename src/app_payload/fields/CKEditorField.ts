import type { Field } from 'payload'

export const CKEditorField = (name: string, label?: string): Field => ({
	name,
	type: 'textarea',
	label: label || name,

	admin: {
		components: {
			Field: '/app_payload/components/CKEditorComponent',
		},
	},
})
