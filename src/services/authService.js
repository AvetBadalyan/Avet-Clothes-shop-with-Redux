// ============================================================
//  Auth service abstraction.
//
//  The rest of the app talks to this module only — it never touches
//  the auth backend directly. Today it is a localStorage-backed mock
//  that issues a fake JWT. Swapping in Supabase Auth later means
//  reimplementing these four functions with supabase.auth.* calls
//  and nothing else in the app has to change.
// ============================================================
import { clearState, loadState, saveState } from '@/store/storage.js'

const USERS_KEY = 'users'
const SESSION_KEY = 'session'
const SAVED_ADDRESSES_KEY = 'savedAddresses'

const readUsers = () => loadState(USERS_KEY, {})
const writeUsers = users => saveState(USERS_KEY, users)
const readAddresses = () => loadState(SAVED_ADDRESSES_KEY, {})
const writeAddresses = addresses => saveState(SAVED_ADDRESSES_KEY, addresses)

// A deliberately fake, decodable "JWT-shaped" token (NOT secure — mock only).
const issueToken = email => {
	const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
	const payload = btoa(
		JSON.stringify({
			sub: email,
			iat: Date.now(),
			exp: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
		})
	)
	const signature = btoa(`modern-mock-${email}`)
	return `${header}.${payload}.${signature}`
}

const delay = (ms = 550) => new Promise(r => setTimeout(r, ms))

const nameFromEmail = email => {
	const handle = email.split('@')[0].replace(/[._-]+/g, ' ')
	return handle.replace(/\b\w/g, c => c.toUpperCase())
}

// Hash a password with a per-user salt using the Web Crypto API (SHA-256).
// This is a mock store, so we never keep the plaintext password — only a
// salted hash. A real backend would use bcrypt/argon2 server-side; the point
// here is to demonstrate the pattern (never persist raw credentials).
const toHex = buffer =>
	[...new Uint8Array(buffer)].map(b => b.toString(16).padStart(2, '0')).join('')

const hashPassword = async (password, salt) => {
	const data = new TextEncoder().encode(`${salt}:${password}`)
	const digest = await crypto.subtle.digest('SHA-256', data)
	return toHex(digest)
}

const randomSalt = () => toHex(crypto.getRandomValues(new Uint8Array(16)))

export const authService = {
	/**
	 * Returns the persisted session ({ user, token }) or null.
	 * Validates the mock JWT exp claim — clears and returns null if expired.
	 */
	getSession() {
		const session = loadState(SESSION_KEY, null)
		if (!session?.token) return null
		try {
			const payloadJson = atob(session.token.split('.')[1])
			const { exp } = JSON.parse(payloadJson)
			if (exp && Date.now() > exp) {
				clearState(SESSION_KEY)
				return null
			}
		} catch {
			// Malformed token — treat as expired
			clearState(SESSION_KEY)
			return null
		}
		return session
	},

	async signUp({ name, email, password }) {
		await delay()
		const users = readUsers()
		const key = email.toLowerCase()
		if (users[key]) {
			throw new Error('An account with this email already exists.')
		}
		// Store a salted hash — never the raw password.
		const salt = randomSalt()
		const passwordHash = await hashPassword(password, salt)
		const createdAt = new Date().toISOString()
		users[key] = {
			name: name || nameFromEmail(email),
			email: key,
			salt,
			passwordHash,
			createdAt
		}
		writeUsers(users)
		const user = { name: users[key].name, email: key, createdAt }
		const session = { user, token: issueToken(key) }
		saveState(SESSION_KEY, session)
		return session
	},

	async signIn({ email, password }) {
		await delay()
		const users = readUsers()
		const key = email.toLowerCase()
		const record = users[key]
		const attemptHash = record
			? await hashPassword(password, record.salt)
			: null
		if (!record || record.passwordHash !== attemptHash) {
			throw new Error('Incorrect email or password.')
		}
		const user = {
			name: record.name,
			email: key,
			createdAt: record.createdAt ?? null
		}
		const session = { user, token: issueToken(key) }
		saveState(SESSION_KEY, session)
		return session
	},

	async signOut() {
		clearState(SESSION_KEY)
	},

	/**
	 * Save a shipping address for a user email.
	 * This persists separately from the session so addresses survive sign-out.
	 */
	saveAddress(email, address) {
		if (!email) return
		const addresses = readAddresses()
		addresses[email.toLowerCase()] = address
		writeAddresses(addresses)
	},

	/**
	 * Get the saved shipping address for a user email.
	 * Returns null if no address is saved.
	 */
	getAddress(email) {
		if (!email) return null
		const addresses = readAddresses()
		return addresses[email.toLowerCase()] ?? null
	}
}
