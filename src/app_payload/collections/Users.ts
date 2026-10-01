import type { CollectionConfig } from 'payload'
import { hasRole, hasRoleField } from '../utils/hasRole'

export const Users: CollectionConfig = {
	slug: 'users',
	admin: {
		useAsTitle: 'username',
	},
	// auth: true,
	auth: {
		// verify: true  нужен только если нужно подтверждение email
		verify: true, // Require email verification before being allowed to authenticate
		tokenExpiration: 7200, // How many seconds to keep the user logged in
		maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
		lockTime: 600 * 1000, // Time period to allow the max login attempts

		forgotPassword: {
			expiration: 3600000,
		},
	},

	access: {
		create: () => true,

		read: () => true,
		// read: ({ req: { user } }) => {
		// 	if (!user) return false
		// 	return true
		// },

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
			// admin: {
			// 	hidden: true,
			// },
			tabs: [
				{
					label: 'Tab_1',
					fields: [
						{
							name: 'tabText_1',
							label: 'Label title',
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
							label: 'Label title',
							type: 'textarea',
							required: false,
						},
					],
				},
			],
		},
	],
}
