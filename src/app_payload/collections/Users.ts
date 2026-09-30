import type { CollectionConfig } from 'payload'
import { hasRole, hasRoleField } from '../utils/hasRole'

export const Users: CollectionConfig = {
	slug: 'users',
	admin: {
		useAsTitle: 'username',
	},
	auth: true,

	access: {
		create: () => true,

		read: () => true,

		update: ({ req: { user }, id }) => {
			if (!user) return false

			if (!('collection' in user)) return false

			return user.id === id
		},

		delete: hasRole(['superAdmin', 'admin']),
	},

	fields: [
		{
			name: 'username',
			type: 'text',
			required: false,
		},
		{
			name: 'isApproved',
			type: 'checkbox',
			required: false,
			access: {
				update: hasRoleField(['superAdmin', 'admin']),
			},
		},
		{
			type: 'tabs',
			admin: {
				hidden: true,
			},
			tabs: [
				{
					label: 'Tab_1',
					fields: [
						{
							name: 'tabText_1',
							type: 'text',
							required: false,
						},
					],
				},
				{
					label: 'Tab_2',
					fields: [
						{
							name: 'tabText_2',
							type: 'text',
							required: false,
						},
					],
				},
			],
		},
	],
}
