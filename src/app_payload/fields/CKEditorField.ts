import type { Field } from 'payload'

export const CKEditorField = (name = 'content'): Field => ({
	name,
	type: 'textarea',

	admin: {
		components: {
			Field: '/app_payload/components/CKEditorField',
		},
	},
})
