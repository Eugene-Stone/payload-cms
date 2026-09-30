import type { Access, FieldAccess } from 'payload'

type AdminRole = 'superAdmin' | 'admin' | 'editor'

export const hasRole = (roles: AdminRole[]): Access => {
	return ({ req: { user } }) => {
		if (!user) return false

		if (!('role' in user)) return false

		return roles.includes(user.role)
	}
}

export const hasRoleField = (roles: AdminRole[]): FieldAccess => {
	return ({ req: { user } }) => {
		if (!user) return false

		if (!('role' in user)) return false

		return roles.includes(user.role)
	}
}
