export type MethodKey = keyof typeof METHODS
export type MethodValue = typeof METHODS[MethodKey]

export const METHODS = {
    'GET': 'GET',
    'POST': 'POST',
    'PUT': 'PUT',
    'DELETE': 'DELETE'
} as const