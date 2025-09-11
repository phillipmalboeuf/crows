import { DIRECTUS_URL } from '$env/static/private'
import { createDirectus, authentication, rest, staticToken } from '@directus/sdk'
import type { Schema } from './schema'

export const directus = (token: string=undefined) => createDirectus<Schema>(DIRECTUS_URL).with(authentication()).with(token ? staticToken(token) : authentication('json')).with(rest())

