import type { CollectionConfig } from 'payload'
import { hasRole } from '../utils/hasRole'

export const Admins: CollectionConfig = {
	slug: 'admins',
	labels: {
		singular: {
			en: 'Admin',
			ru: 'Админ',
		},
		plural: {
			en: 'Admins',
			ru: 'Админы',
		},
	},

	admin: {
		useAsTitle: 'email',
	},
	auth: true,

	access: {
		create: ({ req: { user } }) => {
			// Первый администратор
			if (!user) return true

			// Дальше создавать админов может только SuperAdmin
			if (!('role' in user)) return false

			return user.role === 'superAdmin'
		},

		read: ({ req: { user }, id }) => {
			if (!user) return false

			if (!('role' in user)) return false

			// SuperAdmin видит всех
			if (user.role === 'superAdmin') {
				return true
			}

			// Остальные видят только себя
			return user.id === id
		},

		update: ({ req: { user }, id }) => {
			if (!user) return false

			if (!('role' in user)) return false

			// SuperAdmin может менять любого
			if (user.role === 'superAdmin') {
				return true
			}

			// Остальные могут менять только себя
			return user.id === id
		},

		delete: ({ req: { user } }) => {
			if (!user) return false

			if (!('role' in user)) return false

			return user.role === 'superAdmin'
		},
	},

	fields: [
		{
			name: 'username',
			type: 'text',
			required: false,
			label: {
				en: 'Username',
				ru: 'Никнейм',
			},
		},
		{
			name: 'role',
			type: 'select',
			required: true,
			defaultValue: 'editor',
			label: {
				en: 'Role',
				ru: 'Роль',
			},
			options: [
				{
					label: 'Super Admin',
					value: 'superAdmin',
				},
				{
					label: 'Admin',
					value: 'admin',
				},
				{
					label: 'Editor',
					value: 'editor',
				},
			],

			access: {
				create: ({ req: { user } }) => {
					// Первый пользователь должен иметь возможность
					// получить роль SuperAdmin
					if (!user) return true

					if (!('role' in user)) return false

					return user.role === 'superAdmin'
				},

				update: ({ req: { user } }) => {
					if (!user) return false

					if (!('role' in user)) return false

					return user.role === 'superAdmin'
				},
			},
		},
	],
}
